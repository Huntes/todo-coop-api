import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT = process.env.PORT || "4000";
const DATABASE_URL = process.env.DATABASE_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

if (!DATABASE_URL) throw new Error("DATABASE_URL não definida em .env");
if (!JWT_SECRET) throw new Error("JWT_SECRET não definida em .env");

export default {
  port: parseInt(PORT, 10),
  databaseUrl: DATABASE_URL,
  jwtSecret: JWT_SECRET,
};
