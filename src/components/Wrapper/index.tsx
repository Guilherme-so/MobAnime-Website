import { ReactNode } from "react";
// import { Sidebar } from "../Sidebar";

import style from "./wrapper.module.css"

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {

    return (
    <div className={style.container}>
      <main className={style.main}>
        {children}
        {/* <Sidebar /> */}
      </main>
    </div>
  );
};