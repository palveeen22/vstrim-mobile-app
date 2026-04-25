import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';
import type { SavedPlace } from '../types/profile.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_SIZE = (SCREEN_WIDTH - Spacing.md * 2 - Spacing.sm) / 2;

interface Props {
  places: SavedPlace[];
  onPlace: (id: string) => void;
}

export function SavedPlaceGrid({ places, onPlace }: Props) {
  return (
    <View style={styles.grid}>
      {places.map((place) => (
        <TouchableOpacity
          key={place.id}
          style={styles.item}
          onPress={() => onPlace(place.id)}
          activeOpacity={0.85}
        >
          <View style={styles.cover}>
            {place.coverUrl ? (
              <Image source={{ uri: place.coverUrl }} style={styles.coverImg} />
            ) : (
              <View style={styles.coverFallback}>
                <Text style={styles.fallbackEmoji}>📍</Text>
              </View>
            )}
          </View>
          <Text style={styles.name} numberOfLines={1}>{place.name}</Text>
          <Text style={styles.category} numberOfLines={1}>{place.category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    paddingTop: Spacing.sm,
  },
  item: { width: ITEM_SIZE },
  cover: {
    width: ITEM_SIZE,
    height: ITEM_SIZE * 0.75,
    borderRadius: Radius.md,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceElevated,
  },
  coverImg: { width: '100%', height: '100%' },
  coverFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceSubtle,
  },
  fallbackEmoji: { fontSize: 28 },
  name: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.text,
    marginTop: 6,
  },
  category: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
});
