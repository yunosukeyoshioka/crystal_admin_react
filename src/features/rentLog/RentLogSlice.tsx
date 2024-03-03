import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosSettings } from "../../axios/axios";
import { RentLogState, RentLogParams, RentLogApiResponse } from "./RentLogType";
import { RootState } from "../../redux/store";
import { GetTime } from "../../timeget/timeget";

//情報取得API連携
export const fetchAsyncRentLog: any = createAsyncThunk<
  RentLogApiResponse & { page: number },
  RentLogParams
>("RentLog/post", async (page) => {
  const response = await axiosSettings.post(
    `build/admin/rent_log.php?page=${page}`
  );
  return { ...response.data, page };
});

const initialState: RentLogState = {
  initialRentLog: null,
  otherRentLog: null,
  updatedTime: "",
  loading: false,
  error: "",
};

const RentLogSlice = createSlice({
  name: "RentLog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncRentLog.fulfilled, (state, action) => {
      //トークン認証&通信成功、データを受け取る
      const { page, data, msg } = action.payload;
      //1ページ目だけ保持、その他は都度更新
      if (msg === "Success") {
        if (page === 1) {
          state.initialRentLog = data;
          state.updatedTime = GetTime();
          state.error = "";
        } else {
          state.otherRentLog = data;
        }
      } else {
        state.error = data;
      }
      state.loading = false;
    });
    builder.addCase(fetchAsyncRentLog.pending, (state, action) => {
      state.loading = true;
    });
    // builder.addCase(fetchAsyncRentLog.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload.data;
    // });
  },
});

export const initialRentLogInfo = (state: RootState) =>
  state.RentLog.initialRentLog;
export const otherRentLogInfo = (state: RootState) =>
  state.RentLog.otherRentLog;
export const rentLogError = (state: RootState) => state.RentLog.error;
export const rentLogLoading = (state: RootState) => state.RentLog.loading;
export const rentLogUpdatedTime = (state: RootState) =>
  state.RentLog.updatedTime;
export default RentLogSlice.reducer;
