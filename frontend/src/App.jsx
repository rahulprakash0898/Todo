import './App.css';
import { useEffect, useReducer } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Active from './components/Active';
import Completed from './components/Completed';
import AllTask from './components/AllTask';
import Layout from './components/Layout';
import TaskContext from './context/TaskContext';
import TokenContext from './context/TokenContext';
import taskReducer from './reducer/taskReducer';
import tokenReducer from './reducer/tokenReducer';
import userReducer from './reducer/userReducer';
import Header from './components/Header/Header';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import axios from './Axios/axios.js';

function App() {
  const getInitialToken = () => {
    try {
      const stored = localStorage.getItem("authToken");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  };

  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [userToken, tokenDispatch] = useReducer(tokenReducer, getInitialToken());
  const [user, userDispatch] = useReducer(userReducer, {});

  // Fetch current user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/getUser", {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        if (res.data && res.data.user) {
          userDispatch({ type: "SET_USER", payload: res.data.user });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("authToken");
          tokenDispatch({ type: "UNSET_TOKEN" });
          userDispatch({ type: "UNSET_USER" });
        }
      }
    };

    if (userToken) {
      fetchUser();
    }
  }, [userToken]);

  // Fetch user tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("/task/getTask", {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        dispatch({ type: "SET_TASK", payload: res.data });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    if (userToken) {
      fetchTasks();
    } else {
      dispatch({ type: "SET_TASK", payload: [] });
    }
  }, [userToken]);

  return (
    <BrowserRouter>
      <TokenContext.Provider value={{ userToken, tokenDispatch, user, userDispatch }}>
        <TaskContext.Provider value={{ tasks, dispatch }}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route path='/' element={userToken ? <Layout /> : <Login />}>
                <Route index element={<AllTask />} />
                <Route path="active" element={<Active />} />
                <Route path="completed" element={<Completed />} />
              </Route>
              <Route path="/login" element={userToken ? <Navigate to="/" /> : <Login />} />
              <Route path="/register" element={userToken ? <Navigate to="/" /> : <Register />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
            </Route>
          </Routes>
        </TaskContext.Provider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;
