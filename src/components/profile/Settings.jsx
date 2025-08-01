import { useState } from "react";
import { changePassword } from "../../services/user";

const Settings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await changePassword(formData.currentPassword, formData.newPassword);


      if (response.success) {
        alert("Password updated successfully.");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        alert(response.message || "Failed to update password.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while changing password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-[#0D1B2A] text-white p-6 rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      <div>
        <label className="block mb-1">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          required
        />
      </div>

      <div>
        <label className="block mb-1">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Confirm New Password</label>
        <input
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default Settings;
