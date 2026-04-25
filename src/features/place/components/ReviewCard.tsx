import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/shared/theme/tokens';
import { ReviewMediaRow } from './ReviewMediaRow';
import { formatDate } from '@/shared/utils/formatDate';
import { formatCount } from '@/shared/utils/formatCount';
import type { Review } from '@/features/review/types/review.types';

interface Props {
  review: Review;
  onHelpful: () => void;
  onDiscussion: () => void;
}

export function ReviewCard({ review, onHelpful, onDiscussion }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          {review.userAvatarUrl ? (
            <Image source={{ uri: review.userAvatarUrl }} style={styles.avatarImg} />
          ) : (
            <Text style={styles.avatarFallback}>{review.userName[0]?.toUpperCase()}</Text>
          )}
        </View>
        <View style={styles.meta}>
          <Text style={styles.userName}>{review.userName}</Text>
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        </View>
        <View style={styles.stars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={[styles.star, i < review.rating && styles.starFilled]}>★</Text>
          ))}
        </View>
      </View>

      <Text style={styles.text}>{review.text}</Text>

      <ReviewMediaRow mediaUrls={review.mediaUrls} />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={onHelpful}>
          <Text style={[styles.actionText, review.isHelpful && styles.actionActive]}>
            👍 {formatCount(review.helpfulCount)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onDiscussion}>
          <Text style={styles.actionText}>💬 {formatCount(review.commentCount)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryDim,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarImg: { width: 36, height: 36 },
  avatarFallback: { fontFamily: Typography.fonts.bold, fontSize: Typography.size.md, color: Colors.primary },
  meta: { flex: 1 },
  userName: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.sm, color: Colors.text },
  date: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.xs, color: Colors.textMuted },
  stars: { flexDirection: 'row' },
  star: { fontSize: 14, color: Colors.border },
  starFilled: { color: '#F5A623' },
  text: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.md, color: Colors.text, lineHeight: 22 },
  actions: { flexDirection: 'row', gap: Spacing.md },
  action: { paddingVertical: 4 },
  actionText: { fontFamily: Typography.fonts.medium, fontSize: Typography.size.sm, color: Colors.textSecondary },
  actionActive: { color: Colors.primary },
});
