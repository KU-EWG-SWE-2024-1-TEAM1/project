import React from "react";
import YouTube from "react-youtube";

const YouTubeEmbed = ({ videoId, width, height }) => {
  const opts = {
    width: width,
    height: height,
    playerVars: {
      autoplay: 1, // Autoplay enabled
    },
  };

  const onReady = (event) => {
    // Mute the video on ready
    event.target.mute();
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

export default YouTubeEmbed;
