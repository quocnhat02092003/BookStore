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
