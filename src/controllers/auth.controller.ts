import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
    const user = await authService.registerUser({ name, email, password });
    res.status(201).json({ id: user.id, email: user.email });
    return;
  } catch (err: any) {
    res.status(400).json({ message: err.message });
    return;
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await authService.authenticateUser({ email, password });
    res.json({ token });
    return;
  } catch (err: any) {
    res.status(401).json({ message: err.message });
    return;
  }
}
