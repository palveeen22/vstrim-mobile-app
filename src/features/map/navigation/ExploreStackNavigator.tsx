import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExploreScreen } from '../screens/ExploreScreen';


export type ExploreStackParamList = {
  ExploreScreen: undefined;
};

const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();


export function ExploreStackNavigator() {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="ExploreScreen" component={ExploreScreen} />
    </ExploreStack.Navigator>
  );
}