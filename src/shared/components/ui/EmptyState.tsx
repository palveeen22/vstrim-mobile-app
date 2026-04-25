import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/shared/theme/tokens';

interface Props {
  emoji?: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ emoji = '🗺️', title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.sm,
  },
  emoji: { fontSize: 40 },
  title: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.lg,
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
