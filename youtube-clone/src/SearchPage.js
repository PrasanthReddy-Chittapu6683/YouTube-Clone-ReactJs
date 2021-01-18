import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import TuneIcon from "@material-ui/icons/Tune";
import ChannelRow from "./ChannelRow";
// import VideoRow from "./VideoRow";
import { useParams } from "react-router";
import youtube from "./APIS/youtube";
import VideoCard from "./VideoCard";

function SearchPage() {
  const { searchTerm } = useParams();
  //https://youtube.googleapis.com/youtube/v3/search? part = snippet & maxResults=25 & q=Codevolution & key=[YOUR_API_KEY]
  const [getVidoes, setGetVidoes] = useState({
    videos: [],
    selectedVideos: null
  })
  //https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=Codevolution&key=[YOUR_API_KEY] HTTP/1.1

  const loadVidoes = async () => {

    const response = await youtube.get('/search', {
      params: {
        part: "snippet",
        maxResults: 50,
        q: searchTerm,
        type: "video"

      }
    })
    // q: 'Codevolution' 
    setGetVidoes({ videos: response?.data?.items })

    //console.log(getVidoes)
  }
  useEffect(() => {
    loadVidoes();
    return () => {

    }
  }, [searchTerm])
  //https://youtube.googleapis.com/youtube/v3/subscriptions?part=id%2Csnippet%2CcontentDetails%2CsubscriberSnippet&mine=true&key=[YOUR_API_KEY] HTTP/1.1

  return (
    <div className="searchPage">
      <div className="searchPage__filter">
        <TuneIcon />
        <h2>FILTER </h2>
      </div>
      {
        getVidoes.videos.length > 0 ?
          <ChannelRow
            image={
              getVidoes.videos[0].snippet?.thumbnails?.maxres?.url ||
              getVidoes.videos[0]?.snippet?.thumbnails?.high?.url ||
              getVidoes.videos[0]?.snippet?.thumbnails?.standard?.url ||
              getVidoes.videos[0]?.snippet?.thumbnails?.medium?.url ||
              getVidoes.videos[0]?.snippet?.thumbnails?.default?.url
            }
            channel={getVidoes.videos[0]?.snippet?.channelTitle}
            channelDetails={getVidoes.videos[0]}
            verified
            subs="238K"
            noOfVideos={382}
            description={getVidoes.videos[0]?.snippet?.description}
          ></ChannelRow>
          : <></>
      }

      <hr />
      <h3> Latest from {searchTerm}</h3>
      <hr />
      <div className="searchPage__videos">

        {
          getVidoes.videos.map((video, index) => (
            <VideoCard
              key={index}
              channelId={video?.snippet?.channelId}
              thumbnails={video?.snippet?.thumbnails?.maxres?.url ||
                video?.snippet?.thumbnails?.high?.url ||
                video?.snippet?.thumbnails?.standard?.url ||
                video?.snippet?.thumbnails?.medium?.url ||
                video?.snippet?.thumbnails?.default?.url
              }

              title={video?.snippet?.title}
              channel={video?.snippet?.channelTitle}
              views=""
              timestamp={video?.publishTime}
              channelImage={video?.snippet?.thumbnails?.medium?.url}
              videoDetails={video}
              videoType='normal'
            />

          ))
        }
      </div>

    </div>
  );
}

export default SearchPage;
