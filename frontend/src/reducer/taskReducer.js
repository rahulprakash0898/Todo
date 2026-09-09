function taskReducer(tasks, action) {
    switch (action.type) {
        case "ADD_TASK": {
            if (action.task && action.task._id) {
                return [action.task, ...tasks];
            }
            return [
                {
                    _id: action.id || Date.now().toString(),
                    title: action.title,
                    description: action.description,
                    completed: false,
                    createdAt: new Date().toISOString()
                },
                ...tasks
            ];
        }
        case "SET_TASK": {
            return Array.isArray(action.payload) ? action.payload : [];
        }
        case "REMOVE_TASK": {
            return tasks.filter((task, index) => {
                if (action.id && task._id) {
                    return task._id !== action.id;
                }
                return index !== action.index;
            });
        }
        case "MARK_DONE": {
            return tasks.map((task, index) => {
                const isMatch = (action.id && task._id) ? (task._id === action.id) : (index === action.index);
                if (isMatch) {
                    return {
                        ...task,
                        completed: action.completed !== undefined ? action.completed : !task.completed
                    };
                }
                return task;
            });
        }
        default: {
            return tasks;
        }
    }
}

export default taskReducer;