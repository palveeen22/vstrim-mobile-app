import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '@/shared/store/hooks';
import { selectIsLoggedIn } from '@/features/auth/store/auth.selectors';
import { AuthStackNavigator } from '@/features/auth';
import { AppTabNavigator } from './AppTabNavigator';

export function RootNavigator() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <NavigationContainer>
      {/* {isLoggedIn ? <AppTabNavigator /> : <AuthStackNavigator />} */}
      <AppTabNavigator /> 
    </NavigationContainer>
  );
}
