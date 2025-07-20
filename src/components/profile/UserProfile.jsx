const UserProfile = ({ user }) => {
  return (
    <div className="bg-[#0D1B2A] text-white p-6 rounded-xl max-w-2xl w-full mx-auto">
      <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
      <div className="flex flex-col gap-4">
        {user?.profilePicture && (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
          />
        )}
        <div>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Preference:</strong> {user.preference}</p>
          <p><strong>Hostel:</strong> {user.hostel || "Not provided"}</p>
          <p><strong>Room Number:</strong> {user.roomNumber || "Not provided"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
