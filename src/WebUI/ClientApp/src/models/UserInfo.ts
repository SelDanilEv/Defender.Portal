export interface UserInfo {
  id: string;
  nickname: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  roles: string[];
  createdDate: Date;
}
