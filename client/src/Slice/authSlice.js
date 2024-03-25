import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

export const sendOTP = createAsyncThunk(
  "auth/signup",
  async ({ name, email, password }, thunkAPI) => {
    console.log(name, email, password);
    console.log("Sending otp");
    try {
      const response = await axios.post(
        "https://ecoharvest.onrender.com/api/v1/auth/send-otp",
        {
          name,
          email,
          password,
        }
      );
      if (response.status === 200) {
        console.log("Otp Sended");
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

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
export const confirmOTP = createAsyncThunk(
  "signup/confirmOTP",
  async ({ name, email, password, confirmPassword, Enteredotp }) => {
    try {
      const response = await axios.post(
        "https://ecoharvest.onrender.com/api/v1/auth/signup",
        { name, email, password, confirmPassword, otp: Enteredotp }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  isSigningUp: false,
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
      })
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("OTP send successfully");
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("ERROR");
      })
      .addCase(confirmOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(confirmOTP.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Verified successfully");
      })
      .addCase(confirmOTP.rejected, (state, action) => {
        state.isLoading = false;
        toast.error("WRONG OTP");
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
