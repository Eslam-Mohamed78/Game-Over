import React from "react";
// import style from './Layout.module.scss'
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
}
