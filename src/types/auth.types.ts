export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message?: string;
  requiresTwoFactor?: boolean;
  requiresTwoFactorSetup?: boolean;
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type ChangeEmailRequest = {
  newEmail: string;
  password: string;
};

export type UpdateProfileRequest = {
  firstName: string;
  lastName: string;
};

export type MessageResponse = {
  message: string;
};

export type VerifyOtpRequest = {
  token: string;
};

export type DisableTwoFactorRequest = {
  password: string;
  token: string;
};

export type TwoFactorSetupResponse = {
  qrCodeUrl: string;
  secret: string;
};

export type UserProfile = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  isTwoFactorEnabled: boolean;
  mustSetupTwoFactor: boolean;
  mustChangePassword: boolean;
  role: {
    id: string;
    name: string;
    permissions: string[];
    requiresTwoFactor: boolean;
  } | null;
  createdAt: string;
};
