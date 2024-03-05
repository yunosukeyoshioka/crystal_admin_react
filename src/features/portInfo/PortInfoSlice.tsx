import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosSettings } from "../../axios/axios";
import { PortInfoState, PortInfoParams, PortInfoApiResponse } from "./PortInfoType";
import { RootState } from "../../redux/store";
import { GetTime } from "../../timeget/timeget";

//情報取得API連携
export const fetchAsyncPortInfo: any = createAsyncThunk<
  PortInfoParams,
  PortInfoApiResponse
>("portInfo/post", async () => {
  const response = await axiosSettings.post("build/admin/port_info.php");
  console.log(response);
  return response.data;
});

const initialState: PortInfoState = {
  portInfo: null,
  updatedTime: "",
  loading: false,
  error: "",
};

const PortInfoSlice = createSlice({
  name: "PortInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncPortInfo.fulfilled, (state, action) => {
      //トークン認証&通信成功、データを受け取る
      if (action.payload.msg === "Success") {
        state.portInfo = action.payload.data;
        state.updatedTime = GetTime();
        state.error = "";
      } else {
        state.error = action.payload.data;
      }
      state.loading = false;
    });
    builder.addCase(fetchAsyncPortInfo.pending, (state, action) => {
      state.loading = true;
    });

  },
});

export const PortInfoInfo = (state: RootState) => state.PortInfo.portInfo;
export const PortInfoError = (state: RootState) => state.PortInfo.error;
export const PortInfoLoading = (state: RootState) => state.PortInfo.loading;
export const PortInfoUpdatedTime = (state: RootState) => state.PortInfo.updatedTime;
export default PortInfoSlice.reducer;
