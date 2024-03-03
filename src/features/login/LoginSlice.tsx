import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosSettings } from "../../axios/axios";
import { LoginApiResponse, LoginParams, LoginState } from "./LoginType";
import { RootState } from "../../redux/store";

//ログイン時の非同期API連携
export const fetchAsyncLogin: any = createAsyncThunk<
  LoginApiResponse,
  LoginParams
>("login/post", async ({ user_id, password }) => {
  const res = await axiosSettings.post("build/admin/login/login.php", {
    user_id,
    password,
  });
  return res.data;
});

//初期state
const initialState: LoginState = {
  user: "",
  loginSuccess: false,
  msg: "",
};

//slice
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    //userIdだけstoreで管理
    editUserId(state, action) {
      state.user = action.payload;
    },
    //ログアウト機能
    logout(state) {
      state.user = "";
      state.loginSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      //ログイン成功
      console.log(action.payload);
      if (action.payload.msg === "Success") {
        sessionStorage.setItem("token", action.payload.token!);
        state.loginSuccess = true;
        state.msg = "";
      }
      //ログイン失敗
      else {
        state.msg = action.payload.data;
      }
    });
  },
});

export const userId = (state: RootState) => state.login.user;
export const errorMsg = (state: RootState) => state.login.msg;
export const loginJudge = (state: RootState) => state.login.loginSuccess;
export const { editUserId, logout } = loginSlice.actions;
export default loginSlice.reducer;
