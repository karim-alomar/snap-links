import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

// @ts-expect-error
import { axios } from "@/lib/axios";
import { APIResponseDatum, User } from "@/types";

export type UserSliceStateType = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: UserSliceStateType = {
  user: null,
  status: "idle",
};

export const fetchAuth = createAsyncThunk("auth", async () => {
  return await axios
    .get(`/auth`)
    .then(({ data }: AxiosResponse<APIResponseDatum<User>>) => {
      return data.data;
    });
});

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
