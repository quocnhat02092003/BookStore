export type UserType = {
  data: {
    id: string;
    fullName: string;
    email: string;
    role: string;
    status: string;
  }[];
  message?: string;
  status?: number;
};
