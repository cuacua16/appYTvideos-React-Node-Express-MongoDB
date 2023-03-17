import { Router } from "express";
import * as VideoController from "./videos.controller";

const router = Router();

router.get("/videos", VideoController.getVideos);

router.get("/videos/:id", VideoController.getVideo);

router.post("/videos", VideoController.createVideo);

router.put("/videos/:id", VideoController.updateVideo);

router.delete("/videos/:id", VideoController.deleteVideo);

export default router;
