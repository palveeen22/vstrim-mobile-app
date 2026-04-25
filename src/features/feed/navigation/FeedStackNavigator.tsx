import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FeedScreen } from '../screens/FeedScreen';
import { PlaceDetailScreen } from '@/features/place';
import { WriteReviewScreen, DiscussionScreen } from '@/features/review';
import { UserProfileScreen } from '@/features/profile/screens/UserProfileScreen';

export type FeedStackParamList = {
  FeedScreen: undefined;
  PlaceDetailScreen: { placeId: string };
  WriteReviewScreen: { placeId: string; placeName: string };
  DiscussionScreen: { reviewId: string; placeId: string };
  UserProfileScreen: { userId: string };
};

const Stack = createStackNavigator<FeedStackParamList>();

export function FeedStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FeedScreen" component={FeedScreen} />
      <Stack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen} />
      <Stack.Screen name="WriteReviewScreen" component={WriteReviewScreen} />
      <Stack.Screen name="DiscussionScreen" component={DiscussionScreen} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
    </Stack.Navigator>
  );
}
