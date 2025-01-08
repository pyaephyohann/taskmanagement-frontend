import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TasksState {
  isLoading: boolean;
  items: any;
}

const initialState: TasksState = {
  isLoading: false,
  items: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
    },
    addTask: (state, action: PayloadAction<any>) => {
      state.items = [...state.items, action.payload];
    },
    updateTask: (state, action: PayloadAction<any>) => {
      state.items = [
        ...state.items.map((item: any) =>
          action.payload.id === item.id ? action.payload : item
        ),
      ];
    },
    deleteTask: (state, action: PayloadAction<any>) => {
      state.items = state.items.filter(
        (item: any) => action.payload.id !== item.id
      );
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
