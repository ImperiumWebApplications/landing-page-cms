import dynamic from 'next/dynamic';

import { PlayIcon } from '../../../../components/Icons';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type VideoPlayerProps = {
  url: string;
  thumbnail?: string;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  const isTabletBreakpoint = useMediaQuery(`(min-width: 768px)`);

  return (
    <ReactPlayer
      width={isTabletBreakpoint ? '540px' : '90vw'}
      height={isTabletBreakpoint ? '360px' : '240px'}
      url={props.url}
      light={props.thumbnail}
      playing={true}
      controls={true}
      style={{
        position: 'relative',
        zIndex: 12,
        backgroundColor: 'var(--color-tertiary)',
        borderRadius: 10,
      }}
      playIcon={
        <button
          className="relative z-20 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-none bg-secondary pl-1 shadow-md transition-all group-hover:scale-95 group-hover:shadow-lg"
          type="button"
          aria-label="Play Video"
        >
          <PlayIcon fill="white" />
        </button>
      }
    />
  );
};
