import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../features/hooks";
import {
  getAttemptsThunk,
  sendAttemptThunk,
} from "../../features/features/attemptSlice";
import { useEffect, useState } from "react";

const Attempts = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { attempts, loading } = useAppSelector((state) => state.attempt);
  const [targetEmail, setTargetEmail] = useState("");
  const getAttempts = async () => {
    dispatch(getAttemptsThunk());
  };
  const handleSendAttempt = () => {
    dispatch(sendAttemptThunk(targetEmail));
  };

  useEffect(() => {
    getAttempts();
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      p={2}
      gap={4}
    >
      <Typography
        fontFamily={"Segoe UI"}
        fontWeight={"bold"}
        letterSpacing={2}
        variant="h2"
        color={theme.palette.primary.main}
      >
        Phishing Attempts
      </Typography>

      <Typography
        fontFamily={"Segoe UI"}
        fontWeight={400}
        letterSpacing={2}
        variant="h5"
        color={theme.palette.primary.main}
      >
        Send phishing attempt
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"row"}
        p={2}
        gap={2}
      >
        <TextField
          placeholder="Target Email Address"
          value={targetEmail}
          onChange={(e) => setTargetEmail(e.target.value)}
        />
        <Button variant="contained" onClick={handleSendAttempt}>
          send
        </Button>
      </Box>
      {!loading && attempts.length > 0 && (
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          p={2}
        >
          {attempts.map((attempt) => (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              p={2}
              key={attempt._id}
            >
              <Typography>{attempt._id}</Typography>
              <Typography>{attempt.email}</Typography>
              <Typography>
                Is Clicked URL: {attempt.isClickedUrl ? "Yes" : "No"}
              </Typography>
              <Typography>
                Created At: {new Date(attempt.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Attempts;
