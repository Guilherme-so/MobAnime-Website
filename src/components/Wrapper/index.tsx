import { ReactNode } from "react";
import { Navbar } from "../Navbar";
import { Sidebar } from "../Sidebar";
import { Footer } from "../Footer";

import style from "./wrapper.module.css";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className={style.container}>
      <Navbar />
      <main className={style.main}>
        {children}
        <Sidebar />
      </main>
      <Footer />
    </div>
  );
};
