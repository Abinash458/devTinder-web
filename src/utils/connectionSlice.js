import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    getConnections: (state, action) => {
      return action.payload;
    },
    removeConnections: (state, action) => {
      return null;
    },
  },
});

export const { getConnections, removeConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
