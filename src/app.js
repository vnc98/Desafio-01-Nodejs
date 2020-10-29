const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
	response.json(repositories)
});

app.post("/repositories", (request, response) => {
	const likes = 0
	const id = uuid();

	const { title, url, techs} = request.body;
	
	const repositorie = {id, title, url, techs, likes};

	repositories.push(repositorie);

	response.json(repositorie);
});

app.put("/repositories/:id",(request, response) => {
	const {id} = request.params;
	
	const {title, url, techs} = request.body;

	const repositoriIndex = repositories.findIndex(repositorie => repositorie.id === id);
	
	if (repositoriIndex === -1) {
		return response.status(400).json({error: "Repositorie not found"})
	}

		const newRepositorie = {id,title,url,techs,likes: repositories[repositoriIndex].likes}
		repositories[repositoriIndex] = newRepositorie;

		return response.json(newRepositorie)
});

app.delete("/repositories/:id", (request, response) => {
	const {id} = request.params;
	
	const repositoriIndex = repositories.findIndex(repositorie => repositorie.id === id);
	
	if (repositoriIndex === -1) {
		return response.status(400).json({error: "Repositorie not found"})
	}

	repositories.splice(repositoriIndex,1);

	return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
	   const {id} = request.params;
	   
	   const repositoriIndex = repositories.findIndex(repositorie => repositorie.id === id);
	
	   if (repositoriIndex === -1) {
		   return response.status(400).json({error: "Repositorie not found"})
	   }

		repositories[repositoriIndex].likes += 1;

		const {likes} = repositories;

		response.json({likes: repositories[0].likes})
   
});

module.exports = app;
