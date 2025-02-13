import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//global initial state
const initialState = {
  ticketListofAllUser: [],
  isLoading: true,
  noteList: [],
};

export const getListOfTicketsForAllUsers = createAsyncThunk(
  "/ticket/getListOfTicketsForAllUsers",

  async () => {
    const response = await axios.get(
      `https://helpdesk-backend-9a32.onrender.com/api/v1/agent/ticket/get`,
      {
        withCredentials: true,
      }
    );
    console.log("3030 :: ", response.data);

    return response.data;
  }
);

export const updateTicketStatus = createAsyncThunk(
  "/order/updateTicketStatus",
  async ({ id, status }) => {
    console.log("1", status);
    console.log("2", id);

    const response = await axios.put(
      `https://helpdesk-backend-9a32.onrender.com/api/v1/agent/ticket/update/${id}`,
      { status }
    );

    console.log("666", response.data);

    return response.data;
  }
);

const agentTicketSlice = createSlice({
  name: "agentTicket",
  initialState,
  reducers: {
    resetTicketDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getListOfTicketsForAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListOfTicketsForAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticketListofAllUser = action.payload.data;
      })
      .addCase(getListOfTicketsForAllUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTicketStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTicketStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticketListofAllUser = action.payload.data;
      })
      .addCase(updateTicketStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetTicketDetails } = agentTicketSlice.actions;

export default agentTicketSlice.reducer;
