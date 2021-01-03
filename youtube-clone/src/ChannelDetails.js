import { Avatar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import youtube from './APIS/youtube';
import './ChannelDetails.css'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ChannelMenuTabs from './ChannelMenuTabs';
function ChannelDetails() {
    const { channelID } = useParams();
    //https://youtube.googleapis.com/youtube/v3/search? part = snippet & maxResults=25 & q=Codevolution & key=[YOUR_API_KEY]
    const [channelDetails, setChannelDetails] = useState({
        channelDetails: []
    })
    const [channelBannerDetails, setChannelBannerDetails] = useState([])
    //https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails%2Ctargeting%2C
    //localizations & channelId=UC06CSMqAhpBvhSRwHUBgyPw & key=[YOUR_API_KEY] HTTP / 1.1
    const loadChannelDetails = async () => {

        const response = await youtube.get('/channelSections', {
            params: {
                part: "snippet,contentDetails,targeting,localizations",
                maxResults: 50,
                channelId: channelID

            }
        })

        setChannelDetails({ channelDetails: response?.data?.items })


    }
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
    const getChannelBannerDetails = async (CID) => {
        const response = await youtube.get('/channels', {
            params: {
                part: "snippet,brandingSettings,contentDetails,statistics",
                id: CID,
            }
        })
        setChannelBannerDetails(response?.data?.items)
    }
    useEffect(() => {
        loadChannelDetails();
        getChannelBannerDetails(channelID);
        return () => {

        }
    }, [])


    return (
        <div className="ChannelDetails">
            {channelID} - {channelDetails | JSON}
            { (channelBannerDetails && channelBannerDetails.length > 0) ?
                <>
                    <img className="Channel__BannerImage" src={channelBannerDetails[0]?.brandingSettings?.image?.bannerExternalUrl} alt="" />
                    <div className="Channel__LogoSection">
                        <div className="Channel__LogoTitle">

                            <Avatar
                                className="Channel__Logo"
                                alt={channelBannerDetails[0]?.snippet?.title}
                                src={channelBannerDetails[0]?.snippet?.thumbnails?.maxres?.url ||
                                    channelBannerDetails[0]?.snippet?.thumbnails?.high?.url ||
                                    channelBannerDetails[0]?.snippet?.thumbnails?.standard?.url ||
                                    channelBannerDetails[0]?.snippet?.thumbnails?.medium?.url ||
                                    channelBannerDetails[0]?.snippet?.thumbnails?.default?.url}
                            />
                            <div className="channel__title">
                                <h2>
                                    {channelBannerDetails[0]?.brandingSettings?.channel?.title}
                                    <VerifiedUserIcon className="Channel__Verified__icon" />
                                </h2>

                                <p>
                                    {nFormatter(channelBannerDetails[0]?.statistics?.subscriberCount, 2)} subscribers
                                </p>

                            </div>
                            <div className="ChannelSubscribe__button">
                                <Button variant="contained" color="primary"> Subscribe </Button>
                                <NotificationsActiveIcon className="channel__subscription__icon" />
                            </div>
                        </div>


                    </div>
                    <div className="Channel__Tabs">

                        <ChannelMenuTabs cID={channelID} />
                    </div>
                </>
                : <>
                    <h2>No channel details available</h2>
                </>}
        </div>
    )
}

export default ChannelDetails
