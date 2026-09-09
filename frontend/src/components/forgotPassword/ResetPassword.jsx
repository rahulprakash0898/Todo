import React, { useState } from 'react';
import { useSearchParams, Link } from "react-router-dom";
import axios from "../../Axios/axios.js";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const token = searchParams.get("token");
            if (!token) {
                setError("Reset token is missing or invalid in URL.");
                setIsLoading(false);
                return;
            }
            const res = await axios.post("/forgotPassword/resetPassword", { token, password });
            setMessage(res.data?.message || "Password reset successful!");
        } catch (err) {
            console.error("Reset password error:", err);
            const errMsg = err.response?.data?.message || err.message || "Failed to reset password. Token may be expired.";
            setError(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-12 px-4 max-w-md mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Reset Password</h2>
                <p className="text-sm text-slate-500 mb-6">Enter your new secure password below.</p>

                {message && (
                    <div className='p-3 mb-4 rounded-lg bg-green-100 border border-green-300 text-green-700 text-sm font-medium'>
                        {message}
                        <div className="mt-2">
                            <Link to="/login" className="font-semibold underline">Go to Login</Link>
                        </div>
                    </div>
                )}

                {error && (
                    <div className='p-3 mb-4 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-medium'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="relative mb-3">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-2.5 pr-11 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Enter new password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                            tabIndex="-1"
                        >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </button>
                    </div>
                    <div className="relative mb-4">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full px-4 py-2.5 pr-11 text-base text-gray-700 bg-white border border-gray-300 rounded-lg transition focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600"
                            placeholder="Confirm new password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                            tabIndex="-1"
                        >
                            {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg shadow-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;