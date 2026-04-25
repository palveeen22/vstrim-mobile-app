import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from '../screens/ProfileScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { ListDetailScreen } from '../screens/ListDetailScreen';
import { CreateListScreen } from '@/features/lists/screens/CreateListScreen';
import { PlaceDetailScreen } from '@/features/place';
import { WriteReviewScreen, DiscussionScreen } from '@/features/review';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  UserProfileScreen: { userId: string };
  ListDetailScreen: { listId: string; listName: string };
  CreateListScreen: undefined;
  PlaceDetailScreen: { placeId: string };
  WriteReviewScreen: { placeId: string; placeName: string };
  DiscussionScreen: { reviewId: string; placeId: string };
};

const Stack = createStackNavigator<ProfileStackParamList>();

export function ProfileStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="ListDetailScreen" component={ListDetailScreen} />
      <Stack.Screen
        name="CreateListScreen"
        component={CreateListScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen} />
      <Stack.Screen name="WriteReviewScreen" component={WriteReviewScreen} />
      <Stack.Screen name="DiscussionScreen" component={DiscussionScreen} />
    </Stack.Navigator>
  );
}
