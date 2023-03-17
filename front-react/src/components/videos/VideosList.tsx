import { useEffect, useState } from "react";
import { IVideo } from "../../models/IVideo";
import { Video } from "./Video";
import * as videoService from "../../services/VideoService";
export const VideosList = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);

  const getVideos = async () => {
    const res = await videoService.getVideos();
    setVideos(orderVideos(res.data));
  };

  useEffect(() => {
    getVideos();
  }, []);

  function orderVideos(videos: IVideo[]) {
    return videos
      .map((video: IVideo) => {
        return {
          ...video,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  return (
    <div>
      <div className="row">
        {videos?.map((video: IVideo) => {
          return <Video key={video._id} video={video} getVideos={getVideos} />;
        })}
      </div>
    </div>
  );
};
