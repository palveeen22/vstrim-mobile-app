import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';
import type { UserProfile } from '../types/profile.types';

interface Props {
  profile: UserProfile;
  onFollow?: () => void;
  onUnfollow?: () => void;
  onEditProfile?: () => void;
}

export function ProfileHeader({ profile, onFollow, onUnfollow, onEditProfile }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrap}>
        {profile.avatarUrl ? (
          <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarLetter}>
              {profile.displayName[0]?.toUpperCase() ?? '?'}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.displayName}>{profile.displayName}</Text>
      <Text style={styles.username}>@{profile.username}</Text>

      {profile.bio ? <Text style={styles.bio}>{profile.bio}</Text> : null}

      {profile.isOwnProfile ? (
        <TouchableOpacity style={styles.editBtn} onPress={onEditProfile} activeOpacity={0.8}>
          <Text style={styles.editText}>Edit profile</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.followBtn, profile.isFollowing && styles.followingBtn]}
          onPress={profile.isFollowing ? onUnfollow : onFollow}
          activeOpacity={0.8}
        >
          <Text style={[styles.followText, profile.isFollowing && styles.followingText]}>
            {profile.isFollowing ? 'Following' : 'Follow'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: Spacing.lg, paddingBottom: Spacing.md, gap: Spacing.xs },
  avatarWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  avatar: { width: 88, height: 88 },
  avatarFallback: {
    width: 88,
    height: 88,
    backgroundColor: Colors.primaryDim,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.xxl,
    color: Colors.primary,
  },
  displayName: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.xl,
    color: Colors.text,
  },
  username: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  bio: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xs,
  },
  editBtn: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  editText: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.text,
  },
  followBtn: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
  },
  followingBtn: { backgroundColor: Colors.actionDefault },
  followText: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.white,
  },
  followingText: { color: Colors.text },
});
