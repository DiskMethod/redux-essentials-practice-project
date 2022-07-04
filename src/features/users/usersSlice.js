import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

// const initialState = [
//   { id: "0", name: "Tianna Jenkins" },
//   { id: "1", name: "Kevin Grant" },
//   { id: "2", name: "Madison Price" },
// ];

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/fakeapi/users");
  return response.data;
});

// export const selectAllUsers = (state) => state.users;

// export const selectUserById = (state, userId) => {
//   return state.users.find((user) => user.id === userId);
// };

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

export default usersSlice.reducer;
