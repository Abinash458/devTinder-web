import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getRequests, removeRequest } from "../utils/requestSlice";
import ListItems from "./ListItems";
import SuccessAlert from "./SuccessAlert";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((s) => s.requests);
  const [toastMessage, setToastMessage] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(getRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (status, _id) => {
    setToastMessage(null);
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
      setToastMessage(res?.data?.message);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  if (requests?.length === 0)
    return <h1 className="my-20 text-center text-xl">No requests found</h1>;

  return (
    <>
      {toastMessage && <SuccessAlert message={toastMessage} />}
      <div className="w-3xl my-20 m-auto">
        <ul className="list bg-base-300 rounded-box shadow-lg">
          <li className="p-4 pb-2 text-xl opacity-60 tracking-wide">
            Requests
          </li>
          {requests?.map((item) => (
            <ListItems
              key={item._id}
              item={item?.fromUserId}
              type="request"
              reviewRequest={reviewRequest}
              _id={item._id}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Requests;
