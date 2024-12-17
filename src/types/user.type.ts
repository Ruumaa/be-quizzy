import { Request } from 'express';

export interface User {
  id: string;
  username: string;
  password: string;
  high_score?: number;
}

export interface UserLogin {
  id?: string;
  username: string;
}

export interface UserData {
  id: string;
  username: string;
}

export interface ValidationRequest extends Request {
  userData: UserData;
}
