import connectToDatabase from "../config/db.js";

let cachedConnection = null;

async function dbInstance(collectionName) {
  if (!cachedConnection) {
    // Apenas cria a conexão se ainda não houver uma existente
    cachedConnection = await connectToDatabase(
      process.env.DB_CONNECTION_STRING
    );
  }

  const db = cachedConnection.db("imersão-gemini-alura");
  const collection = db.collection(collectionName);

  return collection;
}

export async function getAllPosts() {
  const connection = await dbInstance("posts");
  return connection.find().toArray();
}

export async function createNewPost(post) {
  const connection = await dbInstance("posts");
  return connection.insertOne(post);
}
