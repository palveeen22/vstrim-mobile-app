import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, Radius, Shadow } from '@/shared/theme/tokens';
import type { UserList } from '../types/profile.types';

interface Props {
  list: UserList;
  onPress: () => void;
}

export function ListCard({ list, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.cover}>
        {list.coverUrl ? (
          <Image source={{ uri: list.coverUrl }} style={styles.coverImg} />
        ) : (
          <View style={styles.coverFallback}>
            <Text style={styles.coverEmoji}>📍</Text>
          </View>
        )}
        {!list.isPublic && (
          <View style={styles.privateBadge}>
            <Text style={styles.privateText}>🔒</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{list.name}</Text>
        <Text style={styles.count}>{list.placeCount} places</Text>
        {list.description ? (
          <Text style={styles.description} numberOfLines={2}>{list.description}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
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
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceSubtle,
  },
  coverEmoji: { fontSize: 28 },
  privateBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: 2,
  },
  privateText: { fontSize: 10 },
  info: { flex: 1, gap: 2 },
  name: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.md,
    color: Colors.text,
  },
  count: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  description: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
