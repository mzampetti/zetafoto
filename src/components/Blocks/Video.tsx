"use client";

import { VideoField } from "@/graphql/generated";
import { useEffect, useState } from "react";

import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

const isYouTubeUrl = (url: string) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const getYouTubeEmbedUrl = (url: string) => {
  const videoIdMatch = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/)([^&?\/\s]{11})/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  return videoId ? `https://www.youtube.com/embed/${videoId}?rel=0` : url;
};

const Video = ({ video }: { video: VideoField }) => {
  const [thumb, setThumb] = useState(video.thumbnailUrl);

  useEffect(() => {
    setThumb(video.thumbnailUrl);
  }, [video.thumbnailUrl]);

  if (isYouTubeUrl(video.url)) {
    const embedUrl = getYouTubeEmbedUrl(video.url);
    return (
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={embedUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    );
  }

  return (
    <MediaPlayer title={video.title} src={video.url}>
      <MediaProvider>
        <Poster className="vds-poster" src={thumb} alt={video.title} />
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};

export default Video;
