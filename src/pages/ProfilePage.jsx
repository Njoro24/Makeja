import { useState } from "react";
import UserProfile from "../components/profile/UserProfile";
import ProfileEdit from "../components/profile/ProfileEdit";
import Settings from "../components/profile/Settings";
import { getUserProfile, updateUserProfile, changePassword } from '../services/user';

const dummyUser = {
  fullName: "Marvin Mango",
  email: "marvinke2001@gmail.com",
  gender: "Male",
  preference: "Single Room",
  hostel: "Qwetu Hostel",
  roomNumber: "135",
  profilePicture: "", // can be updated
};

const ProfilePage = () => {
  const [user, setUser] = useState(dummyUser);
  const [activeTab, setActiveTab] = useState("profile");

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-[#1B263B] rounded-xl shadow-lg">
        <div className="flex justify-between items-center p-6 border-b border-[#415A77]">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <div className="space-x-3">
            {["profile", "edit", "settings"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-[#415A77] hover:bg-[#3b4f6a]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "profile" && <UserProfile user={user} />}
          {activeTab === "edit" && (
            <ProfileEdit user={user} onSave={handleUpdate} />
          )}
          {activeTab === "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
