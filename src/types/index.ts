// Types for StreamHub Pro

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  coverImage?: string;
  bio?: string;
  followers: number;
  following: number;
  accountType: 'viewer' | 'creator' | 'business' | 'admin' | 'investor';
  isPremium: boolean;
  verified: boolean;
  createdAt: Date;
  suspended: boolean;
  walletBalance: number;
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
  adEnabled: boolean;
  revenue: number;
  thumbnailUrl?: string;
  viewerCount?: number;
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
  replies?: Comment[];
  isEdited: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  creatorId: string;
  creatorName: string;
  rating: number;
  reviews: number;
  sales: number;
}

export interface Order {
  id: string;
  userId: string;
  products: Product[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
  shippingAddress?: string;
}

export interface Analytics {
  date: Date;
  views: number;
  clicks: number;
  revenue: number;
  engagement: number;
  watch_time: number;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  status: 'active' | 'paused' | 'completed';
  views: number;
  clicks: number;
  conversions: number;
}

export interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  duration: 'monthly' | 'yearly';
  popular?: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'upload' | 'comment' | 'like' | 'follow' | 'sale' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface LiveStream {
  id: string;
  creatorId: string;
  creatorName: string;
  title: string;
  description: string;
  thumbnail: string;
  streamUrl: string;
  startTime: Date;
  endTime?: Date;
  viewers: number;
  duration: number;
  category: string;
}

export interface ChatMessage {
  id: string;
  streamId: string;
  userId: string;
  username: string;
  userAvatar: string;
  message: string;
  timestamp: Date;
  isPinned: boolean;
}
