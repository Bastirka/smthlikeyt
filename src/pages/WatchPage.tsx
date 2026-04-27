import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockVideos, mockProducts } from '../data/mockData';
import VideoPlayer from '../components/VideoPlayer';
import VideoCard from '../components/VideoCard';
import { useTheme } from '../contexts/ThemeContext';
import { formatViewCount, formatDate } from '../utils/formatters';

const WatchPage: React.FC = () => {
  const { videoId } = useParams();
  const { darkMode } = useTheme();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: '1',
      user: 'John Doe',
      avatar: 'https://picsum.photos/id/10/40/40',
      content: 'This is amazing! Really helpful tutorial.',
      likes: 234,
      replies: 15,
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);

  const video = mockVideos.find(v => v.id === videoId) || mockVideos[0];
  const relatedVideos = mockVideos.filter(v => v.category === video.category && v.id !== video.id);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        {
          id: Date.now().toString(),
          user: 'You',
          avatar: 'https://picsum.photos/id/11/40/40',
          content: comment,
          likes: 0,
          replies: 0,
          timestamp: new Date(),
        },
        ...comments,
      ]);
      setComment('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Section */}
      <div className="lg:col-span-2">
        {/* Video Player */}
        <VideoPlayer
          title={video.title}
          videoUrl={video.videoUrl}
          thumbnail={video.thumbnail}
          duration={video.duration}
          views={video.views}
          creatorName={video.creatorName}
          creatorAvatar={video.creatorAvatar}
        />

        {/* Video Info */}
        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
          
          {/* Stats */}
          <p className="text-gray-500 mb-4">
            {formatViewCount(video.views)} views • {formatDate(video.createdAt)}
          </p>

          {/* Creator Section */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
            <div className="flex items-center gap-3">
              <img src={video.creatorAvatar} alt={video.creatorName} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-bold text-lg">{video.creatorName}</h3>
                <p className="text-sm text-gray-500">125K subscribers</p>
              </div>
            </div>
            <button
              onClick={() => setSubscribed(!subscribed)}
              className={`px-6 py-2 rounded-full font-bold transition ${
                subscribed
                  ? darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Description */}
          <div className={`mb-6 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <p className="text-sm line-clamp-3 cursor-pointer">{video.description}</p>
            <button className="text-blue-500 text-sm font-semibold mt-2">Show more</button>
          </div>

          {/* Engagement Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => {
                setLiked(!liked);
                setDisliked(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                liked ? 'bg-blue-600 text-white' : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              👍 {liked ? video.likes + 1 : video.likes}
            </button>
            <button
              onClick={() => {
                setDisliked(!disliked);
                setLiked(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                disliked ? 'bg-red-600 text-white' : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              👎 {disliked ? video.dislikes + 1 : video.dislikes}
            </button>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
              📤 Share
            </button>
            <button className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
              🔖 Save
            </button>
          </div>

          {/* Comments Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-bold flex-1">{video.comments} Comments</h2>
              <button onClick={() => setShowComments(!showComments)} className="text-gray-500">
                {showComments ? '▼' : '▶'}
              </button>
            </div>

            {showComments && (
              <>
                {/* Add Comment */}
                <div className="flex gap-4 mb-6 pb-6 border-b border-gray-700">
                  <img src="https://picsum.photos/id/11/40/40" alt="You" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={2}
                      className={`w-full px-3 py-2 rounded border outline-none ${darkMode ? 'bg-gray-700 border-gray-600 focus:border-blue-500' : 'bg-gray-100 border-gray-300 focus:border-blue-500'}`}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button onClick={() => setComment('')} className="px-4 py-1 rounded hover:bg-gray-700 transition">
                        Cancel
                      </button>
                      <button onClick={handleCommentSubmit} className="px-6 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((cmt) => (
                    <div key={cmt.id} className="flex gap-3">
                      <img src={cmt.avatar} alt={cmt.user} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-semibold text-sm">{cmt.user} • {formatDate(cmt.timestamp)}</p>
                        <p className="text-sm mt-1">{cmt.content}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <button className="hover:text-white">👍 {cmt.likes}</button>
                          <button className="hover:text-white">👎</button>
                          <button className="hover:text-white">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar - Related Videos */}
      <div className="space-y-4">
        {relatedVideos.slice(0, 10).map((vid) => (
          <VideoCard key={vid.id} video={vid} variant="list" />
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
