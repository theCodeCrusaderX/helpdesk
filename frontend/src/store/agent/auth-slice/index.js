import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//global initial state
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  agent: {},
};

export const registerAgent = createAsyncThunk(
  "/auth/registerAgent",

  async (data) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/agent/register",
      data,
      {
        withCredentials: true,
      }
    );
    console.log("response form backend :: ", response.data);

    return response.data;
  }
);

export const loginAgent = createAsyncThunk(
  "/auth/loginAgent",

  async (data) => {
    const response = await axios.post(
      "http://localhost:8000/api/v1/agent/login",
      data,
      {
        withCredentials: true,
      }
    );
    console.log("response form backend :: ", response.data);

    return response.data;
  }
);

export const logoutAgent = createAsyncThunk("/auth/logoutAgent", async () => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/agent/logout",
    {},
    {
      withCredentials: true,
    }
  );
  console.log("response form backend :: ", response.data);

  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkAuth", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/v1/agent/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  console.log("response form backend for checkauth:: ", response.data);

  return response.data;
});

const authSlice = createSlice({
  name: "agentAuth",
  initialState,
  reducers: {
    setAgent: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerAgent.fulfilled, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.agent = null);
      })
      .addCase(registerAgent.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.agent = null);
      })
      .addCase(loginAgent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAgent.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.agent = null);
      })
      .addCase(loginAgent.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isAuthenticated = action.payload.success),
        //   console.log('111',action.payload);
          
          (state.agent = action.payload.success && action.payload.agent);
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.agent = null);
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.agent = action.payload.success ? action.payload.data : {};
      })
      .addCase(logoutAgent.fulfilled, (state) => {
        (state.isLoading = false),
          (state.agent = null),
          (state.isAuthenticated = false);
      });
  },
});

export const { setAgent } = authSlice.actions;
export default authSlice.reducer;
