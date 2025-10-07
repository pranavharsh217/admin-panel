import { createSlice } from "@reduxjs/toolkit";

const formSlice = createSlice({
  name: "form",
  initialState: {
    users: [], // array of users
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(u => u._id === action.payload._id);
      if (index !== -1) state.users[index] = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(u => u._id !== action.payload);
    },
  },
});

// ✅ Export the same names you use in imports
export const { setUsers, addUser, updateUser, deleteUser } = formSlice.actions;

export default formSlice.reducer;
