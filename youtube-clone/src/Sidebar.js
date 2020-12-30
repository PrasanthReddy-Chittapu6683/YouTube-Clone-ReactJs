import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import "./SidebarRow.css";

function Sidebar() {
  const listItems = [
    { title: 'Home', icon: HomeIcon, selected: false },
    { title: 'Trending', icon: WhatshotIcon, selected: true },
    { title: 'Subscription', icon: SubscriptionsIcon, selected: false },
    { title: 'Library', icon: VideoLibraryIcon, selected: false },
    { title: 'History', icon: HistoryIcon, selected: false },
    { title: 'Your Videosicon', icon: OndemandVideoIcon, selected: false },
    { title: 'Watch Latericon', icon: SettingsIcon, selected: false },
    { title: 'Liked videsicon', icon: ThumbUpAltOutlinedIcon, selected: false },
  ]
  const [leftPanelList, setLeftPanelList] = useState(listItems)

  const navigatePage = (val) => {
    debugger;
    console.log(val)
    // setselectedRow(true)
  }


  return (
    <div className="sidebar">

      {   leftPanelList.map((row, index) => (
        <div>
          <SidebarRow key={index} selected={row.selected} Icon={row.icon} title={row.title} />
        </div>
      ))
      }
      {/* <ul>
      <SidebarRow selected Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={WhatshotIcon} title="Trending" />
      <SidebarRow Icon={SubscriptionsIcon} title="Subscription" />

      <hr />
      <SidebarRow Icon={VideoLibraryIcon} title="Library" />
      <SidebarRow Icon={HistoryIcon} title="History" />
      <SidebarRow Icon={OndemandVideoIcon} title="Your Videos" />
      <SidebarRow Icon={SettingsIcon} title="Watch Later" />
      <SidebarRow Icon={ThumbUpAltOutlinedIcon} title="Liked vides" /> 
      </ul> */}

      {/* <Link to={'/'}> */}
      <div onClick={(e) => navigatePage(e)}>
        <SidebarRow selected="true" Icon={HomeIcon} title="Home" />
      </div>
      {/* </Link> */}
      <div onClick={(e) => navigatePage(e?.target?.innerText)}>
        <SidebarRow Icon={WhatshotIcon} title="Trending" />
      </div>
      <Link to={'/subscription'}>
        <SidebarRow Icon={SubscriptionsIcon} title="Subscription" />
      </Link>
      <hr />
      <SidebarRow Icon={VideoLibraryIcon} title="Library" />
      <SidebarRow Icon={HistoryIcon} title="History" />
      <SidebarRow Icon={OndemandVideoIcon} title="Your Videos" />
      <SidebarRow Icon={SettingsIcon} title="Watch Later" />
      <SidebarRow Icon={ThumbUpAltOutlinedIcon} title="Liked vides" />
      <hr />

    </div >
  );
}

export default Sidebar;
