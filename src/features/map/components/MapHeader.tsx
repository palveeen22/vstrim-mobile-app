import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';
import { useAppSelector } from '@/shared/store/hooks';

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={Colors.textMuted} strokeWidth={2} />
      <Path
        d="M16.5 16.5L21 21"
        stroke={Colors.textMuted}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function NotificationIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        stroke={Colors.text}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface Props {
  onSearchPress?: () => void;
}

export function MapHeader({ onSearchPress }: Props) {
  const insets = useSafeAreaInsets();
  const user = useAppSelector((s) => s.authUser.user);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Доброе утро 🌤';
    if (h < 17) return 'Добрый день ☀️';
    return 'Добрый вечер 🌙';
  })();

  return (
    <View style={[styles.wrapper, { paddingTop: insets.top + 8 }]}>
      {/* Glass card */}
      <View style={styles.card}>
        {/* Top row: greeting + avatar */}
        <View style={styles.topRow}>
          <View style={styles.greetingGroup}>
            <View style={styles.explorePill}>
              <Text style={styles.exploreText}>✦ Explore</Text>
            </View>
            <Text style={styles.greeting}>{greeting}</Text>
          </View>

          <TouchableOpacity style={styles.avatarBtn} activeOpacity={0.85}>
            {user?.avatarUrl ? (
              <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarLetter}>
                  {user?.displayName?.[0]?.toUpperCase() ?? '?'}
                </Text>
              </View>
            )}
            {/* Notification dot */}
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleGroup}>
          <Text style={styles.titleBlack}>Найди свою</Text>
          <Text style={styles.titlePrimary}>точку{' '}
            <Text style={styles.titleBlack}>на карте</Text>
          </Text>
        </View>

        {/* Search bar */}
        <TouchableOpacity
          style={styles.searchBar}
          onPress={onSearchPress}
          activeOpacity={0.88}
        >
          <View style={styles.searchIcon}>
            <SearchIcon />
          </View>
          <Text style={styles.searchPlaceholder}>Кафе, парки, рестораны...</Text>
          <View style={styles.filterBtn}>
            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
              <Path
                d="M4 6h16M7 12h10M10 18h4"
                stroke={Colors.primary}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>

      {/* Soft bottom fade so map bleeds in */}
      <View style={styles.fadeRow} pointerEvents="none">
        <View style={styles.fade1} />
        <View style={styles.fade2} />
        <View style={styles.fade3} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
  },

  card: {
    marginHorizontal: Spacing.md,
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 24,
    paddingHorizontal: Spacing.md,
    paddingTop: 14,
    paddingBottom: 16,
    gap: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 20,
      },
      android: { elevation: 8 },
    }),
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  greetingGroup: { gap: 4 },

  explorePill: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primaryDim,
  },
  exploreText: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.xs,
    color: Colors.primary,
    letterSpacing: 0.4,
  },

  greeting: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },

  avatarBtn: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.primaryDim,
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryDim,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  avatarLetter: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.md,
    color: Colors.primary,
  },
  notifDot: {
    position: 'absolute',
    top: 1,
    right: 1,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.like,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },

  titleGroup: { gap: 0 },
  titleBlack: {
    fontFamily: Typography.fonts.extraBold,
    fontSize: 30,
    lineHeight: 36,
    color: Colors.text,
    letterSpacing: -0.8,
  },
  titlePrimary: {
    fontFamily: Typography.fonts.extraBold,
    fontSize: 30,
    lineHeight: 36,
    color: Colors.primary,
    letterSpacing: -0.8,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingLeft: 14,
    paddingRight: 8,
    height: 46,
    gap: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
      },
    }),
  },
  searchIcon: { opacity: 0.7 },
  searchPlaceholder: {
    flex: 1,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryDim,
  },

  /* Bottom fade layers so the card melts into the map */
  fadeRow: { overflow: 'hidden' },
  fade1: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.55)',
    marginHorizontal: 20,
  },
  fade2: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.28)',
    marginHorizontal: 28,
  },
  fade3: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.10)',
    marginHorizontal: 36,
  },
});
