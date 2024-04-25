export interface UserAccountInfo {
  id: string;
  nickname: string;
  email: string;
  phone: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isBlocked: boolean;
  roles: string[];
  createdDate: Date;
}
