import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';

export function useSendOtp() {
  return useMutation({
    mutationFn: (phone: string) => authApi.sendOtp(phone),
  });
}
