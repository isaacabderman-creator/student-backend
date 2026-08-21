import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/auth.config.ts";
import { type UserWithoutId } from "../models/user.model.ts";
import { UserRepository } from "../repositories/users.repositories.ts";

const SALT_ROUNDS = 10;

export class AuthService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  register = async (
    credentials: UserWithoutId,
  ): Promise<{ id: number; email: string }> => {
    const existing = await this.userRepository.findByEmail(credentials.email);
    if (existing) {
      throw new Error("Email already registered");
    }
    const hashedPassword = await bcrypt.hash(credentials.password, SALT_ROUNDS);
    const user = await this.userRepository.create({
      email: credentials.email,
      password: hashedPassword,
    });
    return { id: user.id, email: user.email };
  };

  login = async (credentials: UserWithoutId): Promise<string | null> => {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user) {
      return null;
    }
    const isValid = await bcrypt.compare(credentials.password, user.password);
    if (!isValid) {
      return null;
    }
    return jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  };
}
