import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosSettings } from "../../axios/axios";
import { OnRentState, OnRentParams, OnRentApiResponse } from "./OnRentType";
import { RootState } from "../../redux/store";
import { GetTime } from "../../timeget/timeget";

//情報取得API連携
export const fetchAsyncOnRent: any = createAsyncThunk<
  OnRentParams,
  OnRentApiResponse
>("OnRent/post", async () => {
  const response = await axiosSettings.post("build/admin/on_rent.php");
  console.log(response);
  return response.data;
});

const initialState: OnRentState = {
  onRent: null,
  updatedTime: "",
  loading: false,
  error: "",
};

const OnRentSlice = createSlice({
  name: "OnRent",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncOnRent.fulfilled, (state, action) => {
      //トークン認証&通信成功、データを受け取る
      if (action.payload.msg === "Success") {
        state.onRent = action.payload.data;
        state.updatedTime = GetTime();
        state.error = "";
      } else {
        state.error = action.payload.data;
      }
      state.loading = false;
    });
    builder.addCase(fetchAsyncOnRent.pending, (state, action) => {
      state.loading = true;
    });
    // builder.addCase(fetchAsyncOnRent.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.data;
    // });
  },
});

export const onRentInfo = (state: RootState) => state.OnRent.onRent;
export const onRentError = (state: RootState) => state.OnRent.error;
export const onRentLoading = (state: RootState) => state.OnRent.loading;
export const onRentUpdatedTime = (state: RootState) => state.OnRent.updatedTime;
export default OnRentSlice.reducer;
