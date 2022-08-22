import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   loading: false,
   users: [],
   error: "",
};

// createAsyncThunk generates pending, fulfilled, rejected action types.... these three are not generated by the object directly so we need to use them in the extrareducers
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
   return axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.data);
});

const userSlice = createSlice({
   name: "user",
   initialState: initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchUsers.pending, (state, action) => {
         state.loading = true;
      });
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
         state.loading = false;
         state.users = action.payload;
         state.error = "";
      });
      builder.addCase(fetchUsers.rejected, (state, action) => {
         state.loading = false;
         state.users = [];
         state.error = action.payload;
      });
   },
});

export default userSlice.reducer;