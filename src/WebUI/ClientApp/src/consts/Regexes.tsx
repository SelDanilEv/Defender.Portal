// GUID
export const GuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
export const GuidMaskRegex =
  /^[0-9a-fA-F]{0,8}-?[0-9a-fA-F]{0,4}-?[0-9a-fA-F]{0,4}-?[0-9a-fA-F]{0,4}-?[0-9a-fA-F]{0,12}$/i;

// Number
export const NumberMaskRegex = /^\d+$/;

// Password
export const PasswordRegex = /^\S{5,32}$/;
export const PasswordMaskRegex = /^[A-Za-z\d@_$!%*?&]{0,32}$/;

// Currency Amount
export const CurrencyAmountMaskRegex = /^\d*(\.\d{0,2})?$/;

// Email
export const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const EmailMaskRegex =
  /^[a-zA-Z0-9._%+-]*(@[a-zA-Z0-9.-]*\.?[a-zA-Z]{0,})?$/;

// Wallet Number
export const WalletNumberRegex = /^\d{8}$/;
export const WalletNumberMaskRegex = /^\d{0,8}$/;

// Phone Number
export const PhoneNumberRegex = /^\+\d{1,3}\d{10,15}$/;
export const PhoneNumberMaskRegex = /^\+\d{0,3}(\d{0,15})?$/;

// User Nickname
export const UserNicknameRegex = /^[a-zA-Z0-9_!@#$%^&*-+]{3,32}$/;
