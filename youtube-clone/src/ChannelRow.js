import React from 'react'
import './ChannelRow.css'
import Avatar from "@material-ui/core/Avatar";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import Button from '@material-ui/core/Button';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

function ChannelRow({ image, channel, verified, subs, noOfVideos, description }) {
    return (
        <div className="channelRow">
            <Avatar
                className="channelRow__logo"
                alt={channel}
                src={image}
            />
            <div className="channelRow__text">
                <h4>{channel} {verified && <VerifiedUserIcon className="channelRow__text__icon"/>}</h4>
                <p>{subs} subscribers - {noOfVideos} videos</p>
                <p>{description}</p>
            </div>
            <div className="channleRow__subscription">
                <Button variant="contained" color="primary">
                    Subscribe
                </Button>
                <NotificationsActiveIcon className="channleRow__subscription__icon" />
            </div>
        </div>
    )
}

export default ChannelRow
