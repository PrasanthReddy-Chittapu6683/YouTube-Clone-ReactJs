import React from 'react'
import './ChannelRow.css'
import Avatar from "@material-ui/core/Avatar";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { Link } from 'react-router-dom';

function ChannelRow({ image, channel, verified, subs, noOfVideos, description, channelDetails }) {

    // const getChannelDetails = (val) => {
    //     alert(val);
    //     // Get Channel Details: https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails%2Ctargeting%2Clocalizations&channelId=UC06CSMqAhpBvhSRwHUBgyPw&key=[YOUR_API_KEY] HTTP/1.1
    //     // Get Playlist Details: https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLEyBdJ5y5i39QXi0X8TqWhXJDGvS9x4o6&key=[YOUR_API_KEY] HTTP/1.1

    // }
    return (

        <div className="channelRow" >
            {channelDetails?.id.channelId ?
                <Link to={`/channel/${channelDetails?.id.channelId}`}>
                    <Avatar
                        className="channelRow__logo"
                        alt={channel}
                        src={image}
                    />
                </Link>
                :
                <Avatar
                    className="channelRow__logo"
                    alt={channel}
                    src={image}
                />
            }

            <div className="channelRow__text">
                <h4>{channel} {verified && <VerifiedUserIcon className="channelRow__text__icon" />}</h4>
                <p>{subs} subscribers - {noOfVideos} videos</p>
                <p>{description}</p>
            </div>
            <div className="channleRow__subscription">
                <Button variant="contained" color="primary">
                    Subscribe
                </Button>
                <NotificationsActiveIcon className="channleRow__subscription__icon" />
            </div>
        </div >
    )
}

export default ChannelRow
