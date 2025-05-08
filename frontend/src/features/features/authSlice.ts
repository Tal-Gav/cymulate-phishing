import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { createUser, loginUser } from "../../api/user";
import { Roles } from "../../routes/constants";

export interface UserDraft {
  email: string;
  password: string;
}

export interface AuthState {
  user: {
    role: Roles | null;
    email: string;
  };
  accessToken: string;
  loading: boolean;
}

const initialState: AuthState = {
  user: {
    role: null,
    email: "",
  },
  accessToken: "",
  loading: false,
};

export const createUserThunk = createAsyncThunk(
  "user/create",
  async (user: UserDraft, thunkAPI) => {
    try {
      const response = await createUser(user);

      return response;
    } catch (error: any) {
      // toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (user: UserDraft, thunkAPI) => {
    try {
      const response = await loginUser(user);

      return response;
    } catch (error: any) {
      // toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Error");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { user, accessToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        const { user, accessToken } = action.payload;
        state.user = user;
        state.accessToken = accessToken;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
