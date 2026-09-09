import React, { useContext, useState } from 'react';
import moment from 'moment';
import "./task.css";
import TaskContext from '../../context/TaskContext';
import TokenContext from '../../context/TokenContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from "../../Axios/axios.js";

function Task({ task, id }) {
    const { dispatch } = useContext(TaskContext);
    const { userToken } = useContext(TokenContext);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDesc, setEditDesc] = useState(task.description);
    const [isSaving, setIsSaving] = useState(false);

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

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        if (!editTitle.trim() || !editDesc.trim() || isSaving) return;
        setIsSaving(true);

        try {
            if (task._id && userToken) {
                await axios.post("/task/updateTask", {
                    id: task._id,
                    title: editTitle.trim(),
                    description: editDesc.trim()
                }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
            }
            dispatch({
                type: "UPDATE_TASK",
                id: task._id,
                index: id,
                title: editTitle.trim(),
                description: editDesc.trim()
            });
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update task:", error);
            dispatch({
                type: "UPDATE_TASK",
                id: task._id,
                index: id,
                title: editTitle.trim(),
                description: editDesc.trim()
            });
            setIsEditing(false);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancelEdit = () => {
        setEditTitle(task.title);
        setEditDesc(task.description);
        setIsEditing(false);
    };

    return (
        <div className={`bg-white border ${task.completed ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-200'} py-4 px-4 rounded-xl shadow-sm hover:shadow-md transition mb-3`}>
            {isEditing ? (
                <form onSubmit={handleSaveEdit} className="w-full">
                    <div className="mb-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Edit Title</label>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            required
                            className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Edit Description</label>
                        <textarea
                            rows={3}
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            required
                            style={{ resize: "none" }}
                            className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 font-medium transition"
                        >
                            <CloseIcon style={{ fontSize: 16 }} /> Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition disabled:opacity-50"
                        >
                            <CheckIcon style={{ fontSize: 16 }} /> {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="flex items-start gap-3">
                    <div className="mark-done pt-1">
                        <input
                            type="checkbox"
                            className="w-5 h-5 cursor-pointer accent-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
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
                        <div className='flex items-center gap-2 text-xs text-slate-400 mt-2 font-medium'>
                            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                                {task?.createdAt ? moment(task.createdAt).fromNow() : 'just now'}
                            </span>
                            {task.completed && (
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                                    Completed
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 pt-1">
                        <button
                            onClick={() => setIsEditing(true)}
                            title="Edit Task"
                            className="p-1.5 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition duration-150"
                        >
                            <EditIcon style={{ fontSize: 19 }} />
                        </button>
                        <button
                            onClick={handleRemove}
                            disabled={isDeleting}
                            title="Delete Task"
                            className="p-1.5 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition duration-150 disabled:opacity-50"
                        >
                            <DeleteIcon style={{ fontSize: 19 }} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Task;