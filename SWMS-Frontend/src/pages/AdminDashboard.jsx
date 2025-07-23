import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9705/adminDashboard", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };


  const MySwal = withReactContent(Swal);

  const deleteUser = async (userId) => {
    const result = await MySwal.fire({
      title: "⚠️ Are you absolutely sure?",
      html: `<strong>This action <span style="color: #e3342f;">cannot</span> be undone.</strong><br/>You will permanently remove this user.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "🔥 Yes, delete!",
      cancelButtonText: "Cancel",
      background: "#fefefe",
      backdrop: `
      rgba(0,0,0,0.4)
      url("https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDZyNmNtdnFyaThpdDF4d25vbTZibnRrbnQ1c3E3c2V3cGxod2x2MCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/f5cD0MPdJ1yYI/giphy.gif")
      left top
      no-repeat
    `,
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:9705/adminDashboard/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUsers(users.filter((user) => user._id !== userId));

        MySwal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "User deleted successfully!",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          background: "#f0fff4",
          color: "#1a202c",
        });
      } catch (err) {
        MySwal.fire({
          icon: "error",
          title: "Oops 😓",
          text: err.response?.data?.message || "Failed to delete user!",
          confirmButtonColor: "#e3342f",
          background: "#fff5f5",
        });
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-center text-xl mt-20">🔄 Loading users...</p>;
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          👥 Registered Users
        </h2>

        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No users found 😕</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border rounded-lg">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-200">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <UserCircle className="text-gray-400" size={24} />
                      <span>{user.name}</span>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="flex items-center gap-1 text-red-500 hover:text-red-700 transition font-medium text-sm"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
