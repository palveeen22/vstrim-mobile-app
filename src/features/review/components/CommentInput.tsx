import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/shared/theme/tokens';

interface Props {
  onSubmit: (text: string) => void;
  isPending?: boolean;
}

export function CommentInput({ onSubmit, isPending }: Props) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Написать комментарий..."
        placeholderTextColor={Colors.textMuted}
        multiline
        maxLength={500}
      />
      <TouchableOpacity
        style={[styles.send, (!text.trim() || isPending) && styles.sendDisabled]}
        onPress={handleSend}
        disabled={!text.trim() || isPending}
      >
        <Text style={styles.sendText}>→</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  send: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendDisabled: { opacity: 0.4 },
  sendText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
});
