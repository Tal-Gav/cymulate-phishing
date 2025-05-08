import { useAppDispatch, useAppSelector } from "../features/hooks";
import { setAuth } from "../features/features/authSlice";
import axios from "axios";

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    const response = await axios.get("http://localhost:5000/user/refresh", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    const accessToken = response.data.accessToken;

    // Save the token to localStorage
    localStorage.setItem("accessToken", accessToken);
    dispatch(setAuth(accessToken));
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
