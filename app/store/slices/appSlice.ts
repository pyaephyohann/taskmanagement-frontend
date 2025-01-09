import { config } from "@/config";
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "..";
import { setUsers } from "./usersSlice";
import { setProjects } from "./projectsSlice";
import { setTasks } from "./tasksSlice";
// import { setUsers } from "./usersSlice";

interface BackofficeState {
  init: boolean;
  isLoading: boolean;
}

const initialState: BackofficeState = {
  init: false,
  isLoading: false,
};

export const fetchAppDatas = createAsyncThunk(
  "app/fetchAppDatas",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(`http://192.168.1.15:80/api/data`);
    const responseJson = await response.json();
    const { users, projects, tasks } = responseJson;
    thunkAPI.dispatch(setUsers(users));
    thunkAPI.dispatch(setProjects(projects));
    thunkAPI.dispatch(setTasks(tasks));
    thunkAPI.dispatch(setInit(true));
    thunkAPI.dispatch(setIsLoading(false));
  }
);

export const selectApp = (state: RootState) => state.app;
export const selectUsers = (state: RootState) => state.users.items;
export const selectProjects = (state: RootState) => state.projects.items;
export const selectTasks = (state: RootState) => state.tasks.items;

export const appDatas = createSelector(
  [selectApp, selectUsers, selectProjects, selectTasks],
  (app, users, projects, tasks) => {
    return {
      isLoading: app.isLoading,
      users,
      projects,
      tasks,
    };
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setInit, setIsLoading } = appSlice.actions;

export default appSlice.reducer;
