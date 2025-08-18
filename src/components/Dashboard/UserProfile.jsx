import React, { useContext } from "react";
import { AuthContext } from "../../contextApi/AuthContext";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  const photo = user.photoURL;
  console.log(photo);
  return (
    <div className="p-6 space-y-8">
      {/* Profile Card */}
      <div className="card lg:card-side bg-base-100 shadow-xl p-6">
        <figure className="avatar max-w-30 max-h-30 ">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user.photoURL} alt="Admin" />
          </div>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">
            {user.displayName}
            <div className="badge badge-success">User</div>
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
