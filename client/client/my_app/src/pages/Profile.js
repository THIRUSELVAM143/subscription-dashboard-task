import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No user data found</p>
      </div>
    );
  }

  const firstLetter = user.name?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
     <Link
  to="/"
  className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg
             text-sm font-medium text-blue-600
             bg-blue-50 hover:bg-blue-100
             transition-all duration-200"
>
  <ArrowLeft size={16} />
  Back to Dashboard
</Link>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold shadow">
              {firstLetter}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-blue-100">{user.email}</p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">

            <ProfileRow label="Full Name" value={user.name} />
            <ProfileRow label="Email Address" value={user.email} />
            <ProfileRow label="Role" value={user.role} />
            <ProfileRow
              label="User ID"
              value={user.id || user._id}
              small
            />

          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
            <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100">
              Edit Profile
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

/* Reusable row component */
const ProfileRow = ({ label, value, small }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-3">
    <span className="text-sm text-gray-500">{label}</span>
    <span
      className={`font-medium text-gray-800 ${
        small ? "text-xs break-all" : ""
      }`}
    >
      {value || "N/A"}
    </span>
  </div>
);

export default Profile;
