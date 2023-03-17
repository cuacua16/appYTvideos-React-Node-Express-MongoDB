import { RequestHandler } from "express";
import mongoose, { isValidObjectId } from "mongoose";
import Video from "./Video";

export const getVideos: RequestHandler = async (req, res) => {
  const videos = await Video.find();
  res.json(videos);
};

export const getVideo: RequestHandler = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ message: "Video not found" });
  res.json(video);
};
export const createVideo: RequestHandler = async (req, res) => {
  const videoFound = await Video.findOne({ url: req.body.url });
  if (videoFound) return res.status(301).json({ message: "The url already exists" });
  const video = new Video(req.body);
  console.log(video);
  const savedVideo = await video.save();
  res.json(savedVideo);
};

export const updateVideo: RequestHandler = async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true }); // {new:true} para que retorne el objeto actualizado, no el previo
  if (!video) return res.status(404).json({ message: "Video not found" });
  res.json(video);
  // const videoUpdated = await Video.findById(req.params.id);
};

export const deleteVideo: RequestHandler = async (req, res) => {
  const video = await Video.findByIdAndDelete(req.params.id);
  if (!video) return res.status(404).json({ message: "Video not found" });
  res.json("video deleted");
};
