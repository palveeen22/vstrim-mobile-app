import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ProfileStackParamList } from '../navigation/ProfileStackNavigator';
import { useListDetail } from '../hooks/useListDetail';
import { ErrorState } from '@/shared/components/ui/ErrorState';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';
import type { ListDetailPlace } from '../types/profile.types';
import Svg, { Path } from 'react-native-svg';

type Props = StackScreenProps<ProfileStackParamList, 'ListDetailScreen'>;

export function ListDetailScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { listId, listName } = route.params;
  const { data, isLoading, isError, refetch, isRefetching } = useListDetail(listId);

  const renderPlace = ({ item }: { item: ListDetailPlace }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PlaceDetailScreen', { placeId: item.id })}
      activeOpacity={0.85}
    >
      <View style={styles.cover}>
        {item.coverUrl ? (
          <Image source={{ uri: item.coverUrl }} style={styles.coverImg} />
        ) : (
          <View style={styles.coverFallback}>
            <Text style={styles.coverEmoji}>📍</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.placeName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.address} numberOfLines={1}>{item.address}</Text>
        <View style={styles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={[styles.star, i < Math.round(item.avgRating) && styles.starFilled]}>★</Text>
          ))}
          <Text style={styles.ratingNum}>{item.avgRating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M15 19l-7-7 7-7" stroke={Colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{listName}</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <View style={styles.skeletons}>
          {Array.from({ length: 4 }).map((_, i) => (
            <View key={i} style={styles.skeletonRow}>
              <Skeleton width={64} height={64} borderRadius={12} />
              <View style={{ flex: 1, gap: 6 }}>
                <Skeleton width="60%" height={14} />
                <Skeleton width="40%" height={12} />
                <Skeleton width="80%" height={11} />
              </View>
            </View>
          ))}
        </View>
      ) : isError ? (
        <ErrorState message="Could not load list" onRetry={refetch} />
      ) : (
        <FlatList
          data={data?.places ?? []}
          keyExtractor={(item) => item.id}
          renderItem={renderPlace}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.primary} />
          }
          ListHeaderComponent={
            data?.list.description ? (
              <Text style={styles.description}>{data.list.description}</Text>
            ) : null
          }
          ListEmptyComponent={
            <EmptyState emoji="📋" title="This list is empty" />
          }
          contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xl }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.lg,
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  description: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  skeletons: { padding: Spacing.md, gap: Spacing.md },
  skeletonRow: { flexDirection: 'row', gap: Spacing.md, alignItems: 'center' },
  item: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
  },
  cover: {
    width: 64,
    height: 64,
    borderRadius: Radius.md,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceElevated,
  },
  coverImg: { width: 64, height: 64 },
  coverFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceSubtle,
  },
  coverEmoji: { fontSize: 24 },
  info: { flex: 1, gap: 3 },
  placeName: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.md,
    color: Colors.text,
  },
  category: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  address: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  star: { fontSize: 11, color: Colors.border },
  starFilled: { color: '#F5A623' },
  ratingNum: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});
