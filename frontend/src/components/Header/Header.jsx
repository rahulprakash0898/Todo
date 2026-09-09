import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import "./header.css";

function Header() {
    const { userToken, tokenDispatch, user, userDispatch } = useContext(TokenContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("authToken");
        tokenDispatch({ type: "UNSET_TOKEN" });
        userDispatch({ type: "UNSET_USER" });
        navigate("/login");
    };

    return (
        <div>
            <nav className='header bg-white border-b border-slate-200 px-6 flex justify-between items-center shadow-sm'>
                <div className="logo">
                    <NavLink to="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Todo Master
                    </NavLink>
                </div>
                <div className='flex items-center'>
                    {userToken ? (
                        <div className='flex items-center gap-4'>
                            <p className='text-sm text-slate-600'>
                                Welcome, <span className='font-semibold text-blue-600 capitalize'>{user?.name || "User"}</span>
                            </p>
                            <button
                                onClick={logout}
                                className="logout bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <ul className='flex items-center gap-4 text-sm font-medium'>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-600 transition"}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Register
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Header;