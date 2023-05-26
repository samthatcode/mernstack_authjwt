import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5174",
        {},
        {
          withCredentials: true,
        }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="home_page bg-slate-50 p-4 rounded-md shadow-md">
        <h4 className="text-center">
          Welcome <span className="font-bold text-xl">{username}</span>
        </h4>
        <button
          onClick={Logout}
          className="mt-4 w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Log Out
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
