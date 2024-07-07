type User = {
  id: string;
  email: string;
  role: string;
};

export interface IRequestWithUser extends Request {
  user: User;
}
