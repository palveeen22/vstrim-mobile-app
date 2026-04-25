import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { Spacing, Radius } from '@/shared/theme/tokens';

export function FeedSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.userRow}>
        <Skeleton width={40} height={40} borderRadius={20} />
        <View style={styles.userMeta}>
          <Skeleton width={120} height={14} />
          <Skeleton width={80} height={11} style={{ marginTop: 4 }} />
        </View>
      </View>
      <Skeleton width="100%" height={260} borderRadius={0} />
      <View style={styles.body}>
        <Skeleton width={200} height={14} />
        <Skeleton width="100%" height={13} style={{ marginTop: 6 }} />
        <Skeleton width="80%" height={13} style={{ marginTop: 4 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { paddingBottom: Spacing.md, gap: Spacing.sm },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  userMeta: { gap: 4 },
  body: { paddingHorizontal: Spacing.md, gap: Spacing.xs },
});
