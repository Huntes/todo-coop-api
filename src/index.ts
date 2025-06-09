import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import env from "./config/env";
import authRoutes from "./routes/auth.routes";
//import taskListRoutes from "./routes/taskList.routes";
//import taskRoutes from "./routes/task.routes";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
//app.use("/lists", taskListRoutes);

// As rotas de tarefa ficarão dentro de /lists/:listId/tasks
//app.use("/lists/:listId/tasks", taskRoutes);

// Middleware de erro genérico (opcional)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno no servidor." });
});

app.listen(env.port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${env.port}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
})