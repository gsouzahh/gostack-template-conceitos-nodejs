const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');
// const { parse } = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {
    title,
    url,
    techs,
  } = request.body;
  const id = uuid();
  // const likes = "0"
  const likes = 0
  const Repositorie =
  {
    id,
    title,
    url,
    techs,
    likes
  }

  if (!isUuid(id))
    return response.status(400).json({ error: "ID not found" })

  repositories.push(Repositorie);

  console.log(likes);
  return response.json(Repositorie);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const reposIndex = repositories.findIndex((repo) => repo.id === id);

  if (reposIndex < 0)
    return response.status(400).json({ error: "ID not found" })

  const likes = repositories[reposIndex].likes;

  const nRepos = {
    id,
    title,
    url,
    techs,
    likes
  }
  repositories[reposIndex] = nRepos;
  // return response.json({ nRepos })
  return response.json(repositories[reposIndex])
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const reposIndex = repositories.findIndex((repo) => repo.id === id);

  if (reposIndex < 0)
    return response.status(400).send({ error: "ID not found" })

  repositories.splice(reposIndex, 1);

  return response.status(204).send()
});

// app.post("/repositories/:id/likes", (request, response) => {
app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const reposIndex = repositories.findIndex((repo) => repo.id === id);

  if (reposIndex < 0)
    return response.status(400).json({ error: "ID not found" })

  const { title, url, techs } = repositories[reposIndex];

  let sumLike = parseInt(repositories[reposIndex].likes++);
  sumLike++;
  // likes = sumLike.toString()
  likes = sumLike;
  
  const newObj = {
    id,
    title,
    url,
    techs,
    likes
  }
  
  repositories[reposIndex] = newObj;
  console.log(likes);
  // return response.json(repositories[reposIndex])
  return response.json(repositories[reposIndex])
});


module.exports = app;