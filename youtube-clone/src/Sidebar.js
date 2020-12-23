import React from "react";
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import HistoryIcon from "@material-ui/icons/History";
import SettingsIcon from "@material-ui/icons/Settings";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarRow selected Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={WhatshotIcon} title="Trending" />
      <SidebarRow Icon={SubscriptionsIcon}  title="Subscription" />
      <hr />
      <SidebarRow Icon={VideoLibraryIcon} title="Library" />
      <SidebarRow Icon={HistoryIcon} title="History" />
      <SidebarRow Icon={OndemandVideoIcon} title="Your Videos" />
      <SidebarRow Icon={SettingsIcon} title="Watch Later" />
      <SidebarRow Icon={ThumbUpAltOutlinedIcon} title="Liked vides" />
      <hr />
    
    </div>
  );
}

export default Sidebar;
