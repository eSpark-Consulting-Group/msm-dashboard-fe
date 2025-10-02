import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../services/auth";
import { userApi } from "../../services/users";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("msm_token");
      localStorage.removeItem("user");
    },
    handleChangePassword: (state) => {
      if (state.user) {
        state.user.isPasswordChanged = true;
      }

      const user = JSON.parse(localStorage.getItem("user")) || {};
      user.isPasswordChanged = true;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data?.user;
        localStorage.setItem("msm_token", data?.token);
        localStorage.setItem("user", JSON.stringify(data?.user));
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data;
        localStorage.setItem("user", JSON.stringify(data));
      }
    );
    builder.addMatcher(
      authApi.endpoints.getUserInfo.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        state.user = data;
        localStorage.setItem("user", JSON.stringify(data));
      }
    );
  },
});

export const { logout, handleChangePassword } = slice.actions;

export default slice.reducer;
