export interface User {
  id: string;
  phone: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  isProfileComplete: boolean;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface SendOtpResponse {
  method: 'telegram' | 'sms';
  isNewUser: boolean;
}

export interface VerifyOtpResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
}
