import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "../Axios/axios.js";
import TokenContext from '../context/TokenContext.js';

function Register() {
    const [formData, setFormData] = useState({});
    const { userToken, tokenDispatch, userDispatch } = useContext(TokenContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const result = await axios.post("/user/register", formData);
            tokenDispatch({ type: "SET_TOKEN", payload: result.data.token });
            userDispatch({ type: "SET_USER", payload: result.data.user });
            localStorage.setItem("authToken", JSON.stringify(result.data.token));
        } catch (err) {
            console.error("Register error:", err);
            const errMsg = err.response?.data?.message || err.message || "Registration failed. Please check server connection.";
            setError({ message: errMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {userToken && <Navigate to="/" />}
            <section className="register-container py-10">
                <div className="container mx-auto px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <img src="/register-illustration.svg" className="w-full max-w-md mx-auto" alt="Register Illustration" />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-800 mb-6">Create an Account</h2>
                                {error && (
                                    <div className="text-center p-3 mb-4 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-medium">
                                        {error.message}
                                    </div>
                                )}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name='name'
                                        required
                                        className="form-control block w-full px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Rahul Prakash"
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name='email'
                                        required
                                        className="form-control block w-full px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="name@example.com"
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        name='password'
                                        required
                                        className="form-control block w-full px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                                        placeholder="Min 8 chars with uppercase, number & symbol"
                                        onChange={handleChange} />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out disabled:opacity-50">
                                    {loading ? "Creating Account..." : "Register"}
                                </button>
                                <p className="text-sm font-medium text-slate-600 mt-4 text-center">
                                    Already have an account?
                                    <Link
                                        to={"/login"}
                                        className="text-blue-600 hover:text-blue-700 font-semibold ml-2"
                                    >Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;