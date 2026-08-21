import {
  type Student,
  type StudentWithoutId,
} from "../models/studentModel.ts";
import { StudentRepository } from "../repositories/studentsRepositories.ts";

export class StudentService {
  private readonly studentRepository: StudentRepository;
  constructor() {
    this.studentRepository = new StudentRepository();
  }
  getAllStudents = async (): Promise<Student[]> => {
    return this.studentRepository.findAll();
  };

  getStudentById = async (id: number): Promise<Student | null> => {
    return this.studentRepository.findById(id);
  };

  createStudent = async (student: StudentWithoutId): Promise<Student> => {
    return this.studentRepository.create(student);
  };

  updateStudent = async (
    id: number,
    student: StudentWithoutId,
  ): Promise<Student | null> => {
    return this.studentRepository.update(id, student);
  };

  deleteStudent = async (id: number): Promise<boolean> => {
    return this.studentRepository.remove(id);
  };
}
