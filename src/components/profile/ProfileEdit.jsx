import { useState } from "react";

const ProfileEdit = ({ user, onSave }) => {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          />
        </div>

        <div>
          <label className="block mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Room Preference</label>
          <select
            name="preference"
            value={formData.preference}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          >
            <option value="">Select</option>
            <option value="Single Room">Single Room</option>
            <option value="Double Room">Double Room</option>
            <option value="Shared Dorm">Shared Dorm</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Hostel</label>
          <input
            type="text"
            name="hostel"
            value={formData.hostel}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          />
        </div>

        <div>
          <label className="block mb-1">Room Number</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full p-2 rounded-md bg-[#1B263B] text-white border border-[#415A77]"
          />
        </div>

        <div>
          <label className="block mb-1">Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileEdit;
