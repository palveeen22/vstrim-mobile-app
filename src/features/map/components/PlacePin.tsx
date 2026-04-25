import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Marker } from 'react-native-maps';
import { Colors, Typography } from '@/shared/theme/tokens';
import { CATEGORIES } from '@/shared/constants/categories';
import type { Place } from '../types/map.types';

const ICON_SIZE = 42;
const DOT_SIZE = 12;

function getCategoryIcon(category: string): string {
  const found = CATEGORIES.find((c) => c.id === category);
  return found?.icon ?? '📍';
}

interface Props {
  place: Place;
  selected: boolean;
  onPress: () => void;
}

export function PlacePin({ place, selected, onPress }: Props) {
  const icon = getCategoryIcon(place.category);

  const categoryName =
    CATEGORIES.find((c) => c.id === place.category)?.name ?? place.category;

  return (
    <Marker
      coordinate={{ latitude: place.lat, longitude: place.lng }}
      onPress={onPress}
      tracksViewChanges={false}
      anchor={{ x: 0.5, y: 1 }}
    >
      <View style={styles.wrapper}>
        <View style={styles.row}>
          {/* PIN */}
          <View style={styles.container}>
            <View style={[styles.iconCircle, selected && styles.iconCircleSelected]}>
              <Text style={styles.iconEmoji}>{icon}</Text>
              <View style={[styles.dot, selected && styles.dotSelected]} />
            </View>
            <View style={[styles.tail, selected && styles.tailSelected]} />
          </View>

          {/* TEXT */}
          <View style={styles.textWrap}>
            <Text style={[styles.name, selected && styles.nameSelected]}>
              {place.name}
            </Text>
            <Text style={styles.category}>
              {categoryName}
            </Text>
          </View>
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  textWrap: {
    marginLeft: 8,
    justifyContent: 'center',
  },

  iconCircle: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.ccbrown,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
      },
      android: { elevation: 5 },
    }),
  },

  iconCircleSelected: {
    borderColor: Colors.ccbrowndark,
    borderWidth: 2.5,
  },

  iconEmoji: {
    fontSize: 22,
    textAlign: 'center',
  },

  dot: {
    position: 'absolute',
    top: 3,
    right: 3,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: Colors.white,
  },

  dotSelected: {
    backgroundColor: Colors.primary,
  },

  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.ccbrown,
    marginTop: -1,
  },

  tailSelected: {
    borderTopColor: Colors.ccbrowndark,
  },

  name: {
    fontFamily: Typography.fonts.bold,
    fontSize: 12,
    color: Colors.text,
    maxWidth: 100,
  },

  nameSelected: {
    color: Colors.primary,
  },

  category: {
    fontFamily: Typography.fonts.regular,
    fontSize: 10,
    color: Colors.icon,
    marginTop: 1,
    maxWidth: 100,
  },
});