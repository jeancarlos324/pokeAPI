import { createSlice } from "@reduxjs/toolkit";

export const userTrainerSlice = createSlice({
  name: "username",
  initialState: "",
  reducers: {
    changeName: (state,actions) =>{
      return actions.payload;
    }
  },
});

export const {changeName} = userTrainerSlice.actions;
export default userTrainerSlice.reducer;
