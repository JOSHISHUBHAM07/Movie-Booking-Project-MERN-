import express from "express";
import { addShow, searchMovies } from "../controllers/showController.js";

const showRouter = express.Router();

// OMDb movie search
showRouter.get("/search", searchMovies);

// Add show (admin)
showRouter.post("/add", addShow);

export default showRouter;
