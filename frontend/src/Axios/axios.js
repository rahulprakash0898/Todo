import axios from "axios";

// Automatically resolve API URL for local development and Vercel production
const isBrowser = typeof window !== "undefined";
const isProduction = isBrowser && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";

const envUrl = 
    (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) 
    || (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL);

// If running in production (e.g. Vercel) and no absolute URL is provided, route to /api relative path
const baseURL = envUrl || (isProduction ? "/api" : "http://localhost:8000/api");

const instance = axios.create({
    baseURL: baseURL,
});

export default instance;