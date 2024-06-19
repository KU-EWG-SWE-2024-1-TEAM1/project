'use client';

import { useRef, useState } from 'react';
const videos = [
    "/joker.webm",
    "/sing2gether.webm",
    "/hobit.webm",
];

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [showOverlay, setShowOverlay] = useState(true);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const handleUnmute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            videoRef.current.play();
            setShowOverlay(false);
        }
    };
    const handleNextVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const handlePrevVideo = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };

    const handleVideoEnd = () => {
        handleNextVideo();
    };



    return (
        <div
            className="video-container relative"
            onClick={handleUnmute}
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(!videoRef.current || videoRef.current.muted)}
        >
            {showOverlay && (
                <div
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg">
                    Click to unmute/mute
                </div>
            )}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src={videos[currentVideoIndex]}
                autoPlay
                muted
                onEnded={handleVideoEnd}
            />
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full opacity-5 hover:opacity-100 transition-opacity duration-300"
                onClick={handlePrevVideo}
            >
                &#9664;
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full opacity-5 hover:opacity-100 transition-opacity duration-300"
                onClick={handleNextVideo}
            >
                &#9654;
            </button>
        </div>
    );
};

export default VideoPlayer;