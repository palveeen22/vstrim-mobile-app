import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreen } from '../screens/AuthScreen';
import { OtpScreen } from '../screens/OtpScreen';
import { SetupProfileScreen } from '../screens/SetupProfileScreen';

export type AuthStackParamList = {
  PhoneScreen: undefined;
  OtpScreen: {
    phone: string;
    method: 'telegram' | 'sms';
    isNewUser: boolean;
  };
  SetupProfileScreen: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();


export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="PhoneScreen" component={AuthScreen} />
      <AuthStack.Screen name="OtpScreen" component={OtpScreen} />
      <AuthStack.Screen name="SetupProfileScreen" component={SetupProfileScreen} />
    </AuthStack.Navigator>
  );
}