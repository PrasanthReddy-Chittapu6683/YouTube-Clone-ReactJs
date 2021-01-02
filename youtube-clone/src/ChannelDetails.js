import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import youtube from './APIS/youtube';
import './ChannelDetails.css'

function ChannelDetails() {
    const { channelID } = useParams();
    //https://youtube.googleapis.com/youtube/v3/search? part = snippet & maxResults=25 & q=Codevolution & key=[YOUR_API_KEY]
    const [channelDetails, setChannelDetails] = useState({
        channelDetails: []
    })
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
    useEffect(() => {
        loadChannelDetails();
        return () => {

        }
    }, [])


    return (
        <div>
            {channelID} - {channelDetails | JSON}
        </div>
    )
}

export default ChannelDetails
