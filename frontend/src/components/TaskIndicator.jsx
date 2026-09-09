import React from 'react';
import { NavLink } from 'react-router-dom';

function TaskIndicator() {
    return ( 
        <div className='w-full'>
            <nav>
                <ul className='flex gap-2 p-1.5 bg-slate-200/80 rounded-xl border border-slate-300/60'>
                    <li className="flex-1 text-center">
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => 
                                `block py-2 px-3 text-xs md:text-sm font-semibold rounded-lg transition duration-200 ${
                                    isActive 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/60'
                                }`
                            }
                        >
                            All Tasks
                        </NavLink>
                    </li>
                    <li className="flex-1 text-center">
                        <NavLink 
                            to="/active"
                            className={({ isActive }) => 
                                `block py-2 px-3 text-xs md:text-sm font-semibold rounded-lg transition duration-200 ${
                                    isActive 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/60'
                                }`
                            }
                        >
                            Active
                        </NavLink>
                    </li>
                    <li className="flex-1 text-center">
                        <NavLink 
                            to="/completed"
                            className={({ isActive }) => 
                                `block py-2 px-3 text-xs md:text-sm font-semibold rounded-lg transition duration-200 ${
                                    isActive 
                                    ? 'bg-emerald-600 text-white shadow-md' 
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/60'
                                }`
                            }
                        >
                            Completed
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
     );
}

export default TaskIndicator;