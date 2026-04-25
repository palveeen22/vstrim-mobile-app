import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { Colors, Typography, Radius, Spacing } from '@/shared/theme/tokens';
import { CATEGORIES } from '@/shared/constants/categories';
import { useAppSelector, useAppDispatch } from '@/shared/store/hooks';
import { setCategory } from '../store/map.slice';

export function CategoryFilter() {
  const dispatch = useAppDispatch();
  const active = useAppSelector((s) => s.map.activeCategory);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.scroll}
    >
      <TouchableOpacity
        style={[styles.chip, !active && styles.chipActive]}
        onPress={() => dispatch(setCategory(null))}
        activeOpacity={0.8}
      >
        <Text style={[styles.chipText, !active && styles.chipTextActive]}>Все</Text>
      </TouchableOpacity>

      {CATEGORIES.map((cat) => {
        const isActive = active === cat.id;
        return (
          <TouchableOpacity
            key={cat.id}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => dispatch(setCategory(isActive ? null : cat.id))}
            activeOpacity={0.8}
          >
            <Text style={styles.chipIcon}>{cat.icon}</Text>
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    gap: Spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.10)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
    }),
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipIcon: { fontSize: 14 },
  chipText: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.text,
  },
  chipTextActive: { color: Colors.white },
});
