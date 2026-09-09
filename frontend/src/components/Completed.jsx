import React, { useContext } from "react";
import Task from "./Task/Task";
import TaskContext from "../context/TaskContext";

function Completed() {
    const { tasks } = useContext(TaskContext);
    const completedTasks = tasks ? tasks.filter(t => t.completed) : [];

    return (
        <div className="task-list">
            {completedTasks.length > 0 ? (
                completedTasks.map((task, index) => (
                    <Task
                        key={task._id || index}
                        task={task}
                        id={index}
                    />
                ))
            ) : (
                <div className="text-center py-10 text-slate-500">
                    <p className="text-lg font-medium">No Completed Tasks</p>
                    <p className="text-sm">Complete some tasks to see them here!</p>
                </div>
            )}
        </div>
    );
}

export default Completed;