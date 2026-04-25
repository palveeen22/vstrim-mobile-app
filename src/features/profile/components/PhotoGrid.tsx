import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Spacing, Radius } from '@/shared/theme/tokens';
import type { UserPhoto } from '../types/profile.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const GAP = 2;
const ITEM_SIZE = (SCREEN_WIDTH - GAP * 2) / 3;

interface Props {
  photos: UserPhoto[];
  onPhoto: (placeId: string) => void;
}

export function PhotoGrid({ photos, onPhoto }: Props) {
  return (
    <View style={styles.grid}>
      {photos.map((photo) => (
        <TouchableOpacity
          key={photo.id}
          style={styles.item}
          onPress={() => onPhoto(photo.placeId)}
          activeOpacity={0.85}
        >
          <Image source={{ uri: photo.url }} style={styles.img} resizeMode="cover" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    paddingTop: GAP,
  },
  item: { width: ITEM_SIZE, height: ITEM_SIZE },
  img: { width: ITEM_SIZE, height: ITEM_SIZE },
});
