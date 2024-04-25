
export interface AdminUpdateAccountInfoRequest {
  userId: string;
  role: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  isBlocked: boolean;
}
