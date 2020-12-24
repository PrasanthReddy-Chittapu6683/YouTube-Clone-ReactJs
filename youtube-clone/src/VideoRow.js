import React from 'react'
import './VideoRow.css'


function VideoRow({ views, subs, timestamp, channel,description, title, image }) {
    return (
        <div className="videoRow">
            <img className="videoRow__image" src={image} alt="" />

            <div className="videoRow__text">
                <h3>
                    {title}
                </h3>
                <p> {channel} . {subs} Subscribers {views} . {timestamp}   </p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default VideoRow
