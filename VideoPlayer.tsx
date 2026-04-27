// components/VideoPlayer.tsx
import React, { useRef, useState } from 'react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  autoPlay?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, autoPlay = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        src={video.videoUrl}
        poster={video.thumbnail}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        autoPlay={autoPlay}
      />
      
      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center space-x-4">
          <button onClick={togglePlay} className="text-white hover:text-purple-400">
            {isPlaying ? '⏸' : '▶'}
          </button>
          <div className="flex-1">
            <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>
          <span className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <button className="text-white hover:text-purple-400">🔊</button>
          <button className="text-white hover:text-purple-400">⛶</button>
        </div>
      </div>

      {/* Ad Overlay */}
      {video.adEnabled && (
        <div className="absolute top-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded">
          Sponsored
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;