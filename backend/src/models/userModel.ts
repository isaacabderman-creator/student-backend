interface UserWithoutId {
  email: string;
  password: string;
}
interface User extends UserWithoutId {
  id: number;
}

export type { User, UserWithoutId };
