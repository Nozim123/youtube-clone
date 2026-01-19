import { useEffect, useState } from 'react';
import { VideoGrid } from '@/components/video/VideoGrid';
import { CategoryCarousel } from '@/components/video/CategoryCarousel';
import { fetchPopularVideos, fetchCategories, Video, Category } from '@/services/youtube';

/**
 * Home page displaying video grid with category filters
 * Main landing page of the application
 */
export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [videosData, categoriesData] = await Promise.all([
        fetchPopularVideos(),
        fetchCategories(),
      ]);
      setVideos(videosData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category filters */}
      <div className="sticky top-0 bg-background z-10 py-4 -mx-6 px-6">
        <CategoryCarousel
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {/* Video grid */}
      <VideoGrid videos={videos} loading={loading} />
    </div>
  );
}
