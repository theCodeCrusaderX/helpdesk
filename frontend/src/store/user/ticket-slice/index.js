import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//global initial state
const initialState = {
  ticketList: [],
  isLoading: true,
  noteList : [],
  ticketDetail : null
};

export const createTicket = createAsyncThunk(
  "/ticket/createTicket",

  async (data) => {
    const response = await axios.post(
      "https://helpdesk-backend-vple.onrender.com/api/v1/ticket/create",
      data,
      {
        withCredentials: true,
      }
    );
    console.log("response form backend :: ", response.data);

    return response.data;
  }
);

export const getListOfTickets = createAsyncThunk(
  "/ticket/getListOfTickets",

  async ({userId}) => {
    const response = await axios.get(
      `https://helpdesk-backend-vple.onrender.com/api/v1/ticket/get/${userId}`,
      {
        withCredentials: true,
        
      }
    );
    // console.log("3030 :: ", response);

    return response;
  }
);

export const addNote = createAsyncThunk(
  "/ticket/addNote",

  async ({ticketId,messageData}) => {
    const response = await axios.put(
      `https://helpdesk-backend-vple.onrender.com/api/v1/ticket/addNote/${ticketId}`,
      messageData,
      {
        withCredentials: true,
      }
    );
    console.log("response form backend to update:: ", response.data);

    return response.data;
  }
);

export const getListOfNotes = createAsyncThunk(
  "/ticket/getListOfNotes",

  async ({ticketItemId}) => {
    const response = await axios.get(
      `https://helpdesk-backend-vple.onrender.com/api/v1/ticket/getNote/${ticketItemId}`,
      {
        withCredentials: true,
        
      }
    );
    console.log("3032 :: ", response.data);

    return response.data;
  }
);

export const getTicketDetailByTicketId = createAsyncThunk(
  "/ticket/getTicketDetailByTicketId",

  async ({ticketId}) => {
    const response = await axios.get(
      `https://helpdesk-backend-vple.onrender.com/api/v1/ticket/getTicketDetail/${ticketId}`,
      {
        withCredentials: true,
        
      }
    );
    console.log("3031 :: ", response.data);

    return response.data;
  }
);


const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    resetTicketDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTicket.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getListOfTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListOfTickets.fulfilled, (state,action) => {
        state.isLoading = false;
        state.ticketList = action.payload.data.data
      })
      .addCase(getListOfTickets.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNote.fulfilled, (state,action) => {
        state.isLoading = false;
        // state.noteList = action.payload.data
      })
      .addCase(addNote.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getListOfNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListOfNotes.fulfilled, (state,action) => {
        state.isLoading = false;
        state.noteList = action.payload.data
      })
      .addCase(getListOfNotes.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getTicketDetailByTicketId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicketDetailByTicketId.fulfilled, (state,action) => {
        state.isLoading = false;
        state.ticketDetail = action.payload.data
      })
      .addCase(getTicketDetailByTicketId.rejected, (state) => {
        state.isLoading = false;
      });
  },
});


export const { resetTicketDetails } = ticketSlice.actions;

export default ticketSlice.reducer;
