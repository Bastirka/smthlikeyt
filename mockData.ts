// data/mockData.ts
import { Video } from '../types';

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Building a Full Stack App with React & Node.js',
    description: 'Learn how to build a production-ready full stack application',
    thumbnail: 'https://picsum.photos/id/100/400/225',
    videoUrl: 'https://example.com/video1.mp4',
    creatorId: 'creator1',
    creatorName: 'DevMaster',
    creatorAvatar: 'https://picsum.photos/id/1/100/100',
    category: 'technology',
    tags: ['programming', 'react', 'nodejs'],
    views: 152000,
    likes: 12300,
    dislikes: 120,
    comments: 845,
    duration: 1800,
    createdAt: new Date('2024-01-15'),
    isLive: false,
    isShort: false,
    isScheduled: false,
    adEnabled: true,
    revenue: 342,
  },
  {
    id: '2',
    title: 'Gaming Highlights: Epic Moments',
    description: 'Best gaming moments of the year',
    thumbnail: 'https://picsum.photos/id/104/400/225',
    videoUrl: 'https://example.com/video2.mp4',
    creatorId: 'creator2',
    creatorName: 'GameMaster',
    creatorAvatar: 'https://picsum.photos/id/2/100/100',
    category: 'gaming',
    tags: ['gaming', 'highlights'],
    views: 894000,
    likes: 45600,
    dislikes: 890,
    comments: 2300,
    duration: 600,
    createdAt: new Date('2024-01-20'),
    isLive: false,
    isShort: false,
    isScheduled: false,
    adEnabled: true,
    revenue: 1240,
  },
];

export const mockTrending: Video[] = [...mockVideos];
export const mockShorts: Video[] = [
  { ...mockVideos[0], id: 'short1', isShort: true, duration: 30 },
  { ...mockVideos[1], id: 'short2', isShort: true, duration: 45 },
];

export const mockLiveStreams: Video[] = [
  { ...mockVideos[0], id: 'live1', isLive: true, title: 'Live Coding Session' },
];