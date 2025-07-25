import express from "express";
import { addMovie, getAllMovies, getMovieById } from "../controller/movie-controller.js";
import { deleteMovie } from "../controller/movie-controller.js";

const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);

movieRouter.delete("/:id", deleteMovie);

export default movieRouter;