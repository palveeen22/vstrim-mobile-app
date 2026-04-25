import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Spacing } from '@/shared/theme/tokens';

interface Props {
  value: number;
  onChange: (rating: number) => void;
}

export function RatingInput({ value, onChange }: Props) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onChange(star)} activeOpacity={0.7}>
          <Text style={[styles.star, star <= value && styles.starFilled]}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.xs },
  star: { fontSize: 36, color: '#E0E0E0' },
  starFilled: { color: '#F5A623' },
});
