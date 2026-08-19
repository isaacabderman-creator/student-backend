import { type Request, type Response } from "express";

import { type StudentWithoutId } from "../models/student.model.ts";
import  { StudentService } from "../services/students.service.ts";

const parseId = (value: unknown): number | null => {
  if (typeof value !== "string") {
    return null;
  }
  const id = Number(value);
  return Number.isNaN(id) ? null : id;
};

const validateBody = (body: unknown): StudentWithoutId | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const { name, email } = body as Partial<StudentWithoutId>;

  if (typeof name !== "string" || name.trim() === "") {
    return null;
  }
  if (typeof email !== "string" || email.trim() === "") {
    return null;
  }

  return { name, email };
};

export class StudentController {
  private readonly studentService: StudentService;
  constructor() {
    this.studentService = new StudentService();
  }
  getStudents = async (_req: Request, res: Response): Promise<void> => {
    const students = await this.studentService.getAllStudents();
    res.json(students);
  };

  getStudent = async (req: Request, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) {
      res.status(400).json({ message: "Invalid student id" });
      return;
    }
    const student = await this.studentService.getStudentById(id);
    if (!student) {
      res.status(404).json({ message: `Student with id ${id} not found` });
      return;
    }
    res.json(student);
  };

  createStudent = async (req: Request, res: Response): Promise<void> => {
    const input = validateBody(req.body);
    if (input === null) {
      res.status(400).json({ message: "name and email are required" });
      return;
    }
    const student = await this.studentService.createStudent(input);
    res.status(201).json(student);
  };

  updateStudent = async (req: Request, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) {
      res.status(400).json({ message: "Invalid student id" });
      return;
    }
    const input = validateBody(req.body);
    if (input === null) {
      res.status(400).json({ message: "name and email are required" });
      return;
    }
    const student = await this.studentService.updateStudent(id, input);
    if (!student) {
      res.status(404).json({ message: `Student with id ${id} not found` });
      return;
    }
    res.json(student);
  };

  deleteStudent = async (req: Request, res: Response): Promise<void> => {
    const id = parseId(req.params.id);
    if (id === null) {
      res.status(400).json({ message: "Invalid student id" });
      return;
    }
    const deleted = await this.studentService.deleteStudent(id);
    if (!deleted) {
      res.status(404).json({ message: `Student with id ${id} not found` });
      return;
    }
    res.status(204).send();
  };
}
