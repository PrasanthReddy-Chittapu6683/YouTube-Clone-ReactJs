import React, { useEffect, useState } from 'react'
import './Subscription.css'
import TuneIcon from "@material-ui/icons/Tune";
import ChannelRow from "./ChannelRow";
import VideoRow from "./VideoRow";
import youtube from './APIS/youtube';
import { Avatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import VideoCard from './VideoCard';
import ChannelVideos from './ChannelVideos';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

function Subscription() {

  //https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&
  //mine=true&key=[YOUR_API_KEY]  

  const subList = [];
  const [subscriptionsList, setSubscriptionsList] = useState(subList);
  const [channel_Videos, setChannel_Videos] = useState([]);
  const [channelBannerDetails, setChannelBannerDetails] = useState([])
  const getSubscriptionsList = async () => {
    // const response = await youtube.get('/subscriptions', {
    //   params: {
    //     part: "snippet,contentDetails",
    //     maxResults: 50,
    //     mine:true,

    //   }
    // })
    getCDetails(subscriptionsLst[0].snippet.resourceId.channelId)
    setSubscriptionsList(subscriptionsLst)
  }
  useEffect(() => {
    getSubscriptionsList();
    getChannelBannerDetails(subscriptionsLst[0].snippet.resourceId.channelId);
    return () => {

    }
  }, [])
  const getChannelVideos = (cID) => {
    //alert(cID)
    //https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSJbGtTlrDami-tDGPUV9-w&maxResults=50&order=viewCount&key=[YOUR_API_KEY] HTTP/1.1
    getCDetails(cID);
    getChannelBannerDetails(cID);
  }

  const getCDetails = async (cID) => {
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

  //https://youtube.googleapis.com/youtube/v3/channels?
  // part=snippet%2CbrandingSettings%2CcontentDetails%2Cstatistics&id=UCSJbGtTlrDami-tDGPUV9-w&key=[YOUR_API_KEY] HTTP/1.1
  const getChannelBannerDetails = async (CID) => {
    const response = await youtube.get('/channels', {
      params: {
        part: "snippet,brandingSettings,contentDetails,statistics",
        id: CID,
      }
    })
    setChannelBannerDetails(response?.data?.items)
  }


  return (
    <div className="subscription">
      <div className="subscription__filter">
        <TuneIcon />
        <h2>FILTER</h2>
      </div>
      <hr />

      <div className='subscriptions__list'>
        <div className='subscription__avatarlist'>
          {
            subscriptionsList.map((avt, index) => (
              <div className="subscription__dtls" onClick={() => getChannelVideos(avt?.snippet?.resourceId?.channelId)}>
                {/* <Link to={`/channel/${avt?.snippet?.resourceId?.channelId}`}> */}
                <Avatar
                  className="subscription__subsLogo"
                  alt={avt?.snippet?.title}
                  src={avt?.snippet?.thumbnails?.maxres?.url ||
                    avt?.snippet?.thumbnails?.high?.url ||
                    avt?.snippet?.thumbnails?.standard?.url ||
                    avt?.snippet?.thumbnails?.medium?.url ||
                    avt?.snippet?.thumbnails?.default?.url}
                />
                <span>{avt?.snippet?.title}</span>
                {/* </Link> */}
              </div>
            ))
          }
        </div>
        <div className="subscription__details">
          <div className="channel__bannerDetails">
            {
              (channelBannerDetails && channelBannerDetails.length > 0) ?
                <>
                  <div className="channel__logoDetails">

                    <Avatar
                      className="subscription__subsLogo"
                      alt={channelBannerDetails[0]?.snippet?.title}
                      src={channelBannerDetails[0]?.snippet?.thumbnails?.maxres?.url ||
                        channelBannerDetails[0]?.snippet?.thumbnails?.high?.url ||
                        channelBannerDetails[0]?.snippet?.thumbnails?.standard?.url ||
                        channelBannerDetails[0]?.snippet?.thumbnails?.medium?.url ||
                        channelBannerDetails[0]?.snippet?.thumbnails?.default?.url}
                    />
                    <h2>{channelBannerDetails[0]?.brandingSettings?.channel?.title}</h2>
                    <VerifiedUserIcon className="channelRow__Verified__icon " />
                    <div className="viewChannel__button">
                      <Button variant="contained" color="primary"> View Channel </Button>
                      
                    </div>
                  </div>

                </>
                : <></>
            }
          </div>
          {
            (channel_Videos && channel_Videos.length > 0) ?
              <>
                <h4>Latest videos from {channel_Videos[0].snippet?.channelTitle}</h4>
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
      </div>



    </div>
  );
}

export default Subscription
export const subscriptionsLst = [
  {
    "kind": "youtube#subscription",
    "etag": "jQGTBl-r3ABvErIyVfkuCXQia1w",
    "id": "_EK2sJ0KElbNP1_jt9AnOGGgRVJuARQ0VZ2Vceor1Bg",
    "snippet": {
      "publishedAt": "2020-09-26T09:48:33.258704Z",
      "title": "Academind",
      "description": "There's always something to learn!\nWhether you want to have look at Angular Tutorials or Guides, Vue.js, other Frontend Development Content or Data Science Topics or anything else - you're probably right!\n\n• Go to https://www.academind.com and subscribe to our newsletter to stay updated and to get exclusive content & discounts\n• Follow @maxedapps and @academind_real on Twitter\n• Follow @academind_real on Instagram: https://www.instagram.com/academind_real\n• Join our Facebook community on https://www.facebook.com/academindchannel\n\nSee you in the videos!\n\nImprint: https://academind.com/impressum/en\nPlease only send business inquiries to the email address, support or video-related questions can not be answered.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCSJbGtTlrDami-tDGPUV9-w"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniQTOcy62OHAnqatgn_9G1dXjD1hUDbgOUpZTcN1A=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniQTOcy62OHAnqatgn_9G1dXjD1hUDbgOUpZTcN1A=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniQTOcy62OHAnqatgn_9G1dXjD1hUDbgOUpZTcN1A=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 605,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "1uxp3-5Iz_vlVCT1ZwEvx4FBrj4",
    "id": "_EK2sJ0KElbNP1_jt9AnOA4CBTfs9IlozSG8FyC5mGQ",
    "snippet": {
      "publishedAt": "2020-08-26T04:37:49.891363Z",
      "title": "AlexKaltsMotivation",
      "description": "New video every monday. I will try to motivate you to push harder everyday, not only in the gym, but in everything you do!.\nYou should expect from the channel:Fitness and Bodybuilding Motivations,Powerful motivational speeches, and much more !",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCjfgkXbwmFzcWK8sqKA0tcA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniMYoTXcsOMyktt31Hjeb_jSdzem4SS_DASNMEo=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniMYoTXcsOMyktt31Hjeb_jSdzem4SS_DASNMEo=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniMYoTXcsOMyktt31Hjeb_jSdzem4SS_DASNMEo=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 54,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "l32jVbQ8cZpqUiANpHbu1YOTT4k",
    "id": "_EK2sJ0KElZi1N06T9WpJKcgdSic94ILHbX4J53syCY",
    "snippet": {
      "publishedAt": "2020-10-12T00:07:32.375447Z",
      "title": "Angular University",
      "description": "Angular Tutorials: Premium Quality Tutorials on Angular and its Ecosystem https://angular-university.io   The single resource a developer with a full time job needs for learning and keeping up with the fast moving Angular and its ecosystem, by providing very focused, summarised and high quality tutorials on Angular. \n\n Learn the framework from beginner to intermediate or advanced, be up-to-date on the latest developments and features, all in small bite-sized videos of less than 5 minutes. The courses include but are not limited to: \n\n- Angular For Beginners - https://angular-university.io/course/getting-started-with-angular2 \n- Angular Router - https://angular-university.io/course/angular2-routing\n- Angular Forms - https://angular-university.io/course/angular2-forms\n\nFollow us:\n\nTwitter - https://twitter.com/AngularUniv\nGoogle+ - https://plus.google.com/u/1/113731658724752465218\nFacebook - https://www.facebook.com/angular.university",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UC3cEGKhg3OERn-ihVsJcb7A"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnijmOHW42AcWqRBhymcW6TEe7bhn4o_JXb6vjMvBA=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnijmOHW42AcWqRBhymcW6TEe7bhn4o_JXb6vjMvBA=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnijmOHW42AcWqRBhymcW6TEe7bhn4o_JXb6vjMvBA=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 251,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "JHlB5SfLXCD_SQ7ripVpN5niazs",
    "id": "_EK2sJ0KElZi1N06T9WpJNj_uSsou-5K0cQvdLANJ9E",
    "snippet": {
      "publishedAt": "2020-10-16T06:45:21.008542Z",
      "title": "ARC Tutorials",
      "description": "ARC Tutorials brings you the best of technology tutorials for free. You can get free technical help and advice through us. Just drop your technical queries and we will help you for free.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCSqAIRXiW8qMrUKbGvLpXKw"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhlhGj4vfj8eON28LRYnwH7G88AtV_gzdwzGNKjSw=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhlhGj4vfj8eON28LRYnwH7G88AtV_gzdwzGNKjSw=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhlhGj4vfj8eON28LRYnwH7G88AtV_gzdwzGNKjSw=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 480,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "OUHQBPmSEud-mH184FcaxrzUdLU",
    "id": "_EK2sJ0KElbNP1_jt9AnOJmx-LtqAxGY06rHaF3X5Ts",
    "snippet": {
      "publishedAt": "2020-07-07T14:19:50.186113Z",
      "title": "Automation Step by Step - Raghav Pal",
      "description": "Raghav is a teacher and founder of AutomationStepByStep.com\nHe was an Automation Architect and has led multiple teams of Automation and DevOps Engineers. For over a decade, Raghav witnessed, worked, and delivered multiple Automation Testing Projects and worked with some awesome people in this industry.\nToday he teaches Automation, Testing, DevOps and CI.\nHe is also a coach and trainer and conducts classes in India and the US. \n\nWords from Raghav\nWe often need someone to hold our hand and help us take the first few steps before we learn to walk and run. I am on a mission to spread education and make it available to anyone willing to learn.\n\nNever stop learning…\nRaghav Pal\n\nAll education here is FREE FOR ALL, FOREVER.\nhttps://automationstepbystep.com/\n\nOnce you get the knowledge, do share with as many people as you can in your lifetime.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCTt7pyY-o0eltq14glaG5dg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngeQBLQw12OS0tgCUrJ8ubtlK8k5tBWcHadzAPobA=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngeQBLQw12OS0tgCUrJ8ubtlK8k5tBWcHadzAPobA=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngeQBLQw12OS0tgCUrJ8ubtlK8k5tBWcHadzAPobA=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 759,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "MK28qfN6e0bb-ATl6LvnWe25CQs",
    "id": "_EK2sJ0KElZi1N06T9WpJIQhxlRFe98iBVGjRjI18lE",
    "snippet": {
      "publishedAt": "2020-10-13T13:35:04.108568Z",
      "title": "Awais Mirza",
      "description": "On this channel you will find Tech Videos , AutoDesk software Tutorial, Adobe Tutorial and Programming Tutorial. Mobile Tech and Reviews  Videos. https://goo.gl/G4dZJX\n\nMilestone\n100 : 04/06/2016\n1k : 04/08/2016\n2k : 28/09/2016\n5k: 05/01/2017\n10k : 28/03/2017",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCIKbbV7ae7LAWa8cGnvjSPA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngEZ873n9KjUX9k5Z7KDxBsXyZXmSbPU254J3csDw=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngEZ873n9KjUX9k5Z7KDxBsXyZXmSbPU254J3csDw=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngEZ873n9KjUX9k5Z7KDxBsXyZXmSbPU254J3csDw=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 755,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "lFlpct_QzqCYO7xaWFqPsWH2vXc",
    "id": "_EK2sJ0KElbNP1_jt9AnOKN9Oq6Qw5gkydHYpsxjxZs",
    "snippet": {
      "publishedAt": "2020-07-03T03:36:18.653792Z",
      "title": "Chris Pyak",
      "description": "Chris Pyak is the Author of “How To Win Jobs & Influence Germans“. The managing director of Immigrant Spirit GmbH has worked in four different cultures and lived in five different countries.\n\nChris returned to Germany in 2011. His mission: Bring the Immigrant Spirit to his home country. Chris introduces international professionals to employers in Germany.\nGet 100 German conmpanies that hire in English at https://www.immigrantspirit.com/100-german-companies-hire-english-speaking-professionals/",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCeWxWWNHB2XTt8aKzoq9qbg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjRF_MYk1xcyrg8XMBMPgwM02YTZn4i0mLOAt2y-A=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjRF_MYk1xcyrg8XMBMPgwM02YTZn4i0mLOAt2y-A=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjRF_MYk1xcyrg8XMBMPgwM02YTZn4i0mLOAt2y-A=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 124,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "Sj6fE3iKBBJwjFxDkVLc1BhaaQ4",
    "id": "_EK2sJ0KElZi1N06T9WpJDgGui9LTI8gTNCxD9EWAfs",
    "snippet": {
      "publishedAt": "2020-09-04T07:27:45.227401Z",
      "title": "Clever Programmer",
      "description": "You can find awesome programming lessons here! Also, expect programming tips and tricks that will take your coding skills to the next level.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCqrILQNl5Ed9Dz6CGMyvMTQ"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniwccxGvXvGzzwka5f73aPbmdxvEX4G_cUd7TEzkw=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniwccxGvXvGzzwka5f73aPbmdxvEX4G_cUd7TEzkw=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniwccxGvXvGzzwka5f73aPbmdxvEX4G_cUd7TEzkw=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 513,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "fHX-nhFb1MhmrcJJKvGSeqPcXxY",
    "id": "_EK2sJ0KElbNP1_jt9AnOJ-bKAh28SXUgVoZ2Nw5n4s",
    "snippet": {
      "publishedAt": "2020-12-15T02:48:33.215137Z",
      "title": "codedamn",
      "description": "Hi! I create videos mostly related to programming, and sometimes simple hacks and tricks to survive on internet! You'll find me covering a variety of topics I love to learn in my free time, mostly revolving around JavaScript.\n\nMilestones\n\nMarch 18, 2015 - First Video\nJune 18, 2016 - 10K subscribers!\nJuly 3, 2016 - 1 million views!\nDecember 1, 2017 - 50K Subscribers!\nDecember 4, 2018 - 10 million views!\nJuly 3, 2019 - 100K Subscribers!",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCJUmE61LxhbhudzUugHL2wQ"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjJzxp8COuChc2Iccn41G1sBr9DRbFpR3jeo9shvw=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjJzxp8COuChc2Iccn41G1sBr9DRbFpR3jeo9shvw=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjJzxp8COuChc2Iccn41G1sBr9DRbFpR3jeo9shvw=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 1305,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "ko2Ou8BgyICDJNni45yHFu7z20c",
    "id": "_EK2sJ0KElZi1N06T9WpJL1H_FR_l7zw8ZSTJioPsiU",
    "snippet": {
      "publishedAt": "2020-03-12T02:29:28.870786Z",
      "title": "CodeSpace",
      "description": "CodeSpace is all about programming and coding end to end solution from scratch to production deployment.\nI'm Gourab Paul and here are some things I talk about - AWS cloud computing, Node js, Java, Javascript, Angular and more.\nSo if you're a software engineer or app developer that wants to build a webpage or highly scale application, make sure to subscribe to my channel right now.\nAs you can see, my channel publishes videos that focus on app development, real life examples, website building including frontend UI and robust backend.\nSubscribe now, and follow 👉 https://instagr.am/gourabpaul1710 and win some cool 🎮 giveaway 🤖 goodies.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCTI8_vW-CmKkZuWIU7Yi8BQ"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniQG-taRUWNBM7nZlXNc_Fr85SOe9WZk3E1ZxNR=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniQG-taRUWNBM7nZlXNc_Fr85SOe9WZk3E1ZxNR=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniQG-taRUWNBM7nZlXNc_Fr85SOe9WZk3E1ZxNR=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 117,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "AVd1TrxDZmPyxoBiQrrBGT1DSvQ",
    "id": "_EK2sJ0KElbNP1_jt9AnOJqZqlUevUOUX8s3eLWa5eI",
    "snippet": {
      "publishedAt": "2020-07-03T16:41:28.198582Z",
      "title": "Codevolution",
      "description": "Tutorials on the latest tech in web development!",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UC80PWRj_ZU8Zu0HSMNVwKWw"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj5vbwTemGpOuabZnfkl_tDzb_Fldf_CSMW2cg3=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj5vbwTemGpOuabZnfkl_tDzb_Fldf_CSMW2cg3=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj5vbwTemGpOuabZnfkl_tDzb_Fldf_CSMW2cg3=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 723,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "MvbPpU6PE8-Vu5hEJbAPLhrV9Wg",
    "id": "_EK2sJ0KElbNP1_jt9AnOP-PpgOgcEERQ7snAdRr9P8",
    "snippet": {
      "publishedAt": "2020-05-09T08:51:06.731757Z",
      "title": "Corey Schafer",
      "description": "Welcome to my Channel. This channel is focused on creating tutorials and walkthroughs for software developers, programmers, and engineers. We cover topics for all different skill levels, so whether you are a beginner or have many years of experience, this channel will have something for you.\n\nWe've already released a wide variety of videos on topics that include: Python, Git, Development Environments, Terminal Commands, SQL, Programming Terms, JavaScript, Computer Science Fundamentals, and plenty of other tips and tricks which will help you in your career.\n\n\nIf you enjoy these videos and would like to support my channel, I would greatly appreciate any assistance through my Patreon account:\nhttps://www.patreon.com/coreyms\n\n\nYou can find me on:\nMy website - http://coreyms.com/\nFacebook - https://www.facebook.com/CoreyMSchafer\nTwitter - https://twitter.com/CoreyMSchafer\nGoogle Plus - https://plus.google.com/+CoreySchafer44/posts\nTumblr - https://www.tumblr.com/blog/mycms",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCCezIgC97PvUuR4_gbFUs5g"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngomgNvn2XgfFWEVlxCl_tUVEOhmUTUTlesdnuD=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngomgNvn2XgfFWEVlxCl_tUVEOhmUTUTlesdnuD=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngomgNvn2XgfFWEVlxCl_tUVEOhmUTUTlesdnuD=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 230,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "uOWxxYfjh6yHpbRs0slToHCKtXE",
    "id": "_EK2sJ0KElbNP1_jt9AnOBGu7p39TbFFUO_UTbVQnIQ",
    "snippet": {
      "publishedAt": "2020-08-26T15:27:20.996255Z",
      "title": "Fearless Soul",
      "description": "LISTEN to MORE Fearless Soul on EVERY good music platform, including:\nApple Music, Spotify, iTunes: YouTube Music, Deezer and Amazon Music\nSEARCH \"Fearless Soul\"",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UC0nOQ1R3Z-vRO7K6g-W7Jkg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjnmhosAU7ytPTGAxMcHyrqKsChD2c8R3Tv42_pvw=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjnmhosAU7ytPTGAxMcHyrqKsChD2c8R3Tv42_pvw=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjnmhosAU7ytPTGAxMcHyrqKsChD2c8R3Tv42_pvw=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 199,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "uR5uPJpcuOXCU7_MxCBeVc1SiO0",
    "id": "_EK2sJ0KElbNP1_jt9AnOPId1oWAm55yUDmGkWCTPkk",
    "snippet": {
      "publishedAt": "2020-09-06T10:39:41.059292Z",
      "title": "Firebase",
      "description": "The YouTube channel for all things Firebase! Learn how to build awesome apps with hands-on tutorials from the Firebase team. Firebase helps you build better mobile apps and grow your business.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCP4bf6IHJJQehibu6ai__cg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni6auGZNOFo5PfYQUwW4mLmCMRJ1sHXqApbh_fwYw=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni6auGZNOFo5PfYQUwW4mLmCMRJ1sHXqApbh_fwYw=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni6auGZNOFo5PfYQUwW4mLmCMRJ1sHXqApbh_fwYw=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 529,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "Gg3Rg3LeRbtdHLG8aTucogPvjF0",
    "id": "_EK2sJ0KElZi1N06T9WpJDYGVxMx96TEmUy41vt1sHw",
    "snippet": {
      "publishedAt": "2020-12-15T03:14:20.351906Z",
      "title": "Fireship",
      "description": "High-intensity ⚡ code tutorials to help you build & ship your app faster. Subscribe for new videos every week covering intermediate to advanced lessons about JavaScript, Flutter, Firebase, and modern app development.\n\nThe original home of #100SecondsOfCode and #CodeThisNotThat. Created by Jeff Delaney. \n\nBuilding an app? Get project support, advanced full courses, and more at https://fireship.io",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCsBjURrPoezykLs9EqgamOA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjWfh0Ki7uJWaYNhpZyG8ataxCL9N5SscOhfZfGXg=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjWfh0Ki7uJWaYNhpZyG8ataxCL9N5SscOhfZfGXg=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjWfh0Ki7uJWaYNhpZyG8ataxCL9N5SscOhfZfGXg=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 272,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "8T1gk7ilHQzNwsRg8dOhYP3-qWA",
    "id": "_EK2sJ0KElZi1N06T9WpJPNmdrJ2rUU4b0N2UO9XqFw",
    "snippet": {
      "publishedAt": "2020-09-23T07:15:50.647288Z",
      "title": "Fun Of Heuristic",
      "description": "In this channel I publish programming video tutorials. The Subjects I am going to cover will be from basic programming language and latest frameworks to advance algorithm and concept.I am going  to cover topics of Artificial Intelligence and Machine Learning In future.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCsy12h-0xK_UCJDIDDEe0zQ"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhHodPPnuKxiiQjAyjJrHWKpRw47yGMzMqJdsbh=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhHodPPnuKxiiQjAyjJrHWKpRw47yGMzMqJdsbh=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhHodPPnuKxiiQjAyjJrHWKpRw47yGMzMqJdsbh=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 78,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "D5T-tH9jJMAh5TEzCLbBZkdvMLg",
    "id": "_EK2sJ0KElZi1N06T9WpJI6xilWEfZ7qmQFMO4hJXeY",
    "snippet": {
      "publishedAt": "2020-08-26T15:44:32.408206Z",
      "title": "Gaur Gopal Das",
      "description": "Official YouTube page of Gaur Gopal Das. A personal coach, monk, lifestyle & motivational strategist, sharing deeper spiritual insights with the world.\n\nIf you wish to invite for an event or have any requests, send an email with details to gaurgopald@gmail.com",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCz22l7kbce-uFJAoaZqxD1A"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngT2x9hNUHAx1qzCZCEv7rv49R66gkIVop7Zi8I_w=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngT2x9hNUHAx1qzCZCEv7rv49R66gkIVop7Zi8I_w=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngT2x9hNUHAx1qzCZCEv7rv49R66gkIVop7Zi8I_w=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 235,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "i4nRgUHZKWx73SOfg0FzeavWts8",
    "id": "_EK2sJ0KElbNP1_jt9AnOBVvCpisS6AjgH-JjdNMiaA",
    "snippet": {
      "publishedAt": "2020-09-26T04:16:25.512683Z",
      "title": "Google Cloud Platform",
      "description": "Helping you build what's next with secure infrastructure, developer tools, APIs, data analytics and machine learning.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCJS9pqu9BzkAMNTmzNMNhvg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjQ_JPwSLka-OWR-0uiTQQeiqav3I8LO0YTEg_2kH4=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjQ_JPwSLka-OWR-0uiTQQeiqav3I8LO0YTEg_2kH4=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjQ_JPwSLka-OWR-0uiTQQeiqav3I8LO0YTEg_2kH4=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 3075,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "S5VTOYFpDzDYI2YLCDSOYxUODLg",
    "id": "_EK2sJ0KElbNP1_jt9AnOKjo7_X2OFOQXoChqOAYnso",
    "snippet": {
      "publishedAt": "2020-09-25T07:16:24.031012Z",
      "title": "Google Open Source",
      "description": "Announcing new open source releases, exploring major projects, sharing how we approach FOSS, and supporting communities around the world.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UC7BjFZywGHiqWdEF7SnQ7hQ"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj3dQY51mOStgAyabYDYRVBSKlp2zsIx5HaK2-lhw=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj3dQY51mOStgAyabYDYRVBSKlp2zsIx5HaK2-lhw=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj3dQY51mOStgAyabYDYRVBSKlp2zsIx5HaK2-lhw=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 136,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "ilVLs8fq5T94swxESgpvoHNz8D8",
    "id": "_EK2sJ0KElbNP1_jt9AnOKp3L4OuPiL0qr4dHahAeL8",
    "snippet": {
      "publishedAt": "2020-11-15T03:56:54.564511Z",
      "title": "Harry Wolff",
      "description": "Hello there and welcome to my channel!\n\nMy name is Harry Wolff and I love JavaScript.\n\nSo! Every week I post a new video to share my love and joy of JavaScript and all things web related.\n\nI come with over 10 years of industry experience so I like to think I know what I'm talking about.\n\nGlad to have you here!",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCgdeMp2ZBnovi12THmLc47g"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnidIoQB0djYy0_sN7ZSTpoXGerg3lPmnySQmpcb3A=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnidIoQB0djYy0_sN7ZSTpoXGerg3lPmnySQmpcb3A=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnidIoQB0djYy0_sN7ZSTpoXGerg3lPmnySQmpcb3A=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 208,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "Bwgn9JiBLW_837WVJUzrCXlQRxs",
    "id": "_EK2sJ0KElbNP1_jt9AnOFlJVaVjSHf8HbvB4SZGwMw",
    "snippet": {
      "publishedAt": "2020-10-15T23:47:44.658466Z",
      "title": "Hitesh Choudhary",
      "description": "Website: https://courses.LearnCodeOnline.in\nHey there everyone, Hitesh here back again with another video!\nThis means I create a lot of videos, every single week. I cover a wide range of subjects like programming, what's latest in tech, new frameworks, open-source products etc. I keep my interest in a wide area of tech like Javascript, Python, PHP, Machine Learning, etc.\n\n\nFor the Business purpose, Sponsorships and invitation, reach out at hitesh@lco.dev\n\nNOTE: Personal questions and code-related questions are not answered at this email. Post them in the course discussion section or react me out at social platforms.\n\n#iWriteCode\n\nInstagram: https://instagram.com/hiteshchoudharyofficial\nFacebook: www.fb.com/HiteshChoudharyPage",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCXgGY0wkgOzynnHvSEVmE3A"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnihtV8Mb0JZFkkAEf9KKN4m4WNNeHkxUb6Wuvc_5w=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnihtV8Mb0JZFkkAEf9KKN4m4WNNeHkxUb6Wuvc_5w=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnihtV8Mb0JZFkkAEf9KKN4m4WNNeHkxUb6Wuvc_5w=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 973,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "5a1X9Lqd1GyPWuGp4Y0ZBetNspI",
    "id": "_EK2sJ0KElbNP1_jt9AnOBfRhTirskWUyztaXBmId1c",
    "snippet": {
      "publishedAt": "2020-11-24T00:59:55.926278Z",
      "title": "IAmTimCorey",
      "description": "My goal is to make your life easier, specifically when it comes to learning software development. I remember what it was like to not know even what questions to ask. In every video I do, I try to answer those questions. You will notice that I don't usually do quick videos. That's because I would rather help you understand rather than just padding my watch percentages. If you want more in-depth training, feel free to head over to my website (https://www.iamtimcorey.com) where I have courses dedicated to C#, SQL, and more.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UC-ptWR16ITQyYOglXyQmpzw"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniJffKHDYicKzejhEfcT84DOHePDVrwC4iJznuM=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniJffKHDYicKzejhEfcT84DOHePDVrwC4iJznuM=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniJffKHDYicKzejhEfcT84DOHePDVrwC4iJznuM=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 227,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "ojCaVbjnV-kZ4ruFwzf9gs39_ZA",
    "id": "_EK2sJ0KElZi1N06T9WpJG3CnkrUJpBikJCiuccWHy4",
    "snippet": {
      "publishedAt": "2018-04-09T06:45:45.23296Z",
      "title": "JavaInUse",
      "description": "www.javainuse.com",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCbz69gWlMmsIn-jiIm6mGfg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhrkcIF3ywZdA3NhZQnIfpldtuxzluO1zZRmi5oag=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhrkcIF3ywZdA3NhZQnIfpldtuxzluO1zZRmi5oag=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhrkcIF3ywZdA3NhZQnIfpldtuxzluO1zZRmi5oag=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 151,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "eN2VniaEgHTlqvv7oZk4tWCOaKM",
    "id": "_EK2sJ0KElbNP1_jt9AnONq-zNrwyb87XjCttYM5r8U",
    "snippet": {
      "publishedAt": "2020-09-02T22:47:35.542638Z",
      "title": "Learn German",
      "description": "Learn German from an experienced team of teachers for all levels: Beginners (Level A1 and Level A2), Intermediate (Level B1 and Level B2) and Advanced (Level C1 and Level C2). Our high quality German lessons provide you 24x7 German learning lessons free of cost! Choose your topic, level, category, time, place and pace to learn as per your needs. Learn not only words and grammar but also their usage in day to day life. \n\nGerman learning made easy for learners of all age groups and needs. Learn German conveniently and learn how to react in various situations like formal and informal. Comment if you have questions or feedback and get your doubt cleared instantly!\n\nSo no more spending money for costly German language classes, no more travelling to an institute. Learn German from the comfort of your home and that too free of cost. Listen to the videos as many times you want. \n\nShare the video and subscribe for regular lesson updates! #learngermanoriginal\n\nHave fun and all the best!",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCaeT58uDMlPpBlwAYaxN0LA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjurNpn7PTJDG6VDS0E0cDzdhFlD21oOdlUCLef=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjurNpn7PTJDG6VDS0E0cDzdhFlD21oOdlUCLef=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjurNpn7PTJDG6VDS0E0cDzdhFlD21oOdlUCLef=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 371,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "Xu6IYTN7gsikv8XqRJrDeUn8EEU",
    "id": "_EK2sJ0KElZ3L-JpRzWT9HEKwXo9KgatQxVMCyR1nRQ",
    "snippet": {
      "publishedAt": "2020-09-10T05:58:12.535169Z",
      "title": "Learn With Sam And Ash",
      "description": "In our Youtube channel, Learn With Sam and Ash, we provide free IELTS full course and English tutorials along with advices to go abroad. It will take few seconds to go through the channel but could help you in a big way. Good luck.\n\nIf you are working on IELTS, definitely, you are planning to go abroad, which isn’t an easy task to understand. But we take care of all the doubts and many other things connected to overseas journey in a free webinar.\n \nIf you are interested, please contact us at learnwithsamandash@gmail.com",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCQd8w-t-PaYD40H81v6EyYg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhwZ_agIGMqyJ-IBEwt3_pBDBlSGDg_kKhJDMPT=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhwZ_agIGMqyJ-IBEwt3_pBDBlSGDg_kKhJDMPT=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhwZ_agIGMqyJ-IBEwt3_pBDBlSGDg_kKhJDMPT=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 183,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "D-SWYxg8OhNLbULDeVyAD36qqyI",
    "id": "_EK2sJ0KElbnvh61Ss3r8r4M4IQxjL21du4Lw1jwPK0",
    "snippet": {
      "publishedAt": "2020-10-13T09:41:47.45499Z",
      "title": "Leela Web Dev",
      "description": "Hi  Friends\n\nMy name is Leela Narasimha. I am from India. I have nearly 12 years of experience in web technologies.\n\nI worked on both backend and frontend technologies in my career.\n\nIn this channel, you will be able to see all the web related technologies courses and updates.\n\nI will cover all the latest UI courses, backend courses, and also the database courses.\n\nI will try to provide all the information in the courses.\n\nIf you have any doubts or queries. Please comment below on that particular video or to the email address provided below.\n\nPlease support me by subscribing to my channel to get more updates regarding web development courses.\n\n\nPlease subscribe to my channel:\nhttps://youtube.com/c/leelawebdev\n\n\nSupport me by Donating:\nPaypal: https://paypal.me/leelanarasimha\nUPI  Id: leela.narsimha@okhdfcbank",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UC1J-YH25LCjvLnFjy7WDqGA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnh100-jfELRXjW-ab_4_a6WYSAfcM6eMCDa2twS=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnh100-jfELRXjW-ab_4_a6WYSAfcM6eMCDa2twS=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnh100-jfELRXjW-ab_4_a6WYSAfcM6eMCDa2twS=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 508,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "WWP6ioG_bcpAHY6S-8fgK3iSeMI",
    "id": "_EK2sJ0KElbNP1_jt9AnOE70M3Lffpz6zEMADZuq8s4",
    "snippet": {
      "publishedAt": "2020-08-29T16:31:51.769958Z",
      "title": "Motiversity",
      "description": "Motiversity is a new-age independent record label for some of the world's best Motivational Speakers. We produce and release original, highly-edited, exclusive speeches for speakers including Billy Alsbrooks, Eddie Truck Gordon, William Hollis and many more. We also host the popular compilation series that we call the \"Best Motivational Speeches Ever\" where we compile and re-edit our greatest hits as well as those of our peers.\n\nOur goal is to keep you motivated so that you can achieve your goals and follow your dreams. We are working hard to make your day better and push you to be your best! Whether you're studying, working out, or just feeling unmotivated, we have the Motivational Video for you!\n\n------------------------------------------------------------------------------------------------------\n\nCurrent release schedule is 1-2 videos per week.\n\nMotiversity's YouTube channel is associated with our website https://www.motiversity.com/. Check it out for more ways to stay motivated!",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCAPByrKU5-R1emswVlyH_-g"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngKv7jiGjCLoA0ubeO6Py6udsGWBJumNFFhVg2Y3g=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngKv7jiGjCLoA0ubeO6Py6udsGWBJumNFFhVg2Y3g=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngKv7jiGjCLoA0ubeO6Py6udsGWBJumNFFhVg2Y3g=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 208,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "4mPy5AOLOIwjlMEP8pwUyw3urQA",
    "id": "_EK2sJ0KElbNP1_jt9AnOHhz6rwu-v_XPbJ1NC4R57w",
    "snippet": {
      "publishedAt": "2020-08-29T16:45:47.284963Z",
      "title": "MulliganBrothers",
      "description": "MOTIVATION AND INSPIRATION! \nMulliganBrothers creating motivational videos; and inspirational videos since 2013. Get your daily dose of MOTIVATION! \nMulliganbrothers studios\nWe strive to motivate you to change your life for the better.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCIrn3pSjhCLp8xA7JXxi6Bw"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniiK7ax_F7fgIE3EXPCTvtCuu8kHG4qeDa0isokxQ=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniiK7ax_F7fgIE3EXPCTvtCuu8kHG4qeDa0isokxQ=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwniiK7ax_F7fgIE3EXPCTvtCuu8kHG4qeDa0isokxQ=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 478,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "x5ULI99nwC_FfEAdqRjg4lDIHy4",
    "id": "_EK2sJ0KElbNP1_jt9AnOIZnV4oUcvdHnxppmkvl6eQ",
    "snippet": {
      "publishedAt": "2018-04-10T10:29:35.220734Z",
      "title": "myTech-school",
      "description": "",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UC1WYtW_z8Ib49-up6_ltsYA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhQu4DcEHN1_fZjsDtzpPcJyzUlIwExuwk99w=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhQu4DcEHN1_fZjsDtzpPcJyzUlIwExuwk99w=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhQu4DcEHN1_fZjsDtzpPcJyzUlIwExuwk99w=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 95,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "ccjLhVqdq0JhVPyFQdRH2GoTQSg",
    "id": "_EK2sJ0KElbNP1_jt9AnOO6AJlS2k-GB3XBDdhhROLI",
    "snippet": {
      "publishedAt": "2020-09-24T02:27:49.474821Z",
      "title": "Programming with Mosh",
      "description": "I train professional software engineers that companies love to hire. \n\nMy courses: http://codewithmosh.com \n\nMy blog: http://programmingwithmosh.com\n\nConnect on social media: \n\nhttp://www.twitter.com/moshhamedani\n\nhttps://www.facebook.com/programmingwithmosh\n\n#python #javascript #chsarp",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCWv7vMbMWH4-V0ZXdmDpPBA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj82Lirw0dg6V5pJWAcWdG22OESyldUcDwAFEqQWg=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj82Lirw0dg6V5pJWAcWdG22OESyldUcDwAFEqQWg=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnj82Lirw0dg6V5pJWAcWdG22OESyldUcDwAFEqQWg=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 155,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "jmD-piFV3bu7jjjlZjkvwkGn_Ik",
    "id": "_EK2sJ0KElbNP1_jt9AnOEhIb9jdizqtVHjExHIT9qA",
    "snippet": {
      "publishedAt": "2020-09-02T22:49:38.604927Z",
      "title": "Sangeetha Rajeev",
      "description": "Sangeetha Rajeev is the Winner of \"Best International Pop Song\" at Voice International Music Awards, 🏆 Winner of \"Best Playback Singer \"KIMA 🏆 and Multi Award-Winning singer/performer with over 1000+ Performances to her name. Lovingly known as Queen SaRa by her loyal fans, she is also known for her electrifying presence and is one of the most sought after Performers in the country. An independent musician by choice whose aim is bring back Indian Pop Music 🤘🏻\nU can watch some amazing EDM pop singles with professionally shot music videos. Pop Icon SaRa ⭐️ \nThe Zee SaReGaMaPa Jury 👩\u200d⚖️ \nAlso u get to watch some amazing multilingual mashups, originals, live concerts & popular covers by Sangeetha. You can as well enjoy watching some Vlogs. That's SaRa for you 💜\n\nExclusive Digital Partner: Believe Artist Services\nFor Licensing enquiries: sync-india@believedigital.com\n\nFor booking enquiries:\nartistbooking-india@believedigital.com",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCJM6XoRMoBgBY4yLSR36Gng"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwng5O1Ie5adeYAC4sDqP8SIubPkh5mlDYmW5fr2tSA=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwng5O1Ie5adeYAC4sDqP8SIubPkh5mlDYmW5fr2tSA=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwng5O1Ie5adeYAC4sDqP8SIubPkh5mlDYmW5fr2tSA=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 96,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "8IBFCVDFEYsHbqau4b1c7-419VY",
    "id": "_EK2sJ0KElZ3L-JpRzWT9DK303jZzDclgX6F_y7Ul7k",
    "snippet": {
      "publishedAt": "2020-11-19T01:25:59.583821Z",
      "title": "Semy Colon",
      "description": "Learn all about the cutting edge technology in software development and create great applications.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCQM4dR3UREnGIHz93zRw_0Q"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhNbi1Mah3Ck6Au-PsAbvD3QRGgYBYFSF-zaH5tJQ=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhNbi1Mah3Ck6Au-PsAbvD3QRGgYBYFSF-zaH5tJQ=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnhNbi1Mah3Ck6Au-PsAbvD3QRGgYBYFSF-zaH5tJQ=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 120,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "Xzt45w-xWs9-d3YaYwQSy3KyxY8",
    "id": "_EK2sJ0KElZi1N06T9WpJJ87W2gsK_JZwDkmDpmV-xA",
    "snippet": {
      "publishedAt": "2020-05-10T03:46:57.879959Z",
      "title": "Society of Data Scientists",
      "description": "You have questions, whether they be about launching a Data Science career or about refining what you know about Data Science - the Society of Data Scientists is designed to help you reach your Data Science goals.\n\nThe Society provides in-depth practical examples to help you fill in the swiss cheese effect that so many Data Scientist experience. We attempt to close the gaps using open source tools and make the complex topics simple. \n\nIf you're a Data Scientist, student, or individual interested in building a proper Society of Data Scientists then your first step is to SUBSCRIBE and you will have taken your very first important step in your journey. \n\nSocietyOfDataScientists.com - Helping you become a better Data Scientist.",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCb-KS2wb_FhGXx-DELLQTTg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjS55m_ktasYfqveZRQMkIt78G4MuEB5y7iFf24=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjS55m_ktasYfqveZRQMkIt78G4MuEB5y7iFf24=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjS55m_ktasYfqveZRQMkIt78G4MuEB5y7iFf24=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 8,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "EUbXgK9VbDmRL7afb6SNP00DJ8c",
    "id": "_EK2sJ0KElbNP1_jt9AnOOleugIFaARc_OiAllaElcg",
    "snippet": {
      "publishedAt": "2020-09-02T12:58:15.301353Z",
      "title": "StatQuest with Josh Starmer",
      "description": "Statistics, Machine Learning and Data Science can sometimes seem like very scary topics, but since each technique is really just a combination of small and simple steps, they are actually quite simple. My goal with StatQuest is to break down the major methodologies into easy to understand pieces. That said, I don't dumb down the material. Instead, I build up your understanding so that you are smarter.\n\nContact, Video Index, Etc: https://statquest.org",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCtYLUTtgS3k1Fg4y5tAhLbw"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjEkKLjVVfaGrs4Y-teISVqFmssnK7Ia19fLGi-=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjEkKLjVVfaGrs4Y-teISVqFmssnK7Ia19fLGi-=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjEkKLjVVfaGrs4Y-teISVqFmssnK7Ia19fLGi-=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 189,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "mc2HGLAKe1uE7H5wQ_XnhHVGzzw",
    "id": "_EK2sJ0KElZi1N06T9WpJC9MoI966GmIE7Zwl6CMFUU",
    "snippet": {
      "publishedAt": "2020-10-23T01:28:25.276363Z",
      "title": "Telugu Geeks",
      "description": "Hi dear friends and knowledge seekers,\nwelcome to Telugu Geeks.we love to learn science,psychology,facts,trivia and read books.Through this channel we will share our knowledge and would love to receive your feedback through the community of subscribers.we love our mother tongue and will try our best to bring the best content possible.\nstay smart",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCPLCQxD153t7OdWDwAslgGg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjrqGdr0lbpT_MycCtTmVdBSF32dFW2sTW2NwyDHQ=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjrqGdr0lbpT_MycCtTmVdBSF32dFW2sTW2NwyDHQ=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjrqGdr0lbpT_MycCtTmVdBSF32dFW2sTW2NwyDHQ=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 292,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "g_OR44EaVgnuoIjZZdwODYotAlc",
    "id": "_EK2sJ0KElbNP1_jt9AnONpHX-XW3jKRau1MiEOrY_Y",
    "snippet": {
      "publishedAt": "2020-10-13T00:40:18.398176Z",
      "title": "The Net Ninja",
      "description": "Black-belt your web development skills. Over 1000 free programming tutorials about:\n\n- Modern JavaScript (beginner to advanced)\n- Node.js\n- React\n- Vue.js\n- Firebase\n- MongoDB\n- HTML & CSS\n- PHP & MySQL\n- Laravel\n- React Native\n- Flutter\n\n...And many more topics as well :)",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCW5YeuERMmlnqo4oq8vwUpg"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni-Wm0ZBDYJYFwySP2esxgc8s9mKiwmI3yJrmjlHQ=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni-Wm0ZBDYJYFwySP2esxgc8s9mKiwmI3yJrmjlHQ=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni-Wm0ZBDYJYFwySP2esxgc8s9mKiwmI3yJrmjlHQ=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 1457,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "t-82C34bc6OZpAvhGyuyr6M7DRU",
    "id": "_EK2sJ0KElZi1N06T9WpJH7jOxHNWMfh_jdwQB1mdIQ",
    "snippet": {
      "publishedAt": "2020-07-10T02:12:43.284223Z",
      "title": "This is Bailey",
      "description": "Hi guys! Welcome to channel This is Bailey.\n\nBailey, cream funny and cute puppy of the Golden Retriever, was born on January 17, 2018.\n\nHere you will see all the funniest and cutest video moments of our beloved cute puppy Bailey's life!\n\nWe hope you enjoy Bailey! Be sure to hit that subscribe button for new videos!\n\nConnect with me! - funnydogbailey@gmail.com",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCWTgK00SCKKNgpbsAgqzUxw"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnh7ouHyPUIcaejsEAxcQl7TvTWipDrwd5VY6Wc9=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnh7ouHyPUIcaejsEAxcQl7TvTWipDrwd5VY6Wc9=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnh7ouHyPUIcaejsEAxcQl7TvTWipDrwd5VY6Wc9=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 160,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "PL8DvCEsPUyNgHOhp0dXerUC4eE",
    "id": "_EK2sJ0KElZi1N06T9WpJM0IXWunEYfXapTug76w9Pg",
    "snippet": {
      "publishedAt": "2020-09-23T09:48:39.473217Z",
      "title": "Thumb IKR - Programming Examples",
      "description": "👉If you like below topics then ❤️Subscribe❤️ for getting tutorials...\n\n👉Popular Playlists :\n\n✔️ All CRUD operations (https://bit.ly/2kALx1I)\n✔️ Xamarin Tutorial series (https://bit.ly/2m4Wycb)\n✔️ ASP.NET Core (https://bit.ly/2kai5zE)\n✔️ BLAZOR Tutorial (https://bit.ly/2vFMfA8)\n✔️ ASP.NET MVC (https://bit.ly/2kyaQBy)\n✔️ Web API (https://bit.ly/2m0dBMl)\n✔️ Entity Framework (https://bit.ly/2kAuDjP)\n✔️ Reporting (https://bit.ly/2kB61Yn)\n✔️ SQL Server (https://bit.ly/2k1hb8m)\n✔️ Angular 8 (https://bit.ly/31XPGfZ)\n✔️ Angular 4 (https://bit.ly/2m6ZTaL)\n✔️ Angular 2 (https://bit.ly/2k52DVh)\n✔️ AngularJS (https://bit.ly/2m5VZil)\n✔️ C# Desktop app (https://bit.ly/2lDvPDk)\n✔️ LINQ (https://bit.ly/2kALy5N)\n✔️ jQuery (https://bit.ly/2kpTOpt)\n✔️ Bootstrap (https://bit.ly/2k1hFLI)\n\n👉 Website : https://thumbikr.blogspot.com\n\nFor Business / Sponsorship Inquiries : thumb.ikr.official@gmail.com",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCeq5BQURAWmH7lCr3Bl9QRA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngY_95FF6JD-x7GmewN9o3vb2jwNlWMf490oFDJbw=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngY_95FF6JD-x7GmewN9o3vb2jwNlWMf490oFDJbw=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngY_95FF6JD-x7GmewN9o3vb2jwNlWMf490oFDJbw=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 217,
      "newItemCount": 0,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "GMTjXvwgs5L-cypWg2CPY8LYaKM",
    "id": "_EK2sJ0KElbNP1_jt9AnOE7lQN7G_4T99KeG_VHZ1F8",
    "snippet": {
      "publishedAt": "2018-08-31T18:50:08.64324Z",
      "title": "Voice Of Telugu",
      "description": "Voice Of Telugu \nA Telugu Motivational Youtube Channel,\nYou can find, Telugu motivational videos, Telugu motivational speeches, Telugu motivational words, Telugu motivational life stories, Telugu motivational speech for success in life, Inspirational videos in Telugu, Inspirational Life Stories in Telugu, Inspirational speeches for success in life, Evergreen Telugu motivational stories of life, Latest best motivational videos in Telugu, Motivational Videos for self-confidence, Videos for Positive Thinking in Telugu, Motivational videos from all religions, Positive things from Bhagavadgeetha, Quran, Bible , Moral stories in Telugu, Inspirational videos, Inspirational speeches, Latest Best Telugu Motivational Video for Students,Telugu Inspirational Videos\n\nTo get such Motivational/positive audios or videos\n(Save this number first  +91 97000 55310)\n(Note: No calls please, may not respond to msgs always)\n(Contact Email : voiceofteluguofficial@gmail.com)\n\nThank you \nVoice Of Telugu",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UC06CSMqAhpBvhSRwHUBgyPw"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni9D6GUq8BLHQlIpHpAtK3wwlowJfLlQqMLhycNig=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni9D6GUq8BLHQlIpHpAtK3wwlowJfLlQqMLhycNig=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwni9D6GUq8BLHQlIpHpAtK3wwlowJfLlQqMLhycNig=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 848,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "ZsD-n2jKOay-C1Zwg1Y5yOnJirY",
    "id": "_EK2sJ0KElZ3L-JpRzWT9N3S6ivS_2QucxIOldubweo",
    "snippet": {
      "publishedAt": "2020-08-06T03:49:45.268207Z",
      "title": "Voice Of Telugu - Daily Dose",
      "description": "వాట్సాప్ స్టేటస్ లు గా , పెట్టుకోవడానికి చాల మంది తరచు వీడియోస్ పెట్టమంటూ ఉంటారు, \nమన రెగ్యులర్ వాయిస్ అఫ్ తెలుగు ఛానల్ లో.. 30 సెకండ్స్ వి పెట్టడం  వలన, \nమిగిలిన వీడియోస్ పెట్టడం కుదరదు గనుక, \nకేవలం స్టేటస్ వీడియోస్ పట్ల ఇష్టపడే వారికోసం ప్రత్యేకంగా ఈ ఛానల్, ఇందులో స్టేటస్ కి పనికొచ్చే విధంగా.. \nచక్కని వీడియోస్ ని రిలీజ్ చెయ్యడం జరుగుతుంది.. \n\nFor Exclusive Whatsapp/Status Videos \nfrom Voice Of Telugu\nVoice Of Telugu - Daily Dose✊",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCvqe90u4mHfJBXiYOPHFv3A"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngVeYHzh3j7bhI64SRC7bSk5IiyAOBneq2Lu36xqQ=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngVeYHzh3j7bhI64SRC7bSk5IiyAOBneq2Lu36xqQ=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwngVeYHzh3j7bhI64SRC7bSk5IiyAOBneq2Lu36xqQ=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 133,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "bUFL13Hqxo7g37r86VgbSxVmxN0",
    "id": "_EK2sJ0KElbNP1_jt9AnOJgoSrlWX-TRSgJ-92dl6eQ",
    "snippet": {
      "publishedAt": "2020-08-06T03:49:43.298821Z",
      "title": "Voice Of Telugu - Ethical Hacking",
      "description": "Voice Of Telugu - Ethical Hacking is a telugu cyber security youtube channel you can learn here ethical hacking, security, penetration testing and malware analysis etc...\n\n*NOTE :  \n      All video’s and tutorials are for informational and educational purposes only. We believe that ethical hacking, information security and cyber security should be familiar subjects to anyone using digital information and computers. We believe that it is impossible to defend yourself from hackers without knowing how hacking is done. Videos provided on ( Voice Of Telugu - Ethical Hacking ) youtube channel. Is only for those who are interested to learn about ethical hacking, security, penetration testing and malware analysis. Hacking tutorials is against misuse of the information and we strongly suggest against it. Please regard the word hacking as ethical hacking or penetration testing every time this word is used.\n\nFor Business Enquiries/Promotion Kindly Mail At :\nSupport@voiceoftelugu.net\n\nThankyou:)",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCTaOl-lPhQxhfu2H23mm7RA"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjwaoHcaJGjAcTFgEYfjzNXZ7A0MZ1F2ZwHZj6h=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjwaoHcaJGjAcTFgEYfjzNXZ7A0MZ1F2ZwHZj6h=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjwaoHcaJGjAcTFgEYfjzNXZ7A0MZ1F2ZwHZj6h=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 20,
      "newItemCount": 1,
      "activityType": "all"
    }
  },
  {
    "kind": "youtube#subscription",
    "etag": "IHvuQbPwCsuKKAE2-ns8X6Q-gaA",
    "id": "_EK2sJ0KElZi1N06T9WpJGUY7zQCSgudJJX9ufYTxNA",
    "snippet": {
      "publishedAt": "2020-08-06T03:49:41.696338Z",
      "title": "Voice Of Telugu 2.O",
      "description": "Voice Of Telugu 2.O A Telugu  Youtube Channel You Can Find Here biography in telugu,telugu biography,\nvoice of telugu biography,biography of telugu,\nDhoni Biography In Telugu,Abdul Kalam Biography In Telugu, Rajanikanth Biography In Telugu, Alexander Biography In Telugu,Bruce Lee Biography In Telugu,Bear Grylls Biography In Telugu,Adlof Hitler Biography In Telugu,unknown facts in telugu,mysteries amazing facts in telugu,intresting videos telugu,mythology stories,mythology,facts in telugu,Top 10 Facts In Telugu,shocking facts in telugu,Real facts in telugu,intresting facts,telugu Videos,Telugu knowledge videos..",
      "resourceId": {
        "kind": "youtube#channel",
        "channelId": "UCzSFjuZuCHXSnfQYXYaJbdw"
      },
      "channelId": "UCyiis4UhYFQWjMZIxchKrEg",
      "thumbnails": {
        "default": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjZCT3mqLLKRPFV6M1hgiIfix4amP2r3SRj_tXsDQ=s88-c-k-c0x00ffffff-no-rj"
        },
        "medium": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjZCT3mqLLKRPFV6M1hgiIfix4amP2r3SRj_tXsDQ=s240-c-k-c0x00ffffff-no-rj"
        },
        "high": {
          "url": "https://yt3.ggpht.com/ytc/AAUvwnjZCT3mqLLKRPFV6M1hgiIfix4amP2r3SRj_tXsDQ=s800-c-k-c0x00ffffff-no-rj"
        }
      }
    },
    "contentDetails": {
      "totalItemCount": 54,
      "newItemCount": 1,
      "activityType": "all"
    }
  }
]

