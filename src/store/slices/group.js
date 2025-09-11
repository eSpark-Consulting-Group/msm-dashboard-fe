import { createSlice } from "@reduxjs/toolkit";
import { groupApi } from "../../services/groups";

const initialState = {
  groups: [],
  selectedGroup: null,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    clearGroups: (state) => {
      state.groups = [];
      state.selectedGroup = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      groupApi.endpoints.getAllGroups.matchFulfilled,
      (state, { payload }) => {
        state.groups = payload?.data || payload || [];
      }
    );

    builder.addMatcher(
      groupApi.endpoints.getGroupById.matchFulfilled,
      (state, { payload }) => {
        state.selectedGroup = payload?.data || payload;
      }
    );
  },
});

export const { clearGroups } = groupsSlice.actions;
export default groupsSlice.reducer;
