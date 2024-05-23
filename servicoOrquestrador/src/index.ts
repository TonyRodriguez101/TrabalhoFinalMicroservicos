import express, { Express } from "express";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import dotenv from "dotenv";
import cors from "cors";

// importar controllers

// User controllers
import { AuthUserController } from "./services/User/AuthUserController";
import { CreateUserController } from "./services/User/CreateUserController";
import { UpdateUserController } from "./services/User/UpdateUserController";
import { DetailsUserController } from "./services/User/DetailsUserController";

// Task controllers
import { CreateTaskController } from "./services/Task/CreateTaskController";
import { ListTasksController } from "./services/Task/ListTasksController";
import { UpdateTaskDetailsController } from "./services/Task/UpdateTaskDetailsController";
import { UpdateTaskStatusController } from "./services/Task/UpdateTaskStatusController";

import axios from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Configurar acesso a rota por diferentes origens
app.use(cors());

// Middleware para fazer o parsing do corpo das requisições como JSON
app.use(express.json());

// Definição de rotas e instancias de classes
// Orquestração serviços User
app.post("/user/auth", new AuthUserController().handle);
app.post("/user/signup", new CreateUserController().handle);
app.put("/user/update", isAuthenticated, new UpdateUserController().handle);
app.get("/user/user", isAuthenticated, new DetailsUserController().handle);

// Orquestração serviços Task
app.post("/task/task", isAuthenticated, new CreateTaskController().handle);
app.get("/task/task", isAuthenticated, new ListTasksController().handle);
app.put("/task/task", isAuthenticated, new UpdateTaskDetailsController().handle);
app.put("/task/status", isAuthenticated, new UpdateTaskStatusController().handle);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
