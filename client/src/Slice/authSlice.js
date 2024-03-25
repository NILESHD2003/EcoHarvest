import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
// Define an async thunk for logging in

export const loginAsync = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    console.log(email, password);
    try {
      const response = await axios.post(
        "https://ecoharvest.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        console.log("Correct");
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;

        toast.success("Login successful");
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.error.message); // Display error message using toast
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
