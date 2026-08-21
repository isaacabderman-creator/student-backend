import {
  type Student,
  type StudentWithoutId,
} from "../models/studentModel.ts";

import { pool } from "../config/studentsConfig.ts";

export class StudentRepository {
  findAll = async (): Promise<Student[]> => {
    const query = "SELECT * FROM students";
    const { rows } = await pool.query(query);
    return rows;
  };

  findById = async (id: number): Promise<Student | null> => {
    const query = "SELECT * FROM students WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  };

  create = async (student: StudentWithoutId): Promise<Student> => {
    const query =
      "INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *";
    const values = [student.name, student.email];
    const { rows } = await pool.query(query, values);
    return rows[0];
  };

  update = async (
    id: number,
    student: StudentWithoutId,
  ): Promise<Student | null> => {
    const query =
      "UPDATE students SET name = $1, email = $2 WHERE id = $3 RETURNING *";
    const values = [student.name, student.email, id];
    const { rows } = await pool.query(query, values);
    return rows[0] || null;
  };

  remove = async (id: number): Promise<boolean> => {
    const query = "DELETE FROM students WHERE id = $1";
    const result = await pool.query(query, [id]);
    return (result.rowCount ?? 0) > 0;
  };
}
