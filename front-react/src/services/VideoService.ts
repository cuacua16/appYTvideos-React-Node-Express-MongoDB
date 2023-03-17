import axios from "axios";
import { IVideo } from "../models/IVideo";

const URL = "http://localhost:3000/videos/";

export const getVideos = async () => {
  return await axios.get<IVideo[]>(URL);
};

export const getVideo = async (id: string) => {
  return await axios.get<IVideo>(URL + id);
};

export const createVideo = async (video: IVideo) => {
  return await axios.post(URL, video);
};

export const updateVideo = async (video: IVideo) => {
  return await axios.put(URL + video._id, video);
};

export const deleteVideo = async (id: string) => {
  return await axios.delete<IVideo>(URL + id);
};
