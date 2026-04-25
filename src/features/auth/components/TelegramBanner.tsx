import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/shared/theme/tokens';

export function TelegramBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.icon}>✈️</Text>
      <Text style={styles.text}>Код отправлен в Telegram</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  icon: {
    fontSize: 18,
  },
  text: {
    fontFamily: Typography.fonts.medium,
    fontSize: Typography.size.sm,
    color: Colors.blueDark,
  },
});
