import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '@/shared/theme/tokens';
import { formatDate } from '@/shared/utils/formatDate';
import type { Comment } from '../types/review.types';

interface Props {
  comment: Comment;
}

export function CommentItem({ comment }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        {comment.userAvatarUrl ? (
          <Image source={{ uri: comment.userAvatarUrl }} style={styles.avatarImg} />
        ) : (
          <Text style={styles.avatarFallback}>{comment.userName[0]?.toUpperCase()}</Text>
        )}
      </View>
      <View style={styles.bubble}>
        <View style={styles.meta}>
          <Text style={styles.name}>{comment.userName}</Text>
          <Text style={styles.date}>{formatDate(comment.createdAt)}</Text>
        </View>
        <Text style={styles.text}>{comment.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: Spacing.sm, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryDim,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarImg: { width: 32, height: 32 },
  avatarFallback: { fontFamily: Typography.fonts.bold, fontSize: Typography.size.sm, color: Colors.primary },
  bubble: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.sm,
    gap: 2,
  },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.sm, color: Colors.text },
  date: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.xs, color: Colors.textMuted },
  text: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.sm, color: Colors.text, lineHeight: 20 },
});
