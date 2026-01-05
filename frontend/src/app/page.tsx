"use client";

import React, { useState } from 'react';
import Live2DViewer from '@/components/Live2DViewer';
import ChatInterface from '../components/ChatInterface';
import DigitalHumanViewer from '@/components/DigitalHumanViewer';
import axios from 'axios';
import { Video, User } from 'lucide-react';

export default function Home() {
  const [speaking, setSpeaking] = useState(false);
  const [mode, setMode] = useState<'live2d' | 'digital_human'>('live2d');

  const sendAudioToDigitalHuman = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'response.wav');

      // Assuming the Digital Human service accepts audio at /human/speak or similar
      // If not, we might need to adjust this URL.
      // Using a proxy or direct call if CORS allows.
      // For now, let's try a direct call to the configured port, but since we are in browser,
      // we might hit CORS. Ideally this should go through Next.js API route proxy.
      // But for local dev, let's assume we can hit it or use a proxy.
      // Let's use a new Next.js API route to proxy this to avoid CORS issues if possible,
      // or just try direct if the user has set up CORS.
      // Given the user wants to "link", let's try to send it to the backend to forward it,
      // or just send it directly.

      // Better approach: Send to our backend, and have backend forward to Digital Human.
      // But to keep it simple as per plan:
      // Send to our backend, which forwards to Digital Human
      await axios.post('http://localhost:8000/api/v1/human/speak', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      console.error("Failed to send audio to Digital Human", e);
    }
  };

  const playAudio = async (text: string) => {
    try {
      setSpeaking(true);
      const response = await axios.post('/api/voice/speak', { text }, {
        responseType: 'blob'
      });

      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };

      if (mode === 'digital_human') {
        // Send audio to Digital Human service
        // We still play it locally so the user can hear it immediately, 
        // OR we mute local audio if the digital human stream includes audio.
        // Usually Digital Human stream includes audio. Let's mute local audio or not play it.
        // But for "linking", we want the digital human to speak it.
        await sendAudioToDigitalHuman(audioBlob);

        // If the digital human stream has audio, we shouldn't play it here.
        // But if it's just video, we might need to play it.
        // Safest bet: Play it here too for now, or maybe the user wants ONLY digital human.
        // Let's play it here as fallback or sync might be off.
        // Actually, if we send it to DH, DH should play it.
        // Let's NOT play it locally if in digital_human mode, to avoid echo.
        setSpeaking(false); // Reset speaking since we handed it off? 
        // Or keep it true until we think it's done? Hard to know when DH is done.
        // Let's just set it to false after a timeout or immediately.
        setTimeout(() => setSpeaking(false), 5000); // Temporary timeout
      } else {
        audio.play();
      }
    } catch (e) {
      console.error("TTS Failed", e);
      setSpeaking(false);
    }
  };

  return (
    <main className="flex min-h-screen bg-[url('/bg_mondstadt.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/30" />

      {/* Mode Toggle */}
      <div className="absolute top-4 right-4 z-50 flex bg-black/50 backdrop-blur rounded-full p-1 border border-white/10">
        <button
          onClick={() => setMode('live2d')}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition ${mode === 'live2d' ? 'bg-blue-600 text-white' : 'text-white/70 hover:text-white'}`}
        >
          <User size={16} />
          <span>Live2D</span>
        </button>
        <button
          onClick={() => setMode('digital_human')}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition ${mode === 'digital_human' ? 'bg-blue-600 text-white' : 'text-white/70 hover:text-white'}`}
        >
          <Video size={16} />
          <span>Digital Human</span>
        </button>
      </div>

      <div className="z-10 w-full h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-12 overflow-hidden">

        {/* Left: Character Viewer */}
        <div className="relative flex items-center justify-center h-full">
          {mode === 'live2d' ? (
            <Live2DViewer
              modelPath="/models/avatar/model.json"
              speaking={speaking}
            />
          ) : (
            <DigitalHumanViewer />
          )}
        </div>

        {/* Right: Chat Interface */}
        <div className="h-[60vh] md:h-full flex flex-col justify-center">
          <ChatInterface onSpeak={playAudio} />
        </div>

      </div>
    </main>
  );
}
