import axios from "axios";

const baseURL = 
    (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) 
    || (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) 
    || "http://localhost:8000/api";

const instance = axios.create({
    baseURL: baseURL,
});

export default instance;