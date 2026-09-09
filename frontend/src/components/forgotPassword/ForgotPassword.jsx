import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../Axios/axios.js";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            setMessage("");
            setError("");
            const res = await axios.post("/forgotPassword/forgotPassword", { email });
            setMessage(res.data?.message || "Password reset link sent to your email.");
        } catch (err) {
            console.error("Forgot password error:", err);
            const errMsg = err.response?.data?.message || err.message || "Failed to send reset link. Please check server connection.";
            setError(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-12 px-4 max-w-md mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Forgot Password</h2>
                <p className="text-sm text-slate-500 mb-6">Enter your registered email and we'll send you a password reset link.</p>
                
                {message && (
                    <div className='p-3 mb-4 rounded-lg bg-green-100 border border-green-300 text-green-700 text-sm font-medium'>
                        {message}
                    </div>
                )}

                {error && (
                    <div className='p-3 mb-4 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-medium'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="w-full px-4 py-2.5 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 mb-4"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                <div className="mt-6 text-sm">
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;