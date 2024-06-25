'use client'
import React from 'react';
import YouTube from 'react-youtube';

const YouTubeEmbed = ({ videoId }) => {
    const opts = {
        height: '315',
        width: '560',
        playerVars: {
            autoplay: 1,
            modestbranding: 1,
        },
    };

    return <YouTube videoId={videoId} opts={opts} />;
};

export default YouTubeEmbed;