import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ProfileStackParamList } from '../navigation/ProfileStackNavigator';
import { useProfile } from '../hooks/useProfile';
import { useFollow } from '../hooks/useFollow';
import { useLists } from '../hooks/useLists';
import { ProfileHeader } from '../components/ProfileHeader';
import { StatsRow } from '../components/StatsRow';
import { ListCard } from '../components/ListCard';
import { PhotoGrid } from '../components/PhotoGrid';
import { ProfileSkeleton } from '../components/ProfileSkeleton';
import { ErrorState } from '@/shared/components/ui/ErrorState';
import { EmptyState } from '@/shared/components/ui/EmptyState';
import { Colors, Spacing, Typography } from '@/shared/theme/tokens';
import { profileApi } from '../api/profile.api';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/shared/api/queryKeys';
import Svg, { Path } from 'react-native-svg';

type Tab = 'lists' | 'photos';
type Props = StackScreenProps<ProfileStackParamList, 'UserProfileScreen'>;

export function UserProfileScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { userId } = route.params;
  const [tab, setTab] = useState<Tab>('lists');

  const { data: profile, isLoading, isError, refetch, isRefetching } = useProfile(userId);
  const { follow, unfollow } = useFollow(userId);
  const { data: lists } = useLists(userId);

  const { data: photosData } = useQuery({
    queryKey: queryKeys.users.photos(userId),
    queryFn: () => profileApi.getPhotos(userId),
    enabled: tab === 'photos' && !!userId,
  });

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M15 19l-7-7 7-7" stroke={Colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <ProfileSkeleton />
      </View>
    );
  }

  if (isError || !profile) {
    return <ErrorState message="Could not load profile" onRetry={refetch} />;
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'lists', label: 'Lists' },
    { key: 'photos', label: 'Photos' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M15 19l-7-7 7-7" stroke={Colors.text} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + Spacing.xl }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={Colors.primary} />
        }
      >
        <ProfileHeader
          profile={profile}
          onFollow={() => follow.mutate()}
          onUnfollow={() => unfollow.mutate()}
        />

        <StatsRow
          reviewCount={profile.reviewCount}
          followersCount={profile.followersCount}
          followingCount={profile.followingCount}
        />

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

        {tab === 'lists' && (
          (lists ?? []).length === 0 ? (
            <EmptyState emoji="📋" title="No public lists" />
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
          )
        )}

        {tab === 'photos' && (
          (photosData?.items ?? []).length === 0 ? (
            <EmptyState emoji="📷" title="No photos yet" />
          ) : (
            <PhotoGrid
              photos={photosData?.items ?? []}
              onPhoto={(placeId) => navigation.navigate('PlaceDetailScreen', { placeId })}
            />
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  backBtn: {
    padding: Spacing.md,
    alignSelf: 'flex-start',
  },
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
});
