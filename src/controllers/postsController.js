import { getAllPosts } from "../models/postsModels.js";

export async function getAllPostsController(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}
