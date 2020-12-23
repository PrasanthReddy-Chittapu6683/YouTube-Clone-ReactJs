import React from "react";
import "./SidebarRow.css";
function SidebarRow({ selected, title, Icon }) {
  return (
    <div className={`sidebar-row ${selected && 'selected'}`}>
      <Icon className="sidebar-row__icon" />
      <h2 className="sidebar-row__title">{title}</h2>
    </div>
  );
}

export default SidebarRow;
