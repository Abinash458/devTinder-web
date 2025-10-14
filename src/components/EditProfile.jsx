import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import SuccessAlert from "./SuccessAlert";

const EditProfile = ({ userData }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl || "");
  const [age, setAge] = useState(userData?.age || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [about, setAbout] = useState(userData?.about || "");
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const saveProfile = async () => {
    setError(null);
    setToastMessage(null);
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setToastMessage(res?.data?.message);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-3 my-20">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          {error && <p className="text-red-500">{error}</p>}
          {toastMessage && <SuccessAlert message={toastMessage} />}
          <div className="my-4">
            <div className="my-4">
              <label className="floating-label">
                <span>First Name</span>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-md w-full"
                />
              </label>
            </div>
            <div className="my-4">
              <label className="floating-label">
                <span>Last Name</span>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-md w-full"
                />
              </label>
            </div>
            <div className="my-4">
              <label className="validator floating-label">
                <span>Photo Url</span>
                <input
                  className="input input-md w-full"
                  type="url"
                  required
                  placeholder="PhotoURL"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  pattern="^(https?://)?([a-zA-Z0-9]([a-zA-Z0-9\-].*[a-zA-Z0-9])?\.)+[a-zA-Z].*$"
                  title="Must be valid URL"
                />
              </label>
            </div>
            <div className="my-4">
              <label className="floating-label">
                <span>Age</span>
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  min="18"
                  title="18 is minimum year"
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-md w-full"
                />
              </label>
            </div>
            <div className="my-4">
              <select
                value={gender}
                className="select w-full"
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="" disabled={true}>
                  Select a gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="my-4">
              <label className="floating-label">
                <span>About</span>
                <textarea
                  className="textarea w-full"
                  placeholder="About"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>
          <div className="card-actions justify-center mb-2">
            <button onClick={saveProfile} className="btn btn-primary w-full">
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
