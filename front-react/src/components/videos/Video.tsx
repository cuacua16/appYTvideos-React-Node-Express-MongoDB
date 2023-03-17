import { IVideo } from "../../models/IVideo";
import { useNavigate } from "react-router-dom";
import * as videoService from "../../services/VideoService";

interface Props {
  video: IVideo;
  getVideos: () => void;
}

export const Video = ({ video, getVideos }: Props) => {
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    await videoService.deleteVideo(id);
    getVideos();
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card card-body video-card">
        <div className="d-flex justify-content-between align-items-center">
          <h5>{video.title}</h5>
          <button
            title="Eliminar video"
            className="btn btn-sm btn-warning px-2 py-0"
            onClick={() => video._id && handleDelete(video._id)}
          >
            x
          </button>
        </div>
        <div className="ratio ratio-16x9">
          <iframe
            src={video.url.replace("watch?v=", "embed/")}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ borderRadius: "2%" }}
          ></iframe>
        </div>
        <p>{video.description}</p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-danger justify-self-end"
            onClick={() => navigate("/edit/" + video._id)}
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};
