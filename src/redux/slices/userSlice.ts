import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  tel: number;
  email: string;
  career: string;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((_, index) => index !== action.payload);
    },
  },
});

export const { addUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
