import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import { Place } from '../types/map.types';
import { Radius, Typography } from '@/shared/theme';

const CARD_HEIGHT = 420;
const CARD_RADIUS = 28;
const AVATAR_SIZE = 34;
const AVATAR_OVERLAP = 10;

interface CardProps {
  place: Place;
  photoIndex: number;
  onTap: (x: number) => void;
  onViewDetail: () => void;
  onSave: () => void;
  onVisited: () => void;
  bottomPad: number;
}

export function PlaceCard({
  place,
  photoIndex,
  onTap,
  onViewDetail,
  onSave,
  // onVisited,
  bottomPad,
}: CardProps) {
  const photos = place.photos?.length ? place.photos : [place.coverUrl];
  const currentPhoto = photos[photoIndex] ?? place.coverUrl;
  const hasMultiplePhotos = photos.length > 1;
  const tags = [place.category, ...(place.tags ?? [])];

  return (
    <View style={styles.shell}>
      <View style={styles.card}>
        {/* Background image */}
        <Image
          source={{ uri: currentPhoto ?? undefined }}
          style={[StyleSheet.absoluteFill, styles.bgImage]}
          resizeMode="cover"
        />

        {/* Tap zone */}
        <TouchableWithoutFeedback onPress={(e) => onTap(e.nativeEvent.locationX)}>
          <View style={StyleSheet.absoluteFill} />
        </TouchableWithoutFeedback>

        {/* Progress bars */}
        {hasMultiplePhotos && (
          <View style={styles.progressRow} pointerEvents="none">
            {photos.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.progressBar,
                  // eslint-disable-next-line react-native/no-inline-styles
                  { flex: 1 },
                  i === photoIndex ? styles.progressActive : styles.progressInactive,
                ]}
              />
            ))}
          </View>
        )}

        {/* Content */}
        <View style={[styles.overlay, { paddingBottom: bottomPad + 16 }]} pointerEvents="box-none">
          <TouchableOpacity onPress={onViewDetail} activeOpacity={0.85}>
            <Text style={styles.name} numberOfLines={2}>
              {place.name}
            </Text>
          </TouchableOpacity>

          <View style={styles.tagsWrap}>
            {tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.avatarsRow}>
              {place.savedByAvatars?.slice(0, 3).map((uri, i) => (
                <Image
                  key={i}
                  source={{ uri }}
                  style={[styles.avatar, i > 0 && { marginLeft: -AVATAR_OVERLAP }]}
                />
              ))}
              {place.savedCount > 0 && (
                <Text style={styles.savedCount}>
                  {' '}
                  {place.savedCount > 999
                    ? `${(place.savedCount / 1000).toFixed(1)}k`
                    : place.savedCount}
                </Text>
              )}
            </View>

            {/* <View style={styles.actionsRow}> */}
            {/* <TouchableOpacity style={styles.actionBtn} onPress={onSave} activeOpacity={0.8}>
                <Text style={styles.actionIcon}>⊹</Text>
                <Text style={styles.actionText}>bucket list</Text>
              </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.actionBtn, place.isSaved && styles.actionBtnActive]}
              onPress={onSave}
              activeOpacity={0.85}
            >
              <Text style={styles.actionIcon}>
                {place.isSaved ? '✓' : '＋'}
              </Text>
              <Text style={styles.actionText}>
                {place.isSaved ? 'Сохранено' : 'Сохранить'}
              </Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: CARD_RADIUS,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.18,
        shadowRadius: 20,
      },
      android: { elevation: 10 },
    }),
  },

  card: {
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#111',
  },

  bgImage: {
    opacity: 0.4,
  },

  progressRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
  },
  progressBar: { height: 2.5, borderRadius: 2 },
  progressActive: { backgroundColor: 'rgba(255,255,255,0.95)' },
  progressInactive: { backgroundColor: 'rgba(255,255,255,0.30)' },

  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 60,
  },

  name: {
    fontFamily: Typography.fonts.bold,
    fontSize: 26,
    lineHeight: 31,
    color: '#fff',
    marginBottom: 10,
    ...Platform.select({
      ios: {
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 6,
      },
    }),
  },

  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  tagText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 12,
    color: 'rgba(255,255,255,0.92)',
    letterSpacing: 0.2,
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    backgroundColor: '#333',
  },
  savedCount: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: 14,
    color: 'rgba(255,255,255,0.88)',
    marginLeft: 8,
  },
  // actionsRow: {
  //   flexDirection: 'row',
  //   gap: 8,
  // },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,

    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  actionBtnActive: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },

  actionIcon: {
    fontSize: 14,
    marginRight: 6,
    color: '#fff',
  },

  actionText: {
    fontFamily: Typography.fonts.medium,
    fontSize: 13,
    color: '#fff',
  },

  // saat aktif → text gelap
  actionTextActive: {
    color: '#111',
  },
});
