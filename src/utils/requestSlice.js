import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    getRequests: (state, action) => action.payload,
    removeRequests: (state, action) => null,
  },
});

export const { getRequests, removeRequests } = requestSlice.actions;

export default requestSlice.reducer;
