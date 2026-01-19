import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { VideoGrid } from '@/components/video/VideoGrid';
import { fetchVideoById, fetchPopularVideos, Video } from '@/services/youtube';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Video watch page with player and video details
 * Includes suggested videos sidebar
 */
export default function Watch() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const [video, setVideo] = useState<Video | null>(null);
  const [suggestedVideos, setSuggestedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (videoId) {
      loadVideo(videoId);
      loadSuggestedVideos();
    }
  }, [videoId]);

  const loadVideo = async (id: string) => {
    setLoading(true);
    try {
      const videoData = await fetchVideoById(id);
      setVideo(videoData);
    } catch (error) {
      console.error('Error loading video:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestedVideos = async () => {
    try {
      const videos = await fetchPopularVideos();
      setSuggestedVideos(videos.slice(0, 8));
    } catch (error) {
      console.error('Error loading suggested videos:', error);
    }
  };

  if (loading || !video) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full aspect-video rounded-lg" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main content */}
      <div className="lg:col-span-2 space-y-4">
        {/* Video player */}
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video title */}
        <h1 className="text-xl font-bold">{video.title}</h1>

        {/* Channel info and actions */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            to={`/channel/${video.channelId}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={video.channelAvatar}
              alt={video.channelTitle}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-semibold">{video.channelTitle}</div>
              <div className="text-sm text-muted-foreground">1.2M subscribers</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-secondary rounded-full">
              <Button variant="ghost" size="sm" className="rounded-l-full rounded-r-none">
                <ThumbsUp className="h-5 w-5 mr-2" />
                125K
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="ghost" size="sm" className="rounded-r-full rounded-l-none">
                <ThumbsDown className="h-5 w-5" />
              </Button>
            </div>
            <Button variant="secondary" size="sm" className="rounded-full">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              <Download className="h-5 w-5 mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Video description */}
        <div className="bg-secondary rounded-lg p-4">
          <div className="flex gap-4 text-sm font-semibold mb-2">
            <span>{video.views}</span>
            <span>{video.publishedAt}</span>
          </div>
          <p className="text-sm whitespace-pre-wrap">{video.description}</p>
        </div>
      </div>

      {/* Suggested videos */}
      <div className="space-y-3">
        <h2 className="font-semibold">Suggested Videos</h2>
        <div className="space-y-3">
          {suggestedVideos.map((suggestedVideo) => (
            <Link
              key={suggestedVideo.id}
              to={`/watch?v=${suggestedVideo.id}`}
              className="flex gap-2 group"
            >
              <div className="relative w-40 flex-shrink-0">
                <img
                  src={suggestedVideo.thumbnail}
                  alt={suggestedVideo.title}
                  className="w-full aspect-video object-cover rounded-lg"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded font-semibold">
                  {suggestedVideo.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {suggestedVideo.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {suggestedVideo.channelTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {suggestedVideo.views}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
