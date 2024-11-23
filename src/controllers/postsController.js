import fs, { rmSync } from "fs";
import {
  createNewPost,
  getAllPosts,
  updateNewPost,
} from "../models/postsModels.js";
import generateDescriptionWithGemini from "../../services/geminiService.js";

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
  try {
    const newPost = {
      descricao: req.body.descricao,
      imgUrl: `${req.file.originalname}`,
      altImg: req.body.alt,
    };

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

export async function updateNewPostController(req, res) {
  const id = req.params.id;

  const urlImage = `http://localhost:3000/${id}.png`;

  const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
  const generateDescription = await generateDescriptionWithGemini(imgBuffer);

  const post = {
    imgUrl: urlImage,
    descricao: generateDescription,
    altImg: req.body.altImg,
  };

  try {
    const updatedPost = await updateNewPost(id, post);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(erro.message);
    res.status(500).json({
      message: "Ocorreu um erro ao atualizar o post.",
    });
  }
}
