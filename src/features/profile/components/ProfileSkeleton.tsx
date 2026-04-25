import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from '@/shared/components/ui/Skeleton';
import { Spacing, Radius } from '@/shared/theme/tokens';

export function ProfileSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        <Skeleton width={88} height={88} borderRadius={44} />
      </View>
      <View style={styles.textGroup}>
        <Skeleton width={160} height={20} />
        <Skeleton width={100} height={14} style={{ marginTop: 6 }} />
      </View>
      <View style={styles.statsRow}>
        <Skeleton width={60} height={36} />
        <Skeleton width={60} height={36} />
        <Skeleton width={60} height={36} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: Spacing.lg, gap: Spacing.md },
  avatarRow: { alignItems: 'center' },
  textGroup: { alignItems: 'center', gap: 4 },
  statsRow: { flexDirection: 'row', gap: Spacing.xl, marginTop: Spacing.sm },
});
