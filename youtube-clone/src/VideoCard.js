import React from "react";
import "./VideoCard.css";
import Avatar from "@material-ui/core/Avatar";
import Moment from 'react-moment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function VideoCard({ thumbnails,
  title,
  channel,
  views,
  timestamp,
  channelImage,
  channelId,
  videoDetails, videoType }) {
  const nFormatter = (num, digits) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  return (
    <div className="videocard">
      <Link to={`/play/${videoType}/${videoDetails?.id}/${channelId}`} >
      <div className="video__Panel">
      
        <img className="videcard__thumbnail" src={thumbnails} alt="" />
          <div className="videocard__info">
            <Avatar
              className="videocard-card__avatar"
              alt={channel}
              src={channelImage}
            />
            <div className="videocard__text">
            <div className="videocard__text__align">
              <h4>{title} </h4>
               <MoreVertIcon/>
            </div>
            <p className="videocard__channelDetails">
                {channel}
                {videoDetails?.contentDetails?.licensedContent && <CheckCircleIcon className="videocard__channelVerified" />}
              </p>
              <p >
                {
                  videoDetails?.statistics?.viewCount ?
                    <> {nFormatter(videoDetails?.statistics?.viewCount, 2)} views •  </>
                    :
                    <></>
                }

                <Moment className="videocard__timestamp" fromNow>{videoDetails?.snippet?.publishedAt}</Moment>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;
