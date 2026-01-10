export interface employee {
  id: string,
  name: string,
  email: string,
  dob: string,
  status: boolean,
  department: string,
  imageUrl: string
}

export interface paginationOutput {
  first?: number;
  rows?: number;
  pageSize?: number;
  currentPage?: number;
}

export interface Department {
    name: string;
    code: string;
}

export interface User {
  id: string;
  email: string;
  password: string;  // Plain text for demo (hash in production)
  role: 'admin' | 'subadmin';
  name: string;
}

export const STATIC_USERS: User[] = [
  {
    id: '1',
    email: 'admin@yopmail.com',
    password: 'Test@123',
    role: 'admin',
    name: 'Super Admin'
  },
  {
    id: '2',
    email: 'subadmin@yopmail.com',
    password: 'Test@123',
    role: 'subadmin',
    name: 'Manager'
  }
];