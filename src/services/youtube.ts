import axios from 'axios';
import { sampleVideos, sampleChannels, sampleCategories } from './sampleData';

// YouTube Data API configuration
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Flag to determine if we should use real API or sample data
const USE_SAMPLE_DATA = !API_KEY;

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  channelAvatar: string;
  views: string;
  publishedAt: string;
  duration: string;
  description?: string;
  channelId: string;
}

export interface Channel {
  id: string;
  title: string;
  avatar: string;
  subscribers: string;
  videoCount: string;
  description: string;
  banner: string;
}

export interface Category {
  id: string;
  name: string;
}

/**
 * Fetch trending/popular videos
 * Falls back to sample data if no API key is provided
 */
export const fetchPopularVideos = async (): Promise<Video[]> => {
  if (USE_SAMPLE_DATA) {
    return sampleVideos;
  }

  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 24,
        key: API_KEY,
      },
    });

    return response.data.items.map((item: any) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      channelAvatar: '', // Would need separate API call
      views: formatViews(item.statistics.viewCount),
      publishedAt: formatTimeAgo(item.snippet.publishedAt),
      duration: formatDuration(item.contentDetails.duration),
      description: item.snippet.description,
      channelId: item.snippet.channelId,
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    return sampleVideos;
  }
};

/**
 * Search for videos by query
 */
export const searchVideos = async (query: string): Promise<Video[]> => {
  if (USE_SAMPLE_DATA) {
    return sampleVideos.filter(video =>
      video.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: 20,
        key: API_KEY,
      },
    });

    return response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      channelAvatar: '',
      views: 'N/A',
      publishedAt: formatTimeAgo(item.snippet.publishedAt),
      duration: '0:00',
      description: item.snippet.description,
      channelId: item.snippet.channelId,
    }));
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};

/**
 * Fetch video details by ID
 */
export const fetchVideoById = async (videoId: string): Promise<Video | null> => {
  if (USE_SAMPLE_DATA) {
    return sampleVideos.find(v => v.id === videoId) || null;
  }

  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoId,
        key: API_KEY,
      },
    });

    const item = response.data.items[0];
    if (!item) return null;

    return {
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
      channelAvatar: '',
      views: formatViews(item.statistics.viewCount),
      publishedAt: formatTimeAgo(item.snippet.publishedAt),
      duration: formatDuration(item.contentDetails.duration),
      description: item.snippet.description,
      channelId: item.snippet.channelId,
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    return null;
  }
};

/**
 * Fetch channel details by ID
 */
export const fetchChannelById = async (channelId: string): Promise<Channel | null> => {
  if (USE_SAMPLE_DATA) {
    return sampleChannels.find(c => c.id === channelId) || null;
  }

  try {
    const response = await axios.get(`${BASE_URL}/channels`, {
      params: {
        part: 'snippet,statistics,brandingSettings',
        id: channelId,
        key: API_KEY,
      },
    });

    const item = response.data.items[0];
    if (!item) return null;

    return {
      id: item.id,
      title: item.snippet.title,
      avatar: item.snippet.thumbnails.medium.url,
      subscribers: formatSubscribers(item.statistics.subscriberCount),
      videoCount: item.statistics.videoCount,
      description: item.snippet.description,
      banner: item.brandingSettings?.image?.bannerExternalUrl || '',
    };
  } catch (error) {
    console.error('Error fetching channel:', error);
    return null;
  }
};

/**
 * Fetch video categories
 */
export const fetchCategories = async (): Promise<Category[]> => {
  return sampleCategories;
};

// Helper functions for formatting

function formatViews(views: string | number): string {
  const num = typeof views === 'string' ? parseInt(views) : views;
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M views`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K views`;
  }
  return `${num} views`;
}

function formatSubscribers(subs: string | number): string {
  const num = typeof subs === 'string' ? parseInt(subs) : subs;
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M subscribers`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K subscribers`;
  }
  return `${num} subscribers`;
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
