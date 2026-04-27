// types/index.ts
export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
  banner?: string;
  bio?: string;
  isCreator: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  premiumUntil?: Date;
  createdAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  dislikes: number;
  comments: number;
  duration: number;
  createdAt: Date;
  isLive: boolean;
  isShort: boolean;
  isScheduled: boolean;
  scheduledFor?: Date;
  adEnabled: boolean;
  revenue: number;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  likes: number;
  createdAt: Date;
  replies: Comment[];
}

export interface AdCampaign {
  id: string;
  businessId: string;
  businessName: string;
  goal: 'awareness' | 'traffic' | 'installs' | 'sales';
  format: 'preroll' | 'banner' | 'sponsored' | 'homepage' | 'search';
  targetCountry: string;
  targetAgeMin: number;
  targetAgeMax: number;
  targetInterests: string[];
  budget: number;
  spent: number;
  startDate: Date;
  endDate: Date;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
}

export interface ShopProduct {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  price: number;
  type: 'physical' | 'digital' | 'course' | 'download';
  images: string[];
  inventory: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
}

export interface Livestream {
  id: string;
  title: string;
  creatorId: string;
  creatorName: string;
  streamKey: string;
  viewerCount: number;
  isLive: boolean;
  chatEnabled: boolean;
  subscribersOnly: boolean;
  donationsEnabled: boolean;
  pollActive?: Poll;
  scheduledStart?: Date;
  duration?: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  active: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}
