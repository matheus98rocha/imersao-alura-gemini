import fs from "fs";
import { createNewPost, getAllPosts } from "../models/postsModels.js";

export async function getAllPostsController(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

export async function postNewPost(req, res) {
  const newPost = req.body;

  try {
    const result = await createNewPost(newPost);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocorreu um erro ao criar o post.",
    });
  }
}

export async function uploadImage(req, res) {
  req;
  const newPost = {
    descricao: "",
    imgUrl: `${req.file.originalname}`,
    altImg: "",
  };

  try {
    const result = await createNewPost(newPost);
    const updatedImage = `uploads/${result.insertedId}.png`;

    fs.renameSync(req.file.path, updatedImage);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ocorreu um erro ao criar o post.",
    });
  }
}
