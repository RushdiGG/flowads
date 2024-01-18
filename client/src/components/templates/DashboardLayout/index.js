import React from "react";
import PersistentDrawerLeft from "../../organisms/Navigation/PersistentDrawerLeft";
import "./styles.css";

export default function DashboardLayout({ title, className, children }) {
  return (
    <div className="layout-wrapper dashboard-layout">
      <div className={className}>
        <PersistentDrawerLeft title={title} />
        {children}
      </div>
    </div>
  );
}
