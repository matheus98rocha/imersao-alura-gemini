import express from "express";
import { getAllPostsController } from "../controllers/postsController.js";

const routes = (app) => {
  app.use(express.json());

  app.get("/posts", getAllPostsController);
};

export default routes;
