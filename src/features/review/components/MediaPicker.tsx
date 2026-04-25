import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Colors, Typography, Radius, Spacing } from '@/shared/theme/tokens';

interface Props {
  onPick: (uri: string, type: string, name: string) => void;
  disabled?: boolean;
}

export function MediaPicker({ onPick, disabled }: Props) {
  const handlePress = async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      quality: 0.8,
      selectionLimit: 5,
    });
    result.assets?.forEach((asset) => {
      if (asset.uri) {
        onPick(asset.uri, asset.type ?? 'image/jpeg', asset.fileName ?? 'media.jpg');
      }
    });
  };

  return (
    <TouchableOpacity style={styles.btn} onPress={handlePress} disabled={disabled}>
      <Text style={styles.icon}>📷</Text>
      <Text style={styles.text}>Добавить фото / видео</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    borderStyle: 'dashed',
  },
  icon: { fontSize: 20 },
  text: { fontFamily: Typography.fonts.medium, fontSize: Typography.size.md, color: Colors.textSecondary },
});
