import React, { useEffect, useState } from 'react'
import './ChannelMenuTabs.css'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ChannelVideos from './ChannelVideos';
import youtube from './APIS/youtube';
import VideoCard from './VideoCard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));



function ChannelMenuTabs({ cID }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [channel_Videos, setChannel_Videos] = useState([]);
    const [channel_Playlist_Videos, setChannel_Playlist_Videos] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        getCDetails();
        getCDPlayListVideos();
        return () => {

        }
    }, [])
    const getCDetails = async () => {
        //https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&
        //channelId=UC3cEGKhg3OERn-ihVsJcb7A&maxResults=25&key=[YOUR_API_KEY] HTTP/1.1

        const response = await youtube.get('/search', {
            params: {
                part: "snippet,id",
                maxResults: 50,
                channelId: cID,
                order: "viewCount"

            }
        })

        setChannel_Videos(response?.data?.items)
    }
    const getCDPlayListVideos = async () => {
        const response = await youtube.get('/playlists', {
            params: {
                part: "snippet,contentDetails,id,player,status,localizations",
                maxResults: 100,
                channelId: cID,
            }
        })
        setChannel_Playlist_Videos(response?.data?.items)
    }
    const getChannelVideos = () => {
        //alert(cID)
        //https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSJbGtTlrDami-tDGPUV9-w&maxResults=50&order=viewCount&key=[YOUR_API_KEY] HTTP/1.1
        getCDetails();
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Home" {...a11yProps(0)} />
                    <Tab label="Videos" {...a11yProps(1)} />
                    <Tab label="Playlist" {...a11yProps(2)} />
                    <Tab label="Community" {...a11yProps(3)} />
                    <Tab label="Channels" {...a11yProps(4)} />
                    <Tab label="About" {...a11yProps(5)} />
                    <Tab label="Find" {...a11yProps(6)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <h3 className="channel__viewlabel"> Popular videos </h3>
                <div className="Channel__Menu_Home">
                    {
                        (channel_Videos && channel_Videos.length > 0) ?
                            <>
                                {channel_Videos.map((video, index) => (

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
                                    />
                                ))}

                            </> : <></>
                    }
                </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                <h3 className="channel__viewlabel"> Popular videos </h3>
                <div className="Channel__Menu_Home">
                    {
                        (channel_Playlist_Videos && channel_Playlist_Videos.length > 0) ?
                            <>
                                {channel_Playlist_Videos.map((video, index) => (
                                    <div className="playlist">
                                        <span>
                                            Playlist
                                        </span>
                                        <VideoCard
                                            key={index}
                                            channelId={video?.snippet?.channelId}
                                            thumbnails={video?.snippet?.thumbnails?.maxres?.url ||
                                                video?.snippet?.thumbnails?.standard?.url ||
                                                video?.snippet?.thumbnails?.medium?.url}
                                            title={video?.snippet?.title}
                                            channel={video?.snippet?.channelTitle}
                                            views="5"
                                            timestamp={video?.publishTime}
                                            channelImage={video?.snippet?.thumbnails?.medium?.url}
                                            videoDetails={video}
                                        />

                                    </div>

                                ))}

                            </> : <></>
                    }
                </div>

            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </div >
    );
}

export default ChannelMenuTabs
