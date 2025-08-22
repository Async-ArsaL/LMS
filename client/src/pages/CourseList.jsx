import React, { useState } from "react";

const courses = [
  {
    id: 1,
    title: "Web Development",
    category: "Development",
    description: "Build modern web apps with React, HTML, CSS, JS.",
    thumbnail: "https://imgs.search.brave.com/ggoG5tEhpmmYzInpK2Bd1M3GitvIVCU8q7NktWonb34/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/ODA0NjE3Ni92ZWN0/b3IvZGV2ZWxvcGVy/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz05eVM3Ni1jTUx5/Mlo3QmZLQTZqZ09l/c19kVEFaaElJbXo0/VUwtelB5S2UwPQ",
    language: "JavaScript",
    price: "Paid",
  },
  {
    id: 2,
    title: "Data Science",
    category: "Data Science",
    description: "Analyze and visualize data using Python.",
    thumbnail: "https://imgs.search.brave.com/ERYE0OzcJb0IS2zz9dxOHy2jFUF19yCAJyys36zfZ8c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDkxNjUz/NzQuanBn",
    language: "Python",
    price: "Paid",
  },
  {
    id: 3,
    title: "Machine Learning",
    category: "AI/ML",
    description: "Introduction to machine learning algorithms.",
    thumbnail: "https://imgs.search.brave.com/_qP9LIL1iPB68NxZfCYF3tIzkgkDQykbJs-TNJykDDg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWFjaGluZS1s/ZWFybmluZy13aGl0/ZS1iYW5uZXItc2Vy/dmVyLXNjaGVtYS1j/aXJjdWl0LWFydGlm/aWNpYWwtaW50ZWxs/aWdlbmNlLWFpLWxh/bmRpbmctcGFnZS1k/ZXNpZ24tYmlnLWRh/dGEtY3liZXItbWlu/ZC1kaWdpdGFsLWJy/YWluLWlzb21ldHJp/Yy12ZWN0b3ItaWxs/dXN0cmF0aW9uXzEw/MDI2NTgtMTM0OS5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA",
    language: "Python",
    price: "Paid",
  },
  {
    id: 4,
    title: "Machine Marketing",
    category: "Marketing",
    description: "Learn marketing analytics and automation.",
    thumbnail: "https://imgs.search.brave.com/Hy6_eZ0k3307aJ1H4HPPSQQx3iK11FO-CBaX8O2sM38/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY0/OTY3OTgxOS92ZWN0/b3IvcHV6emxlcy1h/dXRvbWF0aW9uLXJv/Ym90LWFybS1tYWNo/aW5lLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz13bnJvUkpF/bFBqMWMyZDFLclZZ/ZVh4dE5mbHNxR2Ja/c3Nya0YtUWtvRlRn/PQ",
    language: "English",
    price: "Paid",
  },
  {
    id: 5,
    title: "Digital Marketing",
    category: "Marketing",
    description: "SEO, Ads, and Social Media strategies.",
    thumbnail: "https://imgs.search.brave.com/_Ej8ekHKNr_j4vwE1r2tDEZjNvJQJsxzjng1SwBWhZY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA2/MjkzMjgyMi9waG90/by9kaWdpdGFsLW1h/cmtldGluZy1tYW5h/Z2VyLXdvcmtpbmct/b24tc29jaWFsLW1l/ZGlhLW5ldHdvcmst/aW50ZXJuZXQtd2Vi/c2l0ZS1tb2JpbGUt/YW5kLWVtYWlsLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/ckNya2diSWFOSmpC/RmlydFRaSHlneUN6/bnZPbFFhWmxSSnQ0/VDdkWWIwPQ",
    language: "English",
    price: "Free",
  },
  {
    id: 6,
    title: "Digital Marketing Advanced",
    category: "Marketing",
    description: "Advanced strategies for campaigns and analytics.",
    thumbnail: "https://imgs.search.brave.com/d42U5XvY087mA2C-pvdpMroR_KHUGn81Wkxqm8a3AQM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/NS8yNi8wNi8wNS9k/aWdpdGFsLW1hcmtl/dGluZy00MjI5NjM3/XzY0MC5qcGc",
    language: "English",
    price: "Paid",
  },
  {
    id: 1,
    title: "Web Development",
    category: "Development",
    description: "Build modern web apps with React, HTML, CSS, JS.",
    thumbnail: "https://imgs.search.brave.com/ggoG5tEhpmmYzInpK2Bd1M3GitvIVCU8q7NktWonb34/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ3/ODA0NjE3Ni92ZWN0/b3IvZGV2ZWxvcGVy/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz05eVM3Ni1jTUx5/Mlo3QmZLQTZqZ09l/c19kVEFaaElJbXo0/VUwtelB5S2UwPQ",
    language: "JavaScript",
    price: "Paid",
  },
  {
    id: 2,
    title: "Data Science",
    category: "Data Science",
    description: "Analyze and visualize data using Python.",
    thumbnail: "https://imgs.search.brave.com/ERYE0OzcJb0IS2zz9dxOHy2jFUF19yCAJyys36zfZ8c/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDkxNjUz/NzQuanBn",
    language: "Python",
    price: "Paid",
  },
  {
    id: 3,
    title: "Machine Learning",
    category: "AI/ML",
    description: "Introduction to machine learning algorithms.",
    thumbnail: "https://imgs.search.brave.com/_qP9LIL1iPB68NxZfCYF3tIzkgkDQykbJs-TNJykDDg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvbWFjaGluZS1s/ZWFybmluZy13aGl0/ZS1iYW5uZXItc2Vy/dmVyLXNjaGVtYS1j/aXJjdWl0LWFydGlm/aWNpYWwtaW50ZWxs/aWdlbmNlLWFpLWxh/bmRpbmctcGFnZS1k/ZXNpZ24tYmlnLWRh/dGEtY3liZXItbWlu/ZC1kaWdpdGFsLWJy/YWluLWlzb21ldHJp/Yy12ZWN0b3ItaWxs/dXN0cmF0aW9uXzEw/MDI2NTgtMTM0OS5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw/JnE9ODA",
    language: "Python",
    price: "Paid",
  },
  {
    id: 4,
    title: "Machine Marketing",
    category: "Marketing",
    description: "Learn marketing analytics and automation.",
    thumbnail: "https://imgs.search.brave.com/Hy6_eZ0k3307aJ1H4HPPSQQx3iK11FO-CBaX8O2sM38/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY0/OTY3OTgxOS92ZWN0/b3IvcHV6emxlcy1h/dXRvbWF0aW9uLXJv/Ym90LWFybS1tYWNo/aW5lLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz13bnJvUkpF/bFBqMWMyZDFLclZZ/ZVh4dE5mbHNxR2Ja/c3Nya0YtUWtvRlRn/PQ",
    language: "English",
    price: "Paid",
  },
  {
    id: 5,
    title: "Digital Marketing",
    category: "Marketing",
    description: "SEO, Ads, and Social Media strategies.",
    thumbnail: "https://imgs.search.brave.com/_Ej8ekHKNr_j4vwE1r2tDEZjNvJQJsxzjng1SwBWhZY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA2/MjkzMjgyMi9waG90/by9kaWdpdGFsLW1h/cmtldGluZy1tYW5h/Z2VyLXdvcmtpbmct/b24tc29jaWFsLW1l/ZGlhLW5ldHdvcmst/aW50ZXJuZXQtd2Vi/c2l0ZS1tb2JpbGUt/YW5kLWVtYWlsLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz10/ckNya2diSWFOSmpC/RmlydFRaSHlneUN6/bnZPbFFhWmxSSnQ0/VDdkWWIwPQ",
    language: "English",
    price: "Free",
  },
  {
    id: 6,
    title: "Digital Marketing Advanced",
    category: "Marketing",
    description: "Advanced strategies for campaigns and analytics.",
    thumbnail: "https://imgs.search.brave.com/d42U5XvY087mA2C-pvdpMroR_KHUGn81Wkxqm8a3AQM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/NS8yNi8wNi8wNS9k/aWdpdGFsLW1hcmtl/dGluZy00MjI5NjM3/XzY0MC5qcGc",
    language: "English",
    price: "Paid",
  },
];

