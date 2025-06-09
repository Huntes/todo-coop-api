"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = __importDefault(require("./config/env"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
//import taskListRoutes from "./routes/taskList.routes";
//import taskRoutes from "./routes/task.routes";
const app = (0, express_1.default)();
// Middlewares globais
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use("/auth", auth_routes_1.default);
//app.use("/lists", taskListRoutes);
// As rotas de tarefa ficarão dentro de /lists/:listId/tasks
//app.use("/lists/:listId/tasks", taskRoutes);
// Middleware de erro genérico (opcional)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Erro interno no servidor." });
});
app.listen(env_1.default.port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${env_1.default.port}`);
});
