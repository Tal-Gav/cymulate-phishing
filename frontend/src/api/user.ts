import axios from "axios";
import type { UserDraft } from "../features/features/authSlice";

export const createUser = async (user: UserDraft) => {
  const response = await axios.post(
    "http://localhost:5000/user/register",
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

export const loginUser = async (user: UserDraft) => {
  const response = await axios.post("http://localhost:5000/user/login", user, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

export const getAttempts = async () => {
  const response = await axios.get("http://localhost:3000/phishing", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

export const sendAttempt = async (email: string) => {
  const response = await axios.post(
    "http://localhost:3000/phishing/send",
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  return response.data;
};
