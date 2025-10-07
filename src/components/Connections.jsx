import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getConnections } from "../utils/connectionSlice";
import ListItems from "./ListItems";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((s) => s.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(getConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections?.length === 0)
    return <h1 className="my-20 text-center text-xl">No connections found</h1>;

  return (
    <div className="w-3xl my-20 m-auto">
      <ul className="list bg-base-300 rounded-box shadow-lg">
        <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">
          Connections
        </li>
        {connections?.map((item) => (
          <ListItems
            key={item._id}
            item={item}
            type="connections"
            _id={item._id}
          />
        ))}
      </ul>
    </div>
  );
};

export default Connections;
