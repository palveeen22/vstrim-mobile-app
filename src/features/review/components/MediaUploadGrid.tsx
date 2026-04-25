import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Radius, Spacing } from '@/shared/theme/tokens';

interface MediaItem {
  uri: string;
  uploading?: boolean;
}

interface Props {
  items: MediaItem[];
  onRemove: (index: number) => void;
}

export function MediaUploadGrid({ items, onRemove }: Props) {
  if (!items.length) return null;

  return (
    <View style={styles.grid}>
      {items.map((item, i) => (
        <View key={i} style={styles.cell}>
          <Image source={{ uri: item.uri }} style={styles.thumb} />
          {item.uploading && (
            <View style={styles.overlay}>
              <ActivityIndicator color={Colors.white} />
            </View>
          )}
          <TouchableOpacity style={styles.remove} onPress={() => onRemove(i)}>
            <Text style={styles.removeText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  cell: { width: 90, height: 90, position: 'relative' },
  thumb: { width: 90, height: 90, borderRadius: Radius.md, backgroundColor: Colors.surface },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remove: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: { color: Colors.white, fontSize: 10, fontWeight: 'bold' },
});
