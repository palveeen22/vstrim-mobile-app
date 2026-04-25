import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../screens/MapScreen';
import { PlaceDetailScreen, AddPlaceScreen } from '@/features/place';
import { WriteReviewScreen, DiscussionScreen } from '@/features/review';

export type MapStackParamList = {
  MapScreen: undefined;
  PlaceDetailScreen: { placeId: string };
  WriteReviewScreen: { placeId: string; placeName: string };
  DiscussionScreen: { reviewId: string; placeId: string };
  AddPlaceScreen: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

export function MapStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen} />
      <Stack.Screen name="WriteReviewScreen" component={WriteReviewScreen} />
      <Stack.Screen name="DiscussionScreen" component={DiscussionScreen} />
      <Stack.Screen
        name="AddPlaceScreen"
        component={AddPlaceScreen}
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
