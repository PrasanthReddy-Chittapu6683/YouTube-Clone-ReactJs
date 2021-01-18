import React, { useEffect, useState } from 'react'
import youtube from './APIS/youtube'
import './VideoDetails.css'
import { Avatar, Button } from '@material-ui/core';
import Moment from 'react-moment';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ShareIcon from '@material-ui/icons/Share';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function VideoDetails({ videoID, cid }) {
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

    // Video Details: https://youtube.googleapis.com/youtube/v3/videos?
    //part=snippet%2CcontentDetails%2Cstatistics&id=WZUH2QTB-yw&key=[YOUR_API_KEY] HTTP/1.1
    const [videoDetails, setVideoDetails] = useState([])
    const [channelDetails, setChannelDetails] = useState([])
    const [videoComments, setVideoComments] = useState([])
    const getChannelBannerDetails = async () => {
        const response = await youtube.get('/channels', {
            params: {
                part: "snippet,brandingSettings,contentDetails,statistics",
                id: cid,
            }
        })
        setChannelDetails(response?.data?.items)
    }
    const getVideoDetails = async () => {
        const response = await youtube.get('/videos', {
            params: {
                part: "snippet,contentDetails,statistics,id",
                id: videoID
            }
        })
        setVideoDetails(response?.data?.items[0])
    }
    // https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies%2C%20id&videoId=WZUH2QTB-yw&key=[YOUR_API_KEY] HTTP/1.1


    const getVideoCommentDetails = async () => {
        const response = await youtube.get('/commentThreads', {
            params: {
                part: "snippet,replies,id",
                videoId: videoID,
                maxResults: 100,
                order: 'relevance'
            }
        })
        setVideoComments(response?.data?.items)
    }
    useEffect(() => {
        if (videoID) {
            getVideoDetails();
            getChannelBannerDetails();
            getVideoCommentDetails();
        }
        return () => {

        }
    }, [videoID])
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "  ..." : str;
    }

    return (
        <div className="VideoDetails">
            <div className="VideoDetails__titles">

                <h2>
                    {videoDetails?.snippet?.title}
                </h2>
                <div className="videoDetails__counts">
                    <div className="videoDetails__count1">
                        <span>

                            {videoDetails?.statistics?.viewCount ?
                                <>{nFormatter(videoDetails?.statistics?.viewCount, 4)} views •</>
                                : <></>
                            }
                            <Moment format="MMM D, YYYY" className="ChannelVideos__timestamp" >{videoDetails?.snippet?.publishedAt}</Moment>
                        </span>
                    </div>
                    <div className="videoDetails__count2">
                        <div className="videoDetails__count2First">

                            <ThumbUpIcon />
                            <span>
                                {videoDetails?.statistics?.likeCount ?
                                    <>{nFormatter(videoDetails?.statistics?.likeCount, 2)} </>
                                    : <></>
                                    //WPS: 9591026279
                                }
                            </span>
                            <ThumbDownIcon />
                            <span>

                                {videoDetails?.statistics?.dislikeCount ?
                                    <>{nFormatter(videoDetails?.statistics?.dislikeCount, 2)} </>
                                    : <></>//944334228
                                }
                            </span>
                        </div>
                        <div className="videoDetails__count2Second">

                            <ShareIcon />
                            <span>Share</span>
                            <SaveAltIcon />
                            <span>Save</span>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="videoDetails__channelInfo">
                    <Avatar
                        className="Channel__Logo"
                        alt={channelDetails[0]?.snippet?.title}
                        src={channelDetails[0]?.snippet?.thumbnails?.maxres?.url ||
                            channelDetails[0]?.snippet?.thumbnails?.high?.url ||
                            channelDetails[0]?.snippet?.thumbnails?.standard?.url ||
                            channelDetails[0]?.snippet?.thumbnails?.medium?.url ||
                            channelDetails[0]?.snippet?.thumbnails?.default?.url}
                    />
                    <div className="channel__title">
                        <span>
                            {channelDetails[0]?.brandingSettings?.channel?.title}
                            <VerifiedUserIcon className="Channel__Verified__icon" />
                        </span>

                        <p>
                            {nFormatter(channelDetails[0]?.statistics?.subscriberCount, 2)} subscribers

                                    {/* {nFormatter(channelDetails[0]?.statistics?.videoCount, 2)} videos */}
                        </p>

                    </div>

                    {/* <span className="videoDetails__channelTitle">{channelDetails[0]?.snippet?.title}
                        <VerifiedUserIcon className="Channel__Verified__icon" /> 
                    </span>*/}
                </div>
                <div className="description">
                    <span className="Video__description">

                        {truncate(videoDetails?.snippet?.description, 90)}
                        <p>
                            SHOW MORE
                    </p>
                    </span>

                </div>
            </div>
            <div className="videoDetails__comments">
                <h2>
                    123,234 Comments SORT BY
                </h2>
                <div className="comments">
                    <div className="add__comments">

                        {/* <Avatar
                            alt="PrasanthCV"
                            src="https://yt3.ggpht.com/yti/ANoDKi5_zkpjKazn11UBXBK6IXoknM8WOjLi2bUiO8qwWQ=s88-c-k-c0x00ffffff-no-rj-mo"
                        />
                        <TextField
                            width="150"
                            id="standard-textarea"
                            label="   Add a public comment ..."
                            placeholder="Add a public comment ..."
                            multiline
                        /> */}
                        <Grid container spacing={2} alignItems="flex-end">
                            <Grid item>
                                <Avatar
                                    alt="PrasanthCV"
                                    src="https://yt3.ggpht.com/yti/ANoDKi5_zkpjKazn11UBXBK6IXoknM8WOjLi2bUiO8qwWQ=s88-c-k-c0x00ffffff-no-rj-mo"
                                />
                            </Grid>
                            <Grid item className="add__comments_text">
                                <TextField id="input-with-icon-grid" label="Add public Comments" />
                            </Grid>
                        </Grid>


                    </div>
                    <div className='Video__CommentsList'>
                        {videoComments.map((comments, index) => (
                            <div className="Videos__commentDetails">
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar
                                            alt="PrasanthCV"
                                            src={comments.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
                                        />
                                    </Grid>
                                    <Grid item className="add__comments_text">
                                        <p className="comments_users">{comments.snippet?.topLevelComment?.snippet?.authorDisplayName}</p>
                                        <small className="Video__comments_users_description">{comments.snippet?.topLevelComment?.snippet?.textDisplay}</small>
                                        <div className="comments_users_likes">
                                            <ThumbUpIcon className="comments_thumb" />
                                            <span>
                                                {comments.snippet?.topLevelComment?.snippet?.likeCount ?
                                                    <>{nFormatter(comments.snippet?.topLevelComment?.snippet?.likeCount, 2)} </>
                                                    : <></>

                                                }
                                            </span>
                                            <ThumbDownIcon className="comments_thumb" />
                                            <span>
                                                {comments.snippet?.topLevelComment?.snippet?.dislikeCount ?
                                                    <>{nFormatter(comments.snippet?.topLevelComment?.snippet?.dislikeCount, 2)} </>
                                                    : <></>
                                                }
                                            </span>

                                        </div>
                                        <div className='comments_replies'>
                                            {comments.snippet?.totalReplyCount > 0 ?
                                                <>
                                                    <ArrowDropDownIcon className="comments_viewRepliesIcon" />
                                                    <span>
                                                        View {comments.snippet?.totalReplyCount ?
                                                            <>{nFormatter(comments.snippet?.totalReplyCount, 2)} </>
                                                            : <></>
                                                        } Replies
                                                    </span>
                                                </> :
                                                <></>
                                            }
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>

                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default VideoDetails
