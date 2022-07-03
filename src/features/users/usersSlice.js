import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client";

// const initialState = [
//   { id: "0", name: "Tianna Jenkins" },
//   { id: "1", name: "Kevin Grant" },
//   { id: "2", name: "Madison Price" },
// ];

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/fakeapi/users");
  return response.data;
});

export default usersSlice.reducer;
