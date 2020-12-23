import React from "react";
import "./VideoCard.css";
import Avatar from "@material-ui/core/Avatar";

function VideoCard({ image, title, channel, views, timestamp, channelImage }) {
  return (
    <div className="videocard">
      
      <img className="videcard__thumbnail" src={image} alt="" />
      <div className="videocard__info">
        <Avatar
          className="videocard-card__avatar"
          alt={channel}
          src={channelImage}
        />
        <div className="videocard__text">
          <h4>{title}</h4>
          <p>{channel}</p>
          <p>
            {views} . {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
