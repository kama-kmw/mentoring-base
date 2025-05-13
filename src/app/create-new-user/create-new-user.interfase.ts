export interface CreateUser {
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}
