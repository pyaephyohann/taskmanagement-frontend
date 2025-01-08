import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProjectsState {
  isLoading: boolean;
  items: any;
}

const initialState: ProjectsState = {
  isLoading: false,
  items: [],
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<any>) => {
      state.items = action.payload;
    },
    addProject: (state, action: PayloadAction<any>) => {
      state.items = [...state.items, action.payload];
    },
    updateProject: (state, action: PayloadAction<any>) => {
      state.items = [
        ...state.items.map((item: any) =>
          action.payload.id === item.id ? action.payload : item
        ),
      ];
    },
    deleteProject: (state, action: PayloadAction<any>) => {
      state.items = state.items.filter(
        (item: any) => action.payload.id !== item.id
      );
    },
  },
});

export const { setProjects, addProject, updateProject, deleteProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
