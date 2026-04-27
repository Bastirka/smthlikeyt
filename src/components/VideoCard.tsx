import React from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../types';
import { formatViewCount, formatDate, formatDuration } from '../utils/formatters';
import { useTheme } from '../contexts/ThemeContext';

interface VideoCardProps {
  video: Video;
  variant?: 'grid' | 'list' | 'compact';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, variant = 'grid' }) => {
  const { darkMode } = useTheme();

  if (variant === 'list') {
    return (
      <Link to={`/watch/${video.id}`} className="flex gap-4 hover:opacity-80 transition">
        <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden bg-gray-300">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-1 py-0.5 rounded text-xs text-white">
            {formatDuration(video.duration)}
          </div>
          {video.isLive && (
            <div className="absolute top-1 left-1 bg-red-600 px-2 py-1 rounded text-xs text-white font-semibold">
              LIVE
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold line-clamp-2 mb-1">{video.title}</h3>
          <p className="text-sm text-gray-500 mb-1">{video.creatorName}</p>
          <p className="text-sm text-gray-500">
            {formatViewCount(video.views)} views • {formatDate(video.createdAt)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/watch/${video.id}`} className="block group cursor-pointer">
      <div className={`relative rounded-lg overflow-hidden h-32 sm:h-40 bg-gray-300 mb-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 px-2 py-1 rounded text-xs text-white font-bold">
          {formatDuration(video.duration)}
        </div>

        {video.isLive && (
          <div className="absolute top-2 left-2 bg-red-600 animate-pulse px-2 py-1 rounded text-xs text-white font-bold">
            ● LIVE
          </div>
        )}

        {video.isShort && (
          <div className="absolute top-2 left-2 bg-blue-600 px-2 py-1 rounded text-xs text-white font-bold">
            SHORT
          </div>
        )}
      </div>

      <div className="truncate">
        <h3 className="font-semibold line-clamp-2 text-sm sm:text-base mb-1 group-hover:text-blue-600">
          {video.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-1">{video.creatorName}</p>
        <p className="text-xs sm:text-sm text-gray-500">
          {formatViewCount(video.views)} views • {formatDate(video.createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default VideoCard;
