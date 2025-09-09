import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../services/users";

const initialState = {
  users: [],
  selectedUser: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getAllUsers.matchFulfilled,
      (state, { payload }) => {
        state.users = payload?.data || payload || [];
      }
    );

    builder.addMatcher(
      userApi.endpoints.getUserById.matchFulfilled,
      (state, { payload }) => {
        state.selectedUser = payload?.data || payload;
      }
    );
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
