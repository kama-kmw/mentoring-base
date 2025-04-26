export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suit: string;
    city: string;
  };
}
