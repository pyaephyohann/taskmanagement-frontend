import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import { projectsSlice } from "./slices/projectsSlice";
import { tasksSlice } from "./slices/tasksSlice";
import { usersSlice } from "./slices/usersSlice";

// Explicitly define the return type of `makeStore`
export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appSlice,
      users: usersSlice.reducer,
      projects: projectsSlice.reducer,
      tasks: tasksSlice.reducer,
    },
  });
};

// Infer the `AppStore` type from the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
