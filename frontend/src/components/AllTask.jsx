import React, { useContext } from 'react';
import Task from './Task/Task';
import TaskContext from '../context/TaskContext';

function AllTask() {
    const { tasks } = useContext(TaskContext);

    return (
        <div className="task-list">
            {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => (
                    <Task
                        key={task._id || index}
                        task={task}
                        id={index}
                    />
                ))
            ) : (
                <div className="text-center py-10 text-slate-500">
                    <p className="text-lg font-medium">No Tasks Found</p>
                    <p className="text-sm">Create your first task using the form!</p>
                </div>
            )}
        </div>
    );
}

export default AllTask;