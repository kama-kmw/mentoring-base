export interface EditUser {
  id: number;
  name: string;
  email: string;
  website: string;
  company: {
    name: string;
  };
}
