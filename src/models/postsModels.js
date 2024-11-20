import connectToDatabase from "../config/db.js";

export async function getAllPosts() {
  const conexao = await connectToDatabase(process.env.DB_CONNECTION_STRING);

  const db = conexao.db("imersão-gemini-alura");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}
