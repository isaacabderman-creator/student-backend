import { type Student, type StudentWithoutId } from "../models/student.model.ts";
import * as studentRepository from "../repositories/students.repositories.ts";

export const getAllStudents = async (): Promise<Student[]> => {
  return studentRepository.findAll();
};

export const getStudentById = async (id: number): Promise<Student | null> => {
  return studentRepository.findById(id);
};

export const createStudent = async (student: StudentWithoutId): Promise<Student> => {
  return studentRepository.create(student);
};

export const updateStudent = async (
  id: number,
  student: StudentWithoutId,
): Promise<Student | null> => {
  return studentRepository.update(id, student);
};

export const deleteStudent = async (id: number): Promise<boolean> => {
  return studentRepository.remove(id);
};
