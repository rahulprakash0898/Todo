import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

function Layout() {
    return (
        <div className="min-h-[calc(100vh-70px)] bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side: Create Task Card */}
                <div className="lg:col-span-5 w-full">
                    <CreateTask />
                </div>

                {/* Right Side: Task List & Navigation Card */}
                <div className="lg:col-span-7 w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col min-h-[520px]">
                    
                    {/* Header Bar with Filters */}
                    <div className="p-5 border-b border-slate-200 bg-slate-50">
                        <div className="flex items-center gap-2 mb-4 text-slate-800">
                            <FormatListBulletedIcon className="text-blue-600" />
                            <h2 className="text-lg font-bold">My Tasks</h2>
                        </div>
                        <TaskIndicator />
                    </div>

                    {/* Scrollable Tasks Container */}
                    <div className="p-5 overflow-y-auto max-h-[600px] flex-1 bg-slate-50/50">
                        <Outlet />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Layout;