import React, { useContext } from 'react';
import Task from './Task/Task';
import TaskContext from '../context/TaskContext';

function Active() {
    const { tasks } = useContext(TaskContext);
    const activeTasks = tasks ? tasks.filter(t => !t.completed) : [];

    return (
        <div className="task-list">
            {activeTasks.length > 0 ? (
                activeTasks.map((task, index) => (
                    <Task
                        key={task._id || index}
                        task={task}
                        id={index}
                    />
                ))
            ) : (
                <div className="text-center py-10 text-slate-500">
                    <p className="text-lg font-medium">No Active Tasks</p>
                    <p className="text-sm">All caught up or create a new task!</p>
                </div>
            )}
        </div>
    );
}

export default Active;