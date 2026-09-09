import React, { useContext, useState } from 'react';
import moment from 'moment';
import "./task.css";
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../Axios/axios.js";

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const taskId = task._id || id;

    const handleRemove = async (e) => {
        e.preventDefault();
        if (isDeleting) return;
        setIsDeleting(true);

        try {
            if (task._id && userToken) {
                await axios.post("/task/removeTask", { id: task._id }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
            }
            dispatch({
                type: "REMOVE_TASK",
                id: task._id,
                index: id
            });
        } catch (error) {
            console.error("Failed to delete task:", error);
            // Still remove from UI as fallback
            dispatch({
                type: "REMOVE_TASK",
                id: task._id,
                index: id
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const handleMarkDone = async () => {
        if (isUpdating) return;
        setIsUpdating(true);
        const newStatus = !task.completed;

        try {
            if (task._id && userToken) {
                await axios.post("/task/markDone", {
                    id: task._id,
                    completed: newStatus
                }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
            }
            dispatch({
                type: "MARK_DONE",
                id: task._id,
                index: id,
                completed: newStatus
            });
        } catch (error) {
            console.error("Failed to update task status:", error);
            dispatch({
                type: "MARK_DONE",
                id: task._id,
                index: id,
                completed: newStatus
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className={`bg-white border border-slate-200 py-4 px-4 rounded-xl shadow-sm hover:shadow-md transition flex items-start gap-3 mb-3 ${task.completed ? 'opacity-75 bg-slate-50' : ''}`}>
            <div className="mark-done pt-1">
                <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    onChange={handleMarkDone}
                    checked={Boolean(task.completed)}
                    disabled={isUpdating}
                />
            </div>
            <div className="task-info text-slate-800 flex-1 min-w-0">
                <h4 className={`text-base font-semibold capitalize ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                    {task.title}
                </h4>
                <p className={`text-sm mt-1 whitespace-pre-line ${task.completed ? 'line-through text-slate-400' : 'text-slate-600'}`}>
                    {task.description}
                </p>
                <div className='text-xs italic text-slate-400 mt-2'>
                    {task?.createdAt ? moment(task.createdAt).fromNow() : 'just now'}
                </div>
            </div>
            <div className="remove-task pt-1">
                <button
                    onClick={handleRemove}
                    disabled={isDeleting}
                    title="Delete Task"
                    className="p-1.5 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition duration-150 disabled:opacity-50"
                >
                    <DeleteIcon style={{ fontSize: 20 }} />
                </button>
            </div>
        </div>
    );
}

export default Task;