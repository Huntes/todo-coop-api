"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = registerUser;
exports.authenticateUser = authenticateUser;
const database_1 = __importDefault(require("../config/database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
async function registerUser(input) {
    // verifica se já existe usuário com mesmo e-mail
    const existing = await database_1.default.user.findUnique({ where: { email: input.email } });
    if (existing) {
        throw new Error("Email já está em uso.");
    }
    // gera hash da senha
    const hashedPassword = await bcryptjs_1.default.hash(input.password, 10);
    // cria usuário no DB
    const user = await database_1.default.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashedPassword,
        },
    });
    return user;
}
async function authenticateUser(input) {
    const user = await database_1.default.user.findUnique({ where: { email: input.email } });
    if (!user)
        throw new Error("Credenciais inválidas.");
    const isValid = await bcryptjs_1.default.compare(input.password, user.password);
    if (!isValid)
        throw new Error("Credenciais inválidas.");
    // gera token JWT
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, env_1.default.jwtSecret, { expiresIn: "1h" });
    return token;
}
