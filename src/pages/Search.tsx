import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VideoGrid } from '@/components/video/VideoGrid';
import { searchVideos, Video } from '@/services/youtube';

/**
 * Search results page
 * Displays videos matching the search query
 */
export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      loadSearchResults(query);
    }
  }, [query]);

  const loadSearchResults = async (searchQuery: string) => {
    setLoading(true);
    try {
      const results = await searchVideos(searchQuery);
      setVideos(results);
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Search results for "{query}"</h1>
        <p className="text-muted-foreground">
          {loading ? 'Loading...' : `${videos.length} results found`}
        </p>
      </div>
      <VideoGrid videos={videos} loading={loading} />
    </div>
  );
}
