import { Avatar } from "@material-ui/core";
import React from "react";
import "./VideoRow.css";

function VideoRow({
  views,
  subs,
  timestamp,
  channel,
  description,
  title,
  image,
  channelImage,
}) {
  return (
    <div className="videoRow">
      <img className="videoRow__image" src={image} alt="" />

      <div className="videoRow__text">
        <h3>{title}</h3>
        <p className="videoRow__headline">
        {views} Views. {timestamp} 
          <p className="videoRow__channelInfo">
            <Avatar
              className="videoRowChannel__logo"
              alt={channel}
              src={channelImage}
            />
            {channel} .
          </p>
          <span className="videoRow__subs">
            <span className="videoRow__subsNumber"> {subs} </span>
            Subscribers
          </span>
         
        </p>
        <p className="videoRow__description"> {description}</p>
      </div>
    </div>
  );
}

export default VideoRow;
