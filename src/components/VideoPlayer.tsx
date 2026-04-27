import React, { useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { formatDuration } from '../utils/formatters';

interface VideoPlayerProps {
  title: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  views: number;
  creatorName: string;
  creatorAvatar: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  title,
  videoUrl,
  thumbnail,
  duration,
  views,
  creatorName,
  creatorAvatar,
}) => {
  const { darkMode } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(100);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  return (
    <div className={`w-full rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-black'}`}>
      <div className="relative bg-black aspect-video flex items-center justify-center group">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnail}
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full"
        />

        {/* Play Button Overlay */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition"
        >
          <div className="bg-red-600 rounded-full p-4">
            {isPlaying ? (
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21" />
              </svg>
            )}
          </div>
        </button>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full mb-3 cursor-pointer accent-red-600"
          />

          {/* Controls Bar */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="hover:opacity-80">
                {isPlaying ? (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21" />
                  </svg>
                )}
              </button>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 cursor-pointer accent-red-600"
                />
              </div>

              <span className="text-sm">
                {formatDuration(currentTime)} / {formatDuration(duration)}
              </span>
            </div>

            <button className="hover:opacity-80">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4m-4 0l5 5m11-5v4m0-4h-4m4 0l-5 5M4 20v-4m0 4h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ad Banner */}
        <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-90 rounded px-3 py-1">
          <p className="text-white text-xs font-semibold">Advertisement</p>
        </div>
      </div>

      {/* Video Info */}
      <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-900'}`}>
        <h1 className="text-xl font-bold text-white mb-3">{title}</h1>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <span>{views.toLocaleString()} views</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
