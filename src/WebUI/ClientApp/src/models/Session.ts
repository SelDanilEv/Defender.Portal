import { UserAccountInfo } from "./UserAccountInfo";

export interface Session {
  user: UserAccountInfo;
  language: string;
  isAuthenticated:boolean;
  token:string;
}

