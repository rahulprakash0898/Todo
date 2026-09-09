import React, { useState, useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function CreateTask() {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) return;

        setLoading(true);
        setError("");

        try {
            const res = await axios.post("/task/addTask", {
                title: title.trim(),
                description: description.trim()
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (res.data && res.data.task) {
                dispatch({
                    type: "ADD_TASK",
                    task: res.data.task
                });
            } else {
                dispatch({
                    type: "ADD_TASK",
                    title: title.trim(),
                    description: description.trim()
                });
            }

            setTitle("");
            setDescription("");
        } catch (err) {
            console.error("Error adding task:", err);
            setError(err.response?.data?.message || "Failed to add task. Please check connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white flex items-center gap-2">
                    <AddCircleOutlineIcon />
                    <h3 className="text-lg font-bold">Create New Task</h3>
                </div>

                <form onSubmit={handleAdd} className="p-6">
                    {error && (
                        <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
                            {error}
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                            Task Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            placeholder="e.g., Complete project report"
                            onChange={(e) => setTitle(e.target.value)}
                            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition outline-none'
                        />
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                            Task Description
                        </label>
                        <textarea
                            rows={4}
                            name="description"
                            id="description"
                            value={description}
                            required
                            placeholder="Add details, notes, or subtasks..."
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                            className='w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition outline-none'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 text-sm'
                    >
                        {loading ? "Adding..." : "+ Add Task"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;