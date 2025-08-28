import React, { useState } from 'react';

const AdminControl = () => {
    const tabs = ['Users', 'Instructors', 'Courses', 'Reports', 'Payouts', 'System Logs'];
    const actions = ['View All Users', 'Add Category', 'Approve Instructor'];
    const stats = [
        { label: 'Total Users', value: '12,485' },
        { label: 'Active Courses', value: '312' },
        { label: 'Instructors', value: '1,207' },
        { label: 'Pending Enrollments', value: '254' },
    ];

    const [activeTab, setActiveTab] = useState('Users');
    const [activeAction, setActiveAction] = useState(null);

    return (
        <div className="h-[calc(100vh-64px)] w-full flex justify-center items-start bg-gray-100 overflow-hidden">
            <div className="w-full  h-full bg-gradient-to-br from-white to-blue-200 p-6 md:p-8 text-gray-800 font-sans rounded-lg shadow-lg overflow-hidden flex flex-col">
                
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-4xl font-semibold">Admin Control Center</h1>
                    <p className="text-base md:text-xl text-gray-500 mt-1">
                        Manage users, courses, content, and reports
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-6 border-b border-gray-200 text-base md:text-lg mb-8">
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(tab)}
                            className={`relative pb-1 transition ${
                                activeTab === tab
                                    ? 'text-blue-600 font-medium'
                                    : 'text-gray-600'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-blue-600"></span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveAction(action)}
                            className={`border text-sm md:text-base px-6 py-2 rounded transition w-fit relative ${
                                activeAction === action
                                    ? 'bg-blue-600 text-white font-medium border-blue-600'
                                    : 'border-gray-300 text-gray-700'
                            }`}
                        >
                            {action}
                        </button>
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-grow">
                    {stats.map((item, i) => (
                        <div
                            key={i}
                            className="bg-gray-50 border border-gray-200 p-6 md:p-8 rounded-lg shadow-sm"
                        >
                            <p className="text-xl md:text-2xl font-semibold">{item.value}</p>
                            <p className="text-sm text-gray-500 mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminControl;
