import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SidebarRow.css";
function SidebarRow({ selected, title, Icon }) {

  // const location = useLocation();
  // const [selectedRow, setselectedRow] = useState(false)
  // useEffect(() => {

  //   console.log(location.pathname);

  //   return () => {
  //   }
  // }, [selectedRow])

  

  return (

    <div className={`sidebar-row ${selected == true && 'selected'}`}>
   
      <Icon className="sidebar-row__icon" />
      <h2 className="sidebar-row__title">{title}</h2>
    </div>
    // <li onClick={navigatePage} >
    //   <div className={`sidebar-row `}>
    //     <Icon className="sidebar-row__icon" />
    //     <h2 className="sidebar-row__title"> {title} - {selectedRow}</h2>
    //   </div>
    // </li>
  );
}

export default SidebarRow;
