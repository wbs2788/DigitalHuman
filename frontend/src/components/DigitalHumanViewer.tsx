import React from 'react';

interface DigitalHumanViewerProps {
    serverUrl?: string;
}

export default function DigitalHumanViewer({ serverUrl = "http://localhost:8010" }: DigitalHumanViewerProps) {
    // LiveTalking typically exposes a WebRTC or simple HTTP stream.
    // For this integration, we assume it serves a page or stream we can embed.
    // Adjust this based on the actual LiveTalking API.

    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black rounded-xl overflow-hidden border border-white/10">
            <div className="absolute top-4 left-4 z-10 bg-red-600/80 text-white text-xs px-2 py-1 rounded animate-pulse">
                LIVE
            </div>

            {/* 
               Embedding the LiveTalking WebRTC page or video stream.
               If LiveTalking provides a direct MJPEG stream, use an <img> tag.
               If it provides HLS/WebRTC, we might need a specific player or iframe.
               Here we assume an iframe to the default rtcpushapi.html or similar if available,
               or just a placeholder for the user to configure.
            */}
            <iframe
                src={`${serverUrl}/clean_webrtc.html`}
                className="w-full h-full border-none"
                allow="camera; microphone; autoplay"
                title="Digital Human Stream"
            />

            <div className="absolute bottom-4 w-full text-center text-white/50 text-sm pointer-events-none">
                Powered by MuseTalk
            </div>
        </div>
    );
}
