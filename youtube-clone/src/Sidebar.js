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
import { Link, useHistory } from "react-router-dom";
import "./SidebarRow.css";

function Sidebar() {
  let listItems = [
    { title: 'Home', icon: HomeIcon, selected: true, divider: false },
    { title: 'Trending', icon: WhatshotIcon, selected: false, divider: false },
    { title: 'Subscription', icon: SubscriptionsIcon, selected: false, divider: true },
    { title: 'Library', icon: VideoLibraryIcon, selected: false, divider: false },
    { title: 'History', icon: HistoryIcon, selected: false, divider: false },
    { title: 'Your Videosicon', icon: OndemandVideoIcon, selected: false, divider: false },
    { title: 'Watch Latericon', icon: SettingsIcon, selected: false, divider: false },
    { title: 'Liked videsicon', icon: ThumbUpAltOutlinedIcon, selected: false, divider: true },
  ]
  const [leftPanelList, setLeftPanelList] = useState(listItems)
  const history = useHistory();
  const navigatePage = (val) => {

    let listVal = listItems;
    for (var value of listVal) {
      value.selected = false;
      if (val === value.title) {
        value.selected = true;
      } else if (val === value.title) {
        value.selected = true;
      }
    }
    setLeftPanelList(listVal);
    if (val === 'Home') {
      history.push('/');
    } else if (val === 'Subscription') {
      history.push('/subscription')
    }
  }


  return (
    <div className="sidebar">

      {
        leftPanelList.map((row, index) => (
          <div onClick={() => navigatePage(row.title)}>
            <SidebarRow key={index} selected={row.selected} Icon={row.icon} title={row.title} />
            {
              row.divider ?
                <hr /> :
                <></>
            }
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
      {/* <div onClick={(e) => navigatePage(e)}>
        <SidebarRow selected="true" Icon={HomeIcon} title="Home" />
      </div>
     
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
      <SidebarRow Icon={ThumbUpAltOutlinedIcon} title="Liked vides" /> */}
      

    </div >
  );
}

export default Sidebar;
