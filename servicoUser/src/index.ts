import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

// importar services
import { AuthUserService } from "../services/AuthUserService";
import { CreateUserService } from "../services/CreateUserService";
import { UpdateUserService } from "../services/UpdateUserService";
import { DetailsUserService } from "../services/DetailsUserService";

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
// Efetuar login
app.post("/auth", new AuthUserService().handle);
app.post("/signup", new CreateUserService().handle);
app.put("/update", new UpdateUserService().handle);
app.get("/user", new DetailsUserService().handle);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
