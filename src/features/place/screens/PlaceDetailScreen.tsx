import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { MapStackParamList } from '@/features/map/navigation/MapStackNavigator';
import { PlaceHeader } from '../components/PlaceHeader';
import { ReviewCard } from '../components/ReviewCard';
import { Colors, Spacing, Typography } from '@/shared/theme/tokens';
import type { Review } from '@/features/review/types/review.types';
import { MOCK_PLACE_DETAILS, MOCK_REVIEWS } from '@/features/map/mock/mapMock';

type Props = StackScreenProps<MapStackParamList, 'PlaceDetailScreen'>;

export function PlaceDetailScreen({ route, navigation }: Props) {
  const { placeId } = route.params;
  const place = MOCK_PLACE_DETAILS[placeId] ?? null;
  const reviews: Review[] = MOCK_REVIEWS[placeId] ?? [];

  if (!place) {
    return <View style={styles.center}><Text style={styles.empty}>Место не найдено</Text></View>;
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <PlaceHeader
          place={place}
          isSaved={place.isSaved}
          onSave={() => {}}
          onBack={() => navigation.goBack()}
        />
      }
      renderItem={({ item }) => (
        <ReviewCard
          review={item}
          onHelpful={() => {}}
          onDiscussion={() => navigation.navigate('DiscussionScreen', { reviewId: item.id, placeId })}
        />
      )}
      onEndReachedThreshold={0.3}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.md, color: Colors.textMuted },
  list: { paddingBottom: Spacing.xl },
  footer: { paddingVertical: Spacing.md },
});
