import { type User, type UserWithoutId } from "../models/user.model.ts";

import { pool } from "../config/students.config.ts";

export class UserRepository {
  findByEmail = async (email: string): Promise<User | null> => {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await pool.query(query, [email]);
    return rows[0] || null;
  };

  create = async (user: UserWithoutId): Promise<User> => {
    const query =
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *";
    const values = [user.email, user.password];
    const { rows } = await pool.query(query, values);
    return rows[0];
  };
}
