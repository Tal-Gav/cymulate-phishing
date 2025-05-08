import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAttempts, sendAttempt } from "../../api/user";
import toast from "react-hot-toast";

export interface Target {
  createdAt: string | number | Date;
  _id: string;
  email: string;
  isClickedUrl: boolean;
}

export interface AttemptState {
  attempts: Array<Target>;
  loading: boolean;
}

const initialState: AttemptState = {
  attempts: [],
  loading: false,
};

export const getAttemptsThunk = createAsyncThunk(
  "attempt/get",
  async (_, thunkAPI) => {
    try {
      const response = await getAttempts();

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const sendAttemptThunk = createAsyncThunk(
  "attempt/send",
  async (targetEmail: string, thunkAPI) => {
    try {
      const response = await sendAttempt(targetEmail);
      toast.success("Email sent to the target");

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const attemptSlice = createSlice({
  name: "attempt",
  initialState,
  reducers: {
    // setAuth(state, action: PayloadAction<{ accessToken: string }>) {
    //   state.accessToken = action.payload.accessToken;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getAttemptsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAttemptsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.attempts = action.payload;
      })
      .addCase(getAttemptsThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = attemptSlice.actions;

export default attemptSlice.reducer;
