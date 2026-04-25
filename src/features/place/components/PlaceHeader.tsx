import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/shared/theme/tokens';
import type { PlaceDetail } from '../types/place.types';

interface Props {
  place: PlaceDetail;
  isSaved: boolean;
  onSave: () => void;
  onBack: () => void;
}

export function PlaceHeader({ place, isSaved, onSave, onBack }: Props) {
  return (
    <View>
      <View style={styles.coverContainer}>
        {place.coverUrl ? (
          <Image source={{ uri: place.coverUrl }} style={styles.cover} />
        ) : (
          <View style={[styles.cover, styles.coverPlaceholder]} />
        )}
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveIcon}>{isSaved ? '🔖' : '📌'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={2}>{place.name}</Text>
        </View>
        <Text style={styles.category}>{place.category}</Text>
        <Text style={styles.address}>{place.address}</Text>

        <View style={styles.statsRow}>
          <Text style={styles.rating}>⭐ {place.avgRating.toFixed(1)}</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.reviews}>{place.reviewCount} отзывов</Text>
        </View>

        {place.description ? (
          <Text style={styles.description}>{place.description}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  coverContainer: { position: 'relative' },
  cover: { width: '100%', height: 240, backgroundColor: Colors.surface },
  coverPlaceholder: { backgroundColor: Colors.surfaceElevated },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: { fontSize: 18, color: Colors.text },
  saveBtn: {
    position: 'absolute',
    top: 48,
    right: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveIcon: { fontSize: 18 },
  info: { paddingHorizontal: Spacing.md, paddingTop: Spacing.md, gap: Spacing.xs },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  name: { fontFamily: Typography.fonts.bold, fontSize: Typography.size.xxl, color: Colors.text, flex: 1 },
  category: { fontFamily: Typography.fonts.medium, fontSize: Typography.size.sm, color: Colors.primary },
  address: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.sm, color: Colors.textSecondary },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  rating: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.md, color: Colors.text },
  dot: { color: Colors.textMuted },
  reviews: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.sm, color: Colors.textSecondary },
  description: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.text,
    lineHeight: 22,
    marginTop: Spacing.xs,
  },
});
