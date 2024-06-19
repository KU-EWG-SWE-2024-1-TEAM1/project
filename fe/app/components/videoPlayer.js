'use client';

import { useRef, useState } from 'react';

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [showOverlay, setShowOverlay] = useState(true);

    const handleUnmute = () => {
        if (videoRef.current) {
            videoRef.current.muted = false;
            videoRef.current.play();
            setShowOverlay(false);
        }
    };

    const handleMouseEnter = () => {
        if (videoRef.current && videoRef.current.muted) {
            setShowOverlay(true);
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current && !videoRef.current.muted) {
            setShowOverlay(false);
        }
    };

    return (
        <div
            className="video-container relative"
            onClick={handleUnmute}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showOverlay && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg">
                    Click to unmute
                </div>
            )}
            <video ref={videoRef} className="w-screen h-[30vh] object-cover" autoPlay muted>
                <source src="/joker.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;