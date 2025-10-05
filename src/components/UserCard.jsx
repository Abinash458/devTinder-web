import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-lg">
      <figure>
        <img src={photoUrl} alt="user-photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        <div className="card-actions justify-start">
          {age && <div className="badge badge-outline">{age}</div>}
          {gender && <div className="badge badge-outline">{gender}</div>}
        </div>
        <div className="card-actions flex justify-between">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
