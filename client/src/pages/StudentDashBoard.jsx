import React from 'react';

const StudentDashBoard = () => {
    const courses = [
        {
            title: 'Introduction to Programming',
            image: 'https://img-c.udemycdn.com/course/240x135/2196488_8fc7_10.jpg',
        },
        {
            title: 'Data Science and Resil me Learning',
            image: 'https://img-c.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
        },
        {
            title: 'UI/UX Design Fundamentals',
            image: 'https://static.vecteezy.com/system/resources/previews/021/076/419/original/ui-ux-designer-icon-design-free-vector.jpg',
        }
    ];

    const name = localStorage.getItem("name");



    return (
        <div className="bg-gradient-to-br from-white to-blue-200 h-screen p-4 md:p-8 font-sans overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {name}!</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm cursor-pointer border-none">
                    Explore New Courses
                </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[75%]">
                {/* Left Section (Courses) */}
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">My Courses</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-full overflow-y-auto pr-1 sm:pr-2">
                        {courses.map((course, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-lg p-4 flex flex-col justify-between items-center text-center shadow-sm h-[62vh] min-h-[320px]"
                            >
                                <div className="h-1/2 w-full mb-3 flex items-center justify-center">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="h-full object-contain rounded-md"
                                    />
                                </div>
                                <p className="text-2xl font-medium text-gray-700 mb-4">{course.title}</p>
                                <button className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 cursor-pointer">
                                    Open Course
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section (Progress + Certificates) */}
                <div className="flex flex-col justify-between h-full">
                    {/* Progress */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Progress</h2>
                        <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                            {[
                                { label: '50%', width: 'w-1/2' },
                                { label: '3/5', width: 'w-3/5' },
                                { label: '22/40', width: 'w-[55%]' },
                            ].map((item, idx) => (
                                <div key={idx} className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-700 mb-1">
                                        <span>{item.label}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded">
                                        <div className={`bg-blue-500 h-2 ${item.width} rounded`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certificates */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 mt-4">Certificates</h2>
                        <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
                            <div className="grid grid-cols-2 gap-4">
                                {[1, 2].map((cert) => (
                                    <div
                                        key={cert}
                                        className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition"
                                    >
                                        <div className="text-4xl mb-2">📄</div>
                                        <p className="text-sm font-medium text-gray-700">Certificates</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Progress (Full Width) */}
            <div className="mt-4">
                <h2 className="text-sm font-semibold text-gray-800 mb-2">Progress</h2>
                <div className="w-full sm:w-1/2 bg-gray-200 h-3 rounded mb-2">
                    <div className="bg-blue-600 h-3 w-[60%] rounded"></div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-gray-600 mb-1 sm:mb-0">3IX0 - completed</p>
                    <div className="w-full sm:w-1/4 bg-gray-200 h-2 rounded mb-2 sm:ml-auto">
                        <div className="bg-blue-200 h-2 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashBoard;


