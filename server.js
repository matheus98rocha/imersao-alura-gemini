import express from "express";

const posts = [
  {
    id: 1,
    description: "Primeiro post",
    image: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    description: "Segundo post: Um gato muito fofo!",
    image: "https://placekitten.com/200/300",
  },
  {
    id: 3,
    description: "Terceiro post: Gato curioso",
    image: "https://placekitten.com/400/200",
  },
  {
    id: 4,
    description: "Quarto post: Hora da soneca",
    image: "https://placekitten.com/300/200",
  },
  {
    id: 5,
    description: "Quinto post: Gato brincando com um novelo de lã",
    image: "https://placekitten.com/200/200",
  },
  {
    id: 6,
    description: "Sexto post: Um gato olhando pela janela",
    image: "https://placekitten.com/300/300",
  },
];

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

function getPostById(id) {
  try {
    const post = posts.find((post) => post.id === Number(id));
    return post;
  } catch (error) {
    throw error;
  }
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;

  try {
    const post = getPostById(id);
    if (!post) {
      return res.status(404).json({ message: `Post with ID ${id} not found` });
    }
    res.status(200).json(post);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid post ID or internal server error" });
  }
});
