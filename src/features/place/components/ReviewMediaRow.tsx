import React from 'react';
import { ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '@/shared/theme/tokens';

interface Props {
  mediaUrls: string[];
  onPress?: (index: number) => void;
}

export function ReviewMediaRow({ mediaUrls, onPress }: Props) {
  if (!mediaUrls.length) return null;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {mediaUrls.map((url, i) => (
        <TouchableOpacity key={i} onPress={() => onPress?.(i)} activeOpacity={0.85}>
          <Image source={{ uri: url }} style={styles.thumb} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: Spacing.xs, paddingVertical: Spacing.xs },
  thumb: {
    width: 90,
    height: 90,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
  },
});
