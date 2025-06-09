"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
const PORT = process.env.PORT || "4000";
const DATABASE_URL = process.env.DATABASE_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";
if (!DATABASE_URL)
    throw new Error("DATABASE_URL não definida em .env");
if (!JWT_SECRET)
    throw new Error("JWT_SECRET não definida em .env");
exports.default = {
    port: parseInt(PORT, 10),
    databaseUrl: DATABASE_URL,
    jwtSecret: JWT_SECRET,
};
