export interface SendResetPasswordCodeRequest {
  email: string;
}

export interface ResetPasswordRequest {
  userId: string;
  newPassword: string;
  code: number;
}
