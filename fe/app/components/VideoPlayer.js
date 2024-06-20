'use client';

import { useRef, useState } from 'react';
import videos from './Videos';

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
            className="video-container relative w-full h-[35vh] md:h-[50vh] lg:h-[60vh] overflow-hidden bg-gray-900 rounded-lg shadow-lg cursor-pointer z-10"
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
                src={videos[currentVideoIndex].src}
                autoPlay
                muted
                onEnded={handleVideoEnd}
            />
            <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full opacity-5 hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => {
                    e.stopPropagation();
                    handlePrevVideo();
                }}
            >
                &#9664;
            </button>
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 text-black p-2 rounded-full opacity-5 hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => {
                    e.stopPropagation();
                    handleNextVideo();
                }}
            >
                &#9654;
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-15 text-white p-4">
                <h2 className="text-lg md:text-2xl font-bold">{videos[currentVideoIndex].title}</h2>
                <p className="mt-2 text-sm md:text-base lg:text-lg"
                   dangerouslySetInnerHTML={{__html: videos[currentVideoIndex].description}}></p>
            </div>
        </div>
    );
};

export default VideoPlayer;
