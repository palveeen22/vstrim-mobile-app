import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/shared/theme/tokens';
import { formatCount } from '@/shared/utils/formatCount';

interface Props {
  reviewCount: number;
  followersCount: number;
  followingCount: number;
  onFollowers?: () => void;
  onFollowing?: () => void;
}

export function StatsRow({
  reviewCount,
  followersCount,
  followingCount,
  onFollowers,
  onFollowing,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.stat}>
        <Text style={styles.value}>{formatCount(reviewCount)}</Text>
        <Text style={styles.label}>Reviews</Text>
      </View>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.stat} onPress={onFollowers} activeOpacity={0.7}>
        <Text style={styles.value}>{formatCount(followersCount)}</Text>
        <Text style={styles.label}>Followers</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.stat} onPress={onFollowing} activeOpacity={0.7}>
        <Text style={styles.value}>{formatCount(followingCount)}</Text>
        <Text style={styles.label}>Following</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: Spacing.md,
    gap: Spacing.xl,
  },
  stat: { alignItems: 'center', gap: 2 },
  value: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.xl,
    color: Colors.text,
  },
  label: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  divider: { width: 1, height: 32, backgroundColor: Colors.border },
});
