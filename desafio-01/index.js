const express = require("express");

const server = express();

//Faz o server aceitar um body do tipo .json
server.use(express.json());

//Checa se existe um projeto com o id da rota
const checkId = (req, res, next) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex < 0) {
    return res.status(400).json({
      error: "ID não encontrado.",
    });
  }
  next();
};

let count = 1;

//Conta o total de requisições feitas
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}; TOTAL: ${count}`);
  count++;
  next();
});

//Armazena os projetos do server
//Formato do projeto: { id: "1", title: 'Novo projeto', tasks: [] }
const projects = [];

//Lista todos os projetos armazenados
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Adiciona um projeto à lista de projetos
server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: [],
  });

  return res.json({
    message: "Projeto foi adicionado.",
  });
});

//Altera o título do projeto com o id na rota
server.put("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;
  const title = req.body.title;

  const projectIndex = projects.findIndex((project) => project.id === id);

  const { tasks } = projects[projectIndex];
  const updatedProject = {
    id,
    title,
    tasks,
  };

  projects[projectIndex] = updatedProject;

  return res.json({
    message: "Projeto foi atualizado.",
  });
});

//Deleta o projeto com o id na rota
server.delete("/projects/:id", checkId, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex((project) => project.id === id);
  console.log();
  projects.splice(projectIndex, 1);
  console.log(projects);
  return res.json({
    message: "Projeto apagado com sucesso.",
  });
});

//Adiciona uma nova tarefa ao projeto com o id na rota
server.post("/projects/:id/tasks", checkId, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  //Acha o index do projeto na lista de projetos
  const projectIndex = projects.findIndex((project) => project.id === id);

  //Adiciona uma nova tarefa ao projeto selecionado
  projects[projectIndex].tasks.push(title);

  return res.json({
    message: "A tarefa foi adicionada ao projeto.",
  });
});
//Recebe requests na porta 4000
server.listen("3888");
