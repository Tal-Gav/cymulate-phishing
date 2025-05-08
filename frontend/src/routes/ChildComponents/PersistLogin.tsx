import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import { setAuth } from "../../features/features/authSlice";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);
  const refresh = useRefreshToken();
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // Check if there is an existing token in localStorage
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
          dispatch(setAuth({ accessToken: storedToken })); // Initialize Redux state with token
          setIsLoading(false);
        } else {
          await refresh(); // Try refreshing the token
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted.current) setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

    isMounted.current = false;
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Box
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            loading
          </Box>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
