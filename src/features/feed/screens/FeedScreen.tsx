import React, { useCallback, useRef, useState } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import type { FeedStackParamList } from '../navigation/FeedStackNavigator';
import { useFeed } from '../hooks/useFeed';
import { FeedReviewCard } from '../components/FeedReviewCard';
import { FeedSkeleton } from '../components/FeedSkeleton';
import { ErrorState } from '@/shared/components/ui/ErrorState';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { Colors } from '@/shared/theme/tokens';
import type { FeedItem } from '../types/feed.types';

type Props = StackScreenProps<FeedStackParamList, 'FeedScreen'>;

export function FeedScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
  } = useFeed();

  const items: FeedItem[] = data?.pages.flatMap((p) => p.items) ?? [];

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? null);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 }).current;

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {Array.from({ length: 3 }).map((_, i) => (
          <FeedSkeleton key={i} />
        ))}
      </View>
    );
  }

  if (isError) {
    return <ErrorState message="Could not load feed" onRetry={refetch} />;
  }

  return (
    <FlashList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <FeedReviewCard
          item={item}
          isVideoPlaying={activeIndex === index}
          onHelpful={() => {}}
          onDiscussion={() =>
            navigation.navigate('DiscussionScreen', {
              reviewId: item.id,
              placeId: item.placeId,
            })
          }
          onPlace={() => navigation.navigate('PlaceDetailScreen', { placeId: item.placeId })}
          onUser={() => navigation.navigate('UserProfileScreen', { userId: item.userId })}
          onFollow={() => {}}
        />
      )}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.4}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching && !isFetchingNextPage}
          onRefresh={refetch}
          tintColor={Colors.primary}
        />
      }
      ListEmptyComponent={
        <EmptyState
          emoji="🍽️"
          title="Your feed is empty"
          subtitle="Follow people to see their reviews here"
        />
      }
      contentContainerStyle={{ paddingTop: insets.top }}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
