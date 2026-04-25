import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAppDispatch } from '@/shared/store/hooks';
import { setTokens } from '../store/authToken.slice';
import { setUser } from '../store/authUser.slice';

export function useVerifyOtp() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: ({ phone, otp }: { phone: string; otp: string }) =>
      authApi.verifyOtp(phone, otp),
    onSuccess: (data) => {
      dispatch(setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken }));
      if (!data.isNewUser) {
        dispatch(setUser(data.user));
      }
    },
  });
}
