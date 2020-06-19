import { Router } from "express";
//Importar controllers abaixo
import SessionController from "./app/controllers/SessionController";
import RecipientController from "./app/controllers/RecipientController";

//importar middlewares abaixo
import auth from "./app/middlewares/auth";

const routes = new Router();

//Rotas
routes.post("/session", SessionController.store);

//Todos as rotas abaixo usam authentication
routes.use(auth);

//Rotas com autenticação
routes.get("/recipient", RecipientController.store);

export default routes;
