import React from 'react'
import './ChannelVideos.css'
import Avatar from "@material-ui/core/Avatar";
import Moment from 'react-moment';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

function ChannelVideos({ thumbnails,
    title,
    channel,
    views,
    timestamp,
    channelImage,
    channelId,
    videoDetails }) {
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
        <div className="ChannelVideos">

            <img className="ChannelVideos__thumbnail" src={thumbnails} alt="" />
            <div className="ChannelVideos__info">
                <Avatar
                    className="ChannelVideos-card__avatar"
                    alt={channel}
                    src={channelImage}
                />
                <div className="ChannelVideos__text">
                    <h4>{title}</h4>
                    <p className="ChannelVideos__channelDetails">
                        {channel}
                        {videoDetails?.contentDetails?.licensedContent && <CheckCircleIcon className="ChannelVideos__channelVerified" />}
                    </p>
                    <p >
                        {nFormatter(videoDetails?.statistics?.viewCount, 2)} views •
            <Moment className="ChannelVideos__timestamp" fromNow>{videoDetails?.snippet?.publishedAt}</Moment>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ChannelVideos
