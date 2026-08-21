import { type Request, type Response } from "express";

import { type UserWithoutId } from "../models/user.model.ts";
import { AuthService } from "../services/auth.service.ts";

const validateCredentials = (body: unknown): UserWithoutId | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const { email, password } = body as Partial<UserWithoutId>;

  if (typeof email !== "string" || email.trim() === "") {
    return null;
  }
  if (typeof password !== "string" || password.trim() === "") {
    return null;
  }

  return { email, password };
};

export class AuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    const credentials = validateCredentials(req.body);
    if (credentials === null) {
      res.status(400).json({ message: "email and password are required" });
      return;
    }
    try {
      const user = await this.authService.register(credentials);
      res.status(201).json(user);
    } catch (error) {
      res.status(409).json({ message: (error as Error).message });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const credentials = validateCredentials(req.body);
    if (credentials === null) {
      res.status(400).json({ message: "email and password are required" });
      return;
    }
    const token = await this.authService.login(credentials);
    if (!token) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    res.json({ token });
  };
}
