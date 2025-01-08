import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UsersState {
  isLoading: boolean;
  items: any;
}

const initialState: UsersState = {
  isLoading: false,
  items: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      state.items = state.items.map((item: any) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setUsers, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
