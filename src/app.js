const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

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



  const Repositorie =
  {
    id: uuid(),
    title,
    url,
    techs,
    likes: "0"
  }

  if (!isUuid)
    return response.json({ "error: ": "ID not found." })

  repositories.push(Repositorie);
  return response.json(Repositorie);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const reposIndex = repositories.findIndex((repo) => repo.id === id);

  if (reposIndex < 0)
    return response.json({ "error: ": "ID not found" })

  const likes = repositories[reposIndex].likes;
  console.log("tantoLikes: " + likes);

  const nRepos = {
    id,
    title,
    url,
    techs,
    likes
  }
  repositories[reposIndex] = nRepos;
  return response.json({ nRepos })
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const reposIndex = repositories.findIndex((repo) => repo.id === id);

  if (reposIndex < 0)
    return response.json({ "error: ": "ID not found" })

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;