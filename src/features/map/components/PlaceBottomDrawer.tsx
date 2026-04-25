import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheet } from '@/shared/components/BottomSheet';
import type { Place } from '../types/map.types';
import { PlaceCard } from './PlaceCard';

const { width: SCREEN_W } = Dimensions.get('window');
const CARD_HEIGHT = 420;
const HANDLE_AREA = 24;
const SNAP_HEIGHT = CARD_HEIGHT + HANDLE_AREA;

interface Props {
  place: Place | null;
  onClose: () => void;
  onViewDetail: (placeId: string) => void;
  onSave: (placeId: string) => void;
  onVisited: (placeId: string) => void;
}

export function PlaceBottomDrawer({
  place,
  onClose,
  onViewDetail,
  onSave,
  onVisited,
}: Props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const bottomPad = insets.bottom > 0 ? insets.bottom : 12;

  const handleTap = useCallback(
    (x: number) => {
      if (!place) return;
      if (x < SCREEN_W / 2) {
        setPhotoIndex((i) => Math.max(0, i - 1));
      } else {
        setPhotoIndex((i) => Math.min((place.photos?.length ?? 1) - 1, i + 1));
      }
    },
    [place],
  );

  useEffect(() => {
    setPhotoIndex(0);
  }, [place?.id]);

  return (
    <BottomSheet
      visible={!!place}
      snapHeight={SNAP_HEIGHT + bottomPad}
      onClose={onClose}
    >
      {place && (
        <View style={styles.cardWrapper}>
          <PlaceCard
            place={place}
            photoIndex={photoIndex}
            onTap={handleTap}
            onViewDetail={() => onViewDetail(place.id)}
            onSave={() => onSave(place.id)}
            onVisited={() => onVisited(place.id)}
            bottomPad={bottomPad}
          />
        </View>
      )}
    </BottomSheet>
  );
}


const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 4,
  },
});