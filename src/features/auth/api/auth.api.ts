import { apiClient } from '@/shared/api/client';
import type { SendOtpResponse, VerifyOtpResponse, User } from '../types/auth.types';

export const authApi = {
  sendOtp: (phone: string) =>
    apiClient.post<SendOtpResponse>('/auth/send-otp', { phone }).then((r) => r.data),

  verifyOtp: (phone: string, otp: string) =>
    apiClient.post<VerifyOtpResponse>('/auth/verify-otp', { phone, otp }).then((r) => r.data),

  setupProfile: (data: {
    displayName: string;
    username: string;
    avatarMediaId?: string;
  }) =>
    apiClient.post<User>('/auth/setup-profile', data).then((r) => r.data),

  refresh: (refreshToken: string) =>
    apiClient.post<{ accessToken: string; refreshToken: string }>('/auth/refresh', { refreshToken }).then((r) => r.data),

  logout: () => apiClient.post('/auth/logout'),
};
