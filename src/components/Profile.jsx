import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((s) => s.user);
  return userData && <EditProfile userData={userData} />;
};

export default Profile;
