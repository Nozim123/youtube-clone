import { Link } from 'react-router-dom';
import { Video } from '@/services/youtube';

interface VideoCardProps {
  video: Video;
}

/**
 * Video card component displaying thumbnail, title, channel info, and metadata
 * Used in video grids throughout the application
 */
export function VideoCard({ video }: VideoCardProps) {
  return (
    <Link to={`/watch?v=${video.id}`} className="group">
      <div className="space-y-3">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-semibold">
            {video.duration}
          </div>
        </div>

        {/* Video info */}
        <div className="flex gap-3">
          {/* Channel avatar */}
          <Link
            to={`/channel/${video.channelId}`}
            className="flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={video.channelAvatar}
              alt={video.channelTitle}
              className="w-9 h-9 rounded-full"
            />
          </Link>

          {/* Text info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold line-clamp-2 text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <Link
              to={`/channel/${video.channelId}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {video.channelTitle}
            </Link>
            <div className="text-sm text-muted-foreground">
              {video.views} • {video.publishedAt}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
