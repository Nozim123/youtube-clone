import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bell, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoGrid } from '@/components/video/VideoGrid';
import { fetchChannelById, fetchPopularVideos, Channel as ChannelType, Video } from '@/services/youtube';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Channel page displaying channel information and videos
 * Includes tabs for videos, playlists, and about sections
 */
export default function Channel() {
  const { channelId } = useParams();
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (channelId) {
      loadChannelData(channelId);
    }
  }, [channelId]);

  const loadChannelData = async (id: string) => {
    setLoading(true);
    try {
      const [channelData, videosData] = await Promise.all([
        fetchChannelById(id),
        fetchPopularVideos(),
      ]);
      setChannel(channelData);
      // Filter videos by channel (in real app, this would be a separate API call)
      setVideos(videosData.slice(0, 12));
    } catch (error) {
      console.error('Error loading channel data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !channel) {
    return (
      <div className="space-y-4">
        <Skeleton className="w-full h-48" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Channel banner */}
      {channel.banner && (
        <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
          <img
            src={channel.banner}
            alt={channel.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Channel header */}
      <div className="flex items-start gap-6">
        <img
          src={channel.avatar}
          alt={channel.title}
          className="w-32 h-32 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold">{channel.title}</h1>
            <CheckCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="text-muted-foreground mb-4">
            <span>{channel.subscribers}</span>
            <span className="mx-2">•</span>
            <span>{channel.videoCount} videos</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
            {channel.description}
          </p>
          <div className="flex gap-2">
            <Button className="rounded-full">
              Subscribe
            </Button>
            <Button variant="secondary" className="rounded-full">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </Button>
          </div>
        </div>
      </div>

      {/* Channel tabs */}
      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger
            value="videos"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Videos
          </TabsTrigger>
          <TabsTrigger
            value="playlists"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            Playlists
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
          >
            About
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
          <VideoGrid videos={videos} />
        </TabsContent>

        <TabsContent value="playlists" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            No playlists available
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <div className="max-w-2xl space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{channel.description}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Stats</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>{channel.subscribers}</p>
                <p>{channel.videoCount} videos</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
