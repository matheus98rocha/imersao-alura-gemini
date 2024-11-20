import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api", (req, res) => {
  res.status(200).send({ message: "Hello World" });
});
