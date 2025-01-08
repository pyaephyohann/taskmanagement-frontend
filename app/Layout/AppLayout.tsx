"use client";

import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { fetchAppDatas } from "../store/slices/appSlice";

interface Props {
  children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAppDatas());
  }, [dispatch]);

  return <div>{children}</div>;
};

export default AppLayout;
