import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IVideo } from "../../models/IVideo";
import * as videoService from "../../services/VideoService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type InputChange = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

export const VideoEditForm = () => {
  const [video, setVideo] = useState<IVideo>({} as IVideo);
  const navigate = useNavigate();
  const params = useParams();

  const getVideo = async () => {
    if (params.id) {
      const res = await videoService.getVideo(params.id);
      setVideo(res.data);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  const handleInputChange = (event: InputChange) => {
    setVideo({
      ...video,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (video.url.indexOf("&")) video.url = video.url.split("&")[0];
    const res = await videoService.updateVideo(video);
    console.log(res);
    toast.success("Cambios guardados exitosamente", {
      position: "bottom-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    return navigate("/");
  };

  return (
    <div className="row">
      <div className="col-8 offset-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="card">
          <div className="card-body">
            <h3>Editar video</h3>
            <form className="p-2 d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Ponele un título al video"
                  className="form-control"
                  autoFocus
                  onChange={handleInputChange}
                  value={video.title}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="https://www.youtube.com/example"
                  className="form-control"
                  onChange={handleInputChange}
                  value={video.url}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  placeholder="Escribe una descripción para el video"
                  className="form-control"
                  rows={3}
                  onChange={handleInputChange}
                  value={video.description}
                ></textarea>
              </div>
              <div className="form-group d-flex justify-content-end">
                <button className={"btn btn-primary " + (video._id ? "" : "disabled")}>
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
        {!video._id && (
          <div>
            <p style={{ color: "tomato" }}>Error al identificar el video</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