const CourseList = () => {
  const [filters, setFilters] = useState({ category: "", price: "", language: "" });
  const [appliedFilters, setAppliedFilters] = useState({ category: "", price: "", language: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(filters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    setFilters({ category: "", price: "", language: "" });
    setAppliedFilters({ category: "", price: "", language: "" });
    setIsFilterOpen(false);
  };

  const filteredCourses = courses.filter((course) => {
    return (
      (appliedFilters.category ? course.category === appliedFilters.category : true) &&
      (appliedFilters.price ? course.price === appliedFilters.price : true) &&
      (appliedFilters.language ? course.language === appliedFilters.language : true)
    );
  });

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-white to-blue-200">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-60 h-full  p-4 bg-white shadow space-y-4">
        <h2 className="text-xl font-bold mb-2">Filters</h2>
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            <option value="Development">Development</option>
            <option value="Data Science">Data Science</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Price</label>
          <select
            name="price"
            value={filters.price}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Language</label>
          <select
            name="language"
            value={filters.language}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1 text-sm"
          >
            <option value="">All</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="English">English</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={applyFilters}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-sm"
          >
            Apply
          </button>
          <button
            onClick={resetFilters}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-1 rounded text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Courses Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top bar */}
        <div className="flex justify-between items-center p-4 bg-white shadow-md h-20">
          <h1 className="text-2xl font-bold">Browse Courses</h1>
          {/* Mobile filter button */}
          <button
            className="md:hidden px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </button>
        </div>

        {/* Courses Grid */}
        <div className="flex-1 p-4 overflow-auto">
          {filteredCourses.length === 0 ? (
            <p className="text-center text-gray-700">No courses found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-40 object-cover" />
                  <div className="p-3">
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-gray-500 text-sm mb-1">{course.category}</p>
                    <p className="text-gray-700 text-sm mb-2">{course.description}</p>
                    <div className="flex space-x-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded text-sm">
                        Enroll
                      </button>
                      <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded text-sm">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-3/4 max-w-xs bg-gradient-to-br from-white to-blue-200 p-4 h-screen">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">Filters</h2>
              <button className="font-bold text-gray-800" onClick={() => setIsFilterOpen(false)}>
                X
              </button>
            </div>
            {/* Sidebar content reused */}
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 text-sm"
                >
                  <option value="">All</option>
                  <option value="Development">Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Price</label>
                <select
                  name="price"
                  value={filters.price}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 text-sm"
                >
                  <option value="">All</option>
                  <option value="Free">Free</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Language</label>
                <select
                  name="language"
                  value={filters.language}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 text-sm"
                >
                  <option value="">All</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="English">English</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={applyFilters}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-sm"
                >
                  Apply
                </button>
                <button
                  onClick={resetFilters}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-1 rounded text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
