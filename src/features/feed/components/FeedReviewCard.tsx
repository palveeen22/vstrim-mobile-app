import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, Typography, Radius, Shadow } from '@/shared/theme/tokens';
import { formatDate } from '@/shared/utils/formatDate';
import { formatCount } from '@/shared/utils/formatCount';
import type { FeedItem } from '../types/feed.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MEDIA_HEIGHT = 260;

interface Props {
  item: FeedItem;
  isVideoPlaying: boolean;
  onHelpful: () => void;
  onDiscussion: () => void;
  onPlace: () => void;
  onUser: () => void;
  onFollow: () => void;
}

export function FeedReviewCard({
  item,
  onHelpful,
  onDiscussion,
  onPlace,
  onUser,
  onFollow,
}: Props) {
  return (
    <View style={styles.card}>
      {/* User row */}
      <View style={styles.userRow}>
        <TouchableOpacity style={styles.userLeft} onPress={onUser} activeOpacity={0.8}>
          <View style={styles.avatar}>
            {item.userAvatarUrl ? (
              <Image source={{ uri: item.userAvatarUrl }} style={styles.avatarImg} />
            ) : (
              <Text style={styles.avatarFallback}>{item.userName[0]?.toUpperCase()}</Text>
            )}
          </View>
          <View>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
          </View>
        </TouchableOpacity>
        {!item.isFollowing && (
          <TouchableOpacity style={styles.followBtn} onPress={onFollow} activeOpacity={0.8}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Media */}
      {item.mediaUrls.length > 0 && (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.mediaScroll}
        >
          {item.mediaUrls.map((url, i) => (
            <Image
              key={i}
              source={{ uri: url }}
              style={styles.mediaImg}
              resizeMode="cover"
            />
          ))}
        </ScrollView>
      )}

      {/* Place + rating */}
      <TouchableOpacity style={styles.placeRow} onPress={onPlace} activeOpacity={0.8}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.placeCategory}</Text>
        </View>
        <Text style={styles.placeName} numberOfLines={1}>
          {item.placeName}
        </Text>
        <View style={styles.ratingRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={[styles.star, i < item.rating && styles.starFilled]}>
              ★
            </Text>
          ))}
        </View>
      </TouchableOpacity>

      {/* Review text */}
      {item.text.length > 0 && (
        <Text style={styles.reviewText} numberOfLines={3}>
          {item.text}
        </Text>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={onHelpful} activeOpacity={0.7}>
          <Text style={[styles.actionText, item.isHelpful && styles.actionActive]}>
            👍 {formatCount(item.helpfulCount)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onDiscussion} activeOpacity={0.7}>
          <Text style={styles.actionText}>💬 {formatCount(item.commentCount)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderBottomWidth: 8,
    borderBottomColor: Colors.grey,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  userLeft: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryDim,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImg: { width: 40, height: 40 },
  avatarFallback: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.md,
    color: Colors.primary,
  },
  userName: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.text,
  },
  date: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  followBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  followText: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.primary,
  },
  mediaScroll: { height: MEDIA_HEIGHT },
  mediaImg: {
    width: SCREEN_WIDTH,
    height: MEDIA_HEIGHT,
  },
  placeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  categoryBadge: {
    backgroundColor: Colors.surfaceSubtle,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radius.sm,
  },
  categoryText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.size.xs,
    color: Colors.primary,
  },
  placeName: {
    flex: 1,
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.md,
    color: Colors.text,
  },
  ratingRow: { flexDirection: 'row' },
  star: { fontSize: 12, color: Colors.border },
  starFilled: { color: '#F5A623' },
  reviewText: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
    lineHeight: 22,
    paddingHorizontal: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
  },
  action: { paddingVertical: 4 },
  actionText: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  actionActive: { color: Colors.primary },
});
