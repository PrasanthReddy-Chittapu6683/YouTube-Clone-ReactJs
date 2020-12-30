import React from 'react'
import './Subscription.css'
import TuneIcon from "@material-ui/icons/Tune";
import ChannelRow from "./ChannelRow";
import VideoRow from "./VideoRow";

function Subscription() {
    return (
        <div className="searchPage">
      <div className="searchPage__filter">
        <TuneIcon />
        <h2>FILTER</h2>
      </div>
      <hr />

      <ChannelRow
        image="https://yt3.ggpht.com/ytc/AAUvwnj5vbwTemGpOuabZnfkl_tDzb_Fldf_CSMW2cg3=s176-c-k-c0x00ffffff-no-rj-mo"
        channel="Codevolution"
        verified
        subs="238K"
        noOfVideos={382}
        description="Tutorials on the latest tech in web development!"
      ></ChannelRow>
      <hr />
      <h4>Latest from Codevolution</h4>
      <VideoRow
        views="1.4"
        channel="Codevolution"
        subs="659K"
        timestamp="1 hour ago"
        description="Tutorials on the latest tech in web development!"
        title="ReactJS Tutorial for Beginners"
        channelImage="https://yt3.ggpht.com/ytc/AAUvwnj5vbwTemGpOuabZnfkl_tDzb_Fldf_CSMW2cg3=s176-c-k-c0x00ffffff-no-rj-mo"
        image="https://i.ytimg.com/vi/QFaFIcGhPoM/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBYZxZ2Jb0KTRgbzqGAQ-SmuHjOLg"
      />

      <VideoRow
        views="1.4"
        channel="Codevolution"
        subs="659K"
        timestamp="1 hour ago"
        description="Tutorials on the latest tech in web development!"
        title="ReactJS Tutorial for Beginners"
        channelImage="https://yt3.ggpht.com/ytc/AAUvwnj5vbwTemGpOuabZnfkl_tDzb_Fldf_CSMW2cg3=s176-c-k-c0x00ffffff-no-rj-mo"
        image="https://i.ytimg.com/vi/OcA4wWJIMTY/hq720.jpg?sqp=-oaymwEZCOgCEMoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLBvP7ouh8OPOwDQsWdsGSgymhT06Q"
      />

      <VideoRow
        views="1.4"
        channel="Codevolution"
        subs="59K"
        timestamp="12 hour ago"
        description="Tutorials on the latest tech in web development!"
        title="Angular Tutorial For Beginners "
        channelImage="https://yt3.ggpht.com/ytc/AAUvwnj5vbwTemGpOuabZnfkl_tDzb_Fldf_CSMW2cg3=s176-c-k-c0x00ffffff-no-rj-mo"
        image="https://i.ytimg.com/vi/0eWrpsCLMJQ/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBw_7ukFPt9_qVXgRxHMOeDjbDM9w"
      />
    </div>
  );
}

export default Subscription
