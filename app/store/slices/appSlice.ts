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
import axios from "axios";
import Cookies from "js-cookie";
import { config } from "@/app/config";

interface BackofficeState {
  init: boolean;
  isLoading: boolean;
}

const initialState: BackofficeState = {
  init: false,
  isLoading: false,
};

const csrfToken = Cookies.get("XSRF-TOKEN");

axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

axios.defaults.headers.common[
  "Authorization"
] = `Bearer 2|OXLPwHIjbYsyVqa8ALu9a9MNrxB8zpRSk9CqdjhDd4579719`;

export const fetchAppDatas = createAsyncThunk(
  "app/fetchAppDatas",
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));

    try {
      const response = await axios.get(`${config.apiBaseUrl}/data`);
      const { users, projects, tasks } = response.data;

      thunkAPI.dispatch(setUsers(users));
      thunkAPI.dispatch(setProjects(projects));
      thunkAPI.dispatch(setTasks(tasks));
      thunkAPI.dispatch(setInit(true));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      thunkAPI.dispatch(setIsLoading(false));
    }
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
