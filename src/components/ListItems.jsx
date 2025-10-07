const ListItems = ({ item, type = "request" }) => {
  const { firstName, lastName, photoUrl, about, age, gender } = item;
  return (
    <>
      <li className="list-row">
        <div>
          <img
            className="size-20 rounded-box"
            alt="connection-photo"
            src={photoUrl}
          />
        </div>
        <div>
          <div>{firstName + " " + lastName}</div>
          {age && gender && (
            <div className="text-xs uppercase font-semibold opacity-60">
              {age + ", " + gender}
            </div>
          )}
          <p className="list-col-wrap text-xs mt-2">{about}</p>
        </div>
        {type === "request" ? (
          <>
            <button className="btn btn-secondary">Accept</button>
            <button className="btn btn-primary">Reject</button>
          </>
        ) : (
          <button className="btn btn-secondary">Remove</button>
        )}
      </li>
    </>
  );
};

export default ListItems;
