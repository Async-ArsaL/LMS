import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovalDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending users
  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:4000/api/v7/auth/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setPendingUsers(response.data.data);
      } else {
        setError("Failed to fetch pending users.");
      }
    } catch (err) {
      console.error("Failed to fetch pending users:", err);
      setError("Error fetching pending users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:4000/api/v7/auth/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setPendingUsers((prev) => prev.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.error("Failed to approve user:", err);
      alert("Failed to approve user.");
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:4000/api/v7/auth/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setPendingUsers((prev) => prev.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.error("Failed to reject user:", err);
      alert("Failed to reject user.");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pending Users Approval</h1>
      {pendingUsers.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border flex gap-2">
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(user._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApprovalDashboard;
