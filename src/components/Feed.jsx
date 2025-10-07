import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((s) => s.feed);
  const [error, setError] = useState("");

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (feed?.length <= 0)
    return <h1 className="my-20 text-center text-xl">No new users found</h1>;

  return (
    feed && (
      <div className="flex justify-center items-center my-20">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
