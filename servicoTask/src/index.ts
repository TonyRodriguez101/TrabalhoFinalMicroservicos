import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

// importar services
import { CreateTaskService } from "./services/CreateTaskService";
import { ListTasksService } from "./services/ListTasksService";
import { UpdateTaskDetailsService } from "./services/UpdateTaskDetailsService";
import { UpdateTaskStatusService } from "./services/UpdateTaskStatusService";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Configurar acesso a rota por diferentes origens
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para fazer o parsing do corpo das requisições como JSON
app.use(express.json());

// Sincronizar o modelo com o banco de dados
// (async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log("Tabela criada com sucesso!");
//   } catch (error) {
//     console.error("Erro ao sincronizar o modelo com o banco de dados:", error);
//   }
// })();

// Definição de rotas e instancias de classes
app.post("/task", new CreateTaskService().handle);
app.get("/task", new ListTasksService().handle);
app.put("/task", new UpdateTaskDetailsService().handle);
app.put("/status", new UpdateTaskStatusService().handle);

console.log("Porta: ", port);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
