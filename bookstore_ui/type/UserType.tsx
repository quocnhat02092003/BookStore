export type User = {
  id: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

export type RegisterResponse = {
  message: string;
  user: User;
};

export type LoginResponse = {
  message: string;
  user: User;
};

export type DataUserResponse = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  message: string;
  role: number;
};
