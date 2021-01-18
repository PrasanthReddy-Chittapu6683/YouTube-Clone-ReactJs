import React, { useEffect, useState } from 'react'
import './PlayVideos.css'
import { useParams } from 'react-router-dom'
import youtube from './APIS/youtube';
import ChannelVideos from './ChannelVideos';
import VideoDetails from './VideoDetails';

// PL_euSNU_eLbdg0gKbR8zmVJb4xLgHR7BX
function PlayVideos() {
    const { playID, type, cID } = useParams();
    const [RelatedVideos, setRelatedVideos] = useState([])
    const [playListVideos, setPlayListVideos] = useState([])
    const getRelatedVideos = async (playerID) => {
        const response = await youtube.get('/search', {
            params: {
                part: "snippet,id",
                maxResults: 50,
                channelId: cID,
                order: "viewCount",
                relatedToVideoId: playerID,
                type: "video"

            }
        })

        setRelatedVideos(response?.data?.items)
    }
    const getPlayListVideos = async () => {
        const response = await youtube.get('/playlistItems', {
            params: {
                part: "snippet,contentDetails",
                maxResults: 50,
                channelId: cID,
                order: "viewCount",
                playlistId: playID,
                type: "video"
            }
        })

        setPlayListVideos(response?.data?.items)
        if (response?.data?.items.length > 0) {
            getRelatedVideos(response?.data?.items[0].snippet?.resourceId?.videoId);
        }
    }
    useEffect(() => {
        if (type === "normal") {
            getRelatedVideos(playID);
        } else {
            getPlayListVideos();

        }
        return () => {

        }
    }, [])
    // Display Video Details: https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CtopicDetails%2CcontentDetails%2Cstatistics%2Cid&id=BwuLxPH8IDs&key=[YOUR_API_KEY] HTTP/1.1

    // Get Related Videos : https://youtube.googleapis.com/youtube/v3/search?part=snippet%2Cid&channelId=UC3cEGKhg3OERn-ihVsJcb7A&maxResults=25&relatedToVideoId=Sol2uLolmUM&type=video&key=[YOUR_API_KEY] HTTP/1.1
    //Get playlist Videos : https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=PLOa5YIicjJ-XCGXwnEmMmpHHCn11gUgvL&key=[YOUR_API_KEY] HTTP/1.1

    const baseURL = type === "normal" ? "//www.youtube.com/embed/" : "http://www.youtube.com/embed/videoseries?list=";
    return (
        <div className="playvideos">
            <div className="playvideos__page">

                <div className="playvideos__Details">

                    <iframe width="640" height="360"
                        src={`${baseURL}${playID}`}
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                    encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                    <div>
                        <VideoDetails videoID={playID} cid={cID} />
                    </div>
                </div>
                <div className="playvideos__relatedvideos">
                    { // 
                        (RelatedVideos && RelatedVideos.length > 0) ?
                            <>
                                {RelatedVideos.map((video, index) => (

                                    <ChannelVideos
                                        key={index}
                                        channelId={video?.snippet?.channelId}
                                        thumbnails={video?.snippet?.thumbnails?.maxres?.url ||
                                            video?.snippet?.thumbnails?.standard?.url ||
                                            video?.snippet?.thumbnails?.medium?.url}
                                        title={video?.snippet?.title}
                                        channel={video?.snippet?.channelTitle}
                                        views=""
                                        timestamp={video?.publishTime}
                                        channelImage={video?.snippet?.thumbnails?.medium?.url}
                                        videoDetails={video}
                                        videoType='normal'
                                    />
                                ))}

                            </> : <></>
                    }

                </div>
            </div>

        </div>
    )
}

export default PlayVideos
