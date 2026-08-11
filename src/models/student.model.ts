interface StudentWithoutId {
  name: string;
  email: string;
}
interface Student extends StudentWithoutId {
  id: number;
}

export type { Student, StudentWithoutId };
