import { UserInfo } from "./UserInfo";

export interface Session {
  user: UserInfo;
  language: string;
  isAuthenticated:boolean;
  token:string;
}

