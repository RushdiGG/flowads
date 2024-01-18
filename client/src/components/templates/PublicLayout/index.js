import React from "react";
import "./styles.css";
import Navbar from "../../organisms/Navigation/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="layout-wrapper public-layout">
      <Navbar />
      <div className="layout-wrapper public-layout-inner">{children}</div>
    </div>
  );
}
