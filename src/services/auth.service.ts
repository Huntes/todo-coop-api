import prisma from "../config/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../config/env";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export async function registerUser(input: RegisterInput) {
  // verifica se já existe usuário com mesmo e-mail
  const existing = await prisma.user.findUnique({ where: { email: input.email } });
  if (existing) {
    throw new Error("Email já está em uso.");
  }
  // gera hash da senha
  const hashedPassword = await bcrypt.hash(input.password, 10);
  // cria usuário no DB
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: hashedPassword,
    },
  });
  return user;
}

interface AuthenticateInput {
  email: string;
  password: string;
}

export async function authenticateUser(input: AuthenticateInput) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) throw new Error("Credenciais inválidas.");
  const isValid = await bcrypt.compare(input.password, user.password);
  if (!isValid) throw new Error("Credenciais inválidas.");
  // gera token JWT
  const token = jwt.sign({ userId: user.id }, env.jwtSecret, { expiresIn: "1h" });
  return token;
}
