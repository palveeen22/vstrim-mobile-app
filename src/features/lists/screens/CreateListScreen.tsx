import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import type { ProfileStackParamList } from '@/features/profile/navigation/ProfileStackNavigator';
import { useCreateList } from '../hooks/useCreateList';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';

type Props = StackScreenProps<ProfileStackParamList, 'CreateListScreen'>;

export function CreateListScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const { mutate: createList, isPending } = useCreateList();

  const handleCreate = () => {
    if (!name.trim()) return;
    createList(
      { name: name.trim(), description: description.trim() || undefined, isPublic },
      { onSuccess: () => navigation.goBack() },
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingBottom: insets.bottom }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>New List</Text>
        <TouchableOpacity
          onPress={handleCreate}
          disabled={!name.trim() || isPending}
          activeOpacity={0.8}
        >
          {isPending ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <Text style={[styles.save, !name.trim() && styles.saveDisabled]}>Create</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. Favorite cafes"
            placeholderTextColor={Colors.textMuted}
            maxLength={60}
            autoFocus
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Description (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="What's this list about?"
            placeholderTextColor={Colors.textMuted}
            multiline
            maxLength={200}
          />
        </View>

        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.label}>Public list</Text>
            <Text style={styles.toggleSub}>Anyone can see this list</Text>
          </View>
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ true: Colors.primary, false: Colors.border }}
            thumbColor={Colors.white}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cancel: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
  },
  title: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.lg,
    color: Colors.text,
  },
  save: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.md,
    color: Colors.primary,
  },
  saveDisabled: { color: Colors.textMuted },
  body: { flex: 1, padding: Spacing.md, gap: Spacing.lg },
  field: { gap: Spacing.xs },
  label: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.text,
  },
  textArea: { height: 88, textAlignVertical: 'top' },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleSub: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
