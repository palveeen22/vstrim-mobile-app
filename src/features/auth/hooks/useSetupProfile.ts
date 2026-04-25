import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAppDispatch } from '@/shared/store/hooks';
import { setUser } from '../store/authUser.slice';

export function useSetupProfile() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authApi.setupProfile,
    onSuccess: (user) => {
      dispatch(setUser(user));
    },
  });
}
