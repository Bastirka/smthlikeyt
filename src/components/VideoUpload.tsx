import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/formatters';

const VideoUpload: React.FC = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('technology');
  const [file, setFile] = React.useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle upload
    console.log('Uploading:', { title, description, category, file });
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-2xl font-bold mb-6">Upload Video</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Video Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={4}
            className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
          >
            <option value="technology">Technology</option>
            <option value="gaming">Gaming</option>
            <option value="music">Music</option>
            <option value="fitness">Fitness</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Video File</label>
          <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`}>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="video-input"
              required
            />
            <label htmlFor="video-input" className="cursor-pointer">
              <div className="text-4xl mb-2">📹</div>
              <p className="font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">MP4, WebM, or Ogg (Max 10GB)</p>
              {file && <p className="text-green-500 mt-2">✓ {file.name}</p>}
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Video
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoUpload;
