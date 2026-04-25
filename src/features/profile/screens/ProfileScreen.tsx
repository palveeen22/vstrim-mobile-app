import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ProfileStackParamList } from '../navigation/ProfileStackNavigator';
import { useAppSelector } from '@/shared/store/hooks';
import { useProfile } from '../hooks/useProfile';
import { useLists } from '../hooks/useLists';
import { ProfileHeader } from '../components/ProfileHeader';
import { StatsRow } from '../components/StatsRow';
import { ListCard } from '../components/ListCard';
import { SavedPlaceGrid } from '../components/SavedPlaceGrid';
import { PhotoGrid } from '../components/PhotoGrid';
import { ProfileSkeleton } from '../components/ProfileSkeleton';
import { ErrorState } from '@/shared/components/ui/ErrorState';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { Colors, Spacing, Typography } from '@/shared/theme/tokens';
import { profileApi } from '../api/profile.api';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/api/queryKeys';

type Tab = 'lists' | 'saved' | 'photos';
type Props = StackScreenProps<ProfileStackParamList, 'ProfileScreen'>;

export function ProfileScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const userId = useAppSelector((s) => s.authUser.user?.id ?? '');
  const [tab, setTab] = useState<Tab>('lists');

  const { data: profile, isLoading, isError, refetch, isRefetching } = useProfile(userId);
  const { data: lists } = useLists(userId);

  const { data: savedData } = useQuery({
    queryKey: queryKeys.users.saved(userId),
    queryFn: () => profileApi.getSaved(userId),
    enabled: tab === 'saved' && !!userId,
  });

  const { data: photosData } = useQuery({
    queryKey: queryKeys.users.photos(userId),
    queryFn: () => profileApi.getPhotos(userId),
    enabled: tab === 'photos' && !!userId,
  });

  if (isLoading) return <ProfileSkeleton />;
  if (isError || !profile) {
    return <ErrorState message="Could not load profile" onRetry={refetch} />;
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'lists', label: 'Lists' },
    { key: 'saved', label: 'Saved' },
    { key: 'photos', label: 'Photos' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom + Spacing.xl }}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.primary} />
      }
    >
      <ProfileHeader
        profile={profile}
        onEditProfile={() => {}}
      />

      <StatsRow
        reviewCount={profile.reviewCount}
        followersCount={profile.followersCount}
        followingCount={profile.followingCount}
      />

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {TABS.map((t) => (
          <TouchableOpacity
            key={t.key}
            style={[styles.tabItem, tab === t.key && styles.tabItemActive]}
            onPress={() => setTab(t.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabLabel, tab === t.key && styles.tabLabelActive]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab content */}
      {tab === 'lists' && (
        <>
          <TouchableOpacity
            style={styles.createListBtn}
            onPress={() => navigation.navigate('CreateListScreen')}
            activeOpacity={0.8}
          >
            <Text style={styles.createListText}>+ Create new list</Text>
          </TouchableOpacity>
          {(lists ?? []).length === 0 ? (
            <EmptyState emoji="📋" title="No lists yet" subtitle="Create your first list" />
          ) : (
            (lists ?? []).map((list) => (
              <ListCard
                key={list.id}
                list={list}
                onPress={() =>
                  navigation.navigate('ListDetailScreen', {
                    listId: list.id,
                    listName: list.name,
                  })
                }
              />
            ))
          )}
        </>
      )}

      {tab === 'saved' && (
        (savedData?.items ?? []).length === 0 ? (
          <EmptyState emoji="🔖" title="No saved places" subtitle="Tap the bookmark on any place" />
        ) : (
          <SavedPlaceGrid
            places={savedData?.items ?? []}
            onPlace={(id) => navigation.navigate('PlaceDetailScreen', { placeId: id })}
          />
        )
      )}

      {tab === 'photos' && (
        (photosData?.items ?? []).length === 0 ? (
          <EmptyState emoji="📷" title="No photos yet" subtitle="Post a review with photos" />
        ) : (
          <PhotoGrid
            photos={photosData?.items ?? []}
            onPhoto={(placeId) => navigation.navigate('PlaceDetailScreen', { placeId })}
          />
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginTop: Spacing.md,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 2,
    borderBottomColor: Colors.transparent,
  },
  tabItemActive: { borderBottomColor: Colors.primary },
  tabLabel: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  tabLabelActive: { color: Colors.primary },
  createListBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  createListText: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.primary,
  },
});
