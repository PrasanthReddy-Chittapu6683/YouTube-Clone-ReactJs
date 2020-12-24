import React from 'react'
import "./SearchPage.css";
import TuneIcon from '@material-ui/icons/Tune';
import ChannelRow from './ChannelRow';
import VideoRow from './VideoRow';
function SearchPage() {
    return (
        <div className="searchPage">
            <div className="searchPage__filter">
                <TuneIcon />
                <h2>Filters</h2>
            </div>
            <hr />

            <ChannelRow
                image="https://yt3.ggpht.com/ytc/AAUvwnj5vbwTemGpOuabZnfkl_tDzb_Fldf_CSMW2cg3=s176-c-k-c0x00ffffff-no-rj-mo"
                channel="Codevolution"
                verified
                subs="238K"
                noOfVideos={382}
                description="Tutorials on the latest tech in web development!"
            ></ChannelRow>
            <hr />
            <h4>Latest from Codevolution</h4>
            <VideoRow
                views="1.4"
                channel="Codevolution"
                subs="659K"
                timestamp="1 hour ago"
                description="Tutorials on the latest tech in web development!"
                title="ReactJS Tutorial for Beginners"
                image="https://i.ytimg.com/vi/QFaFIcGhPoM/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBYZxZ2Jb0KTRgbzqGAQ-SmuHjOLg"
            />


        </div>
    )
}

export default SearchPage

