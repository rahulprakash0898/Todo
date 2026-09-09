import React, { useState, useContext } from 'react';
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import axios from "../../Axios/axios.js";
import "./createTask.css";

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
            setError(err.response?.data?.message || "Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addContainer md:w-1/3 md:mx-auto mx-3 mt-3 flex justify-center">
            <div className='w-11/12'>
                <form onSubmit={handleAdd} className="bg-white p-5 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Add New Task</h3>
                    {error && (
                        <div className="p-2 mb-3 text-sm text-red-700 bg-red-100 rounded">
                            {error}
                        </div>
                    )}
                    <div className="mb-3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            required
                            placeholder="Task title..."
                            onChange={(e) => setTitle(e.target.value)}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={4}
                            name="description"
                            id="description"
                            value={description}
                            required
                            placeholder="Task details..."
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ resize: "none" }}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            disabled={loading}
                            className='bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg font-medium shadow-sm disabled:opacity-50'
                        >
                            {loading ? "Adding..." : "Add Task"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTask;