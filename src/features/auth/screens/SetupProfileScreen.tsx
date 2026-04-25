import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';
import { useSetupProfile } from '../hooks/useSetupProfile';

export function SetupProfileScreen() {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const setupProfile = useSetupProfile();

  const handleStart = () => {
    if (!displayName.trim() || !username.trim()) return;
    setupProfile.mutate({ displayName: displayName.trim(), username: username.trim() });
  };

  const isValid = displayName.trim().length > 0 && username.trim().length >= 3;

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Создайте профиль</Text>
            <Text style={styles.subtitle}>Вас будут видеть другие пользователи</Text>

            <View style={styles.form}>
              <View style={styles.field}>
                <Text style={styles.label}>Имя</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Как вас зовут?"
                  placeholderTextColor={Colors.textMuted}
                  value={displayName}
                  onChangeText={setDisplayName}
                  maxLength={40}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Username</Text>
                <View style={styles.usernameRow}>
                  <Text style={styles.at}>@</Text>
                  <TextInput
                    style={[styles.input, styles.usernameInput]}
                    placeholder="username"
                    placeholderTextColor={Colors.textMuted}
                    value={username}
                    onChangeText={(t) => setUsername(t.replace(/[^a-z0-9_]/g, '').toLowerCase())}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={30}
                  />
                </View>
                <Text style={styles.hint}>Только строчные буквы, цифры и _</Text>
              </View>
            </View>

            {setupProfile.isError && (
              <Text style={styles.error}>Ошибка. Попробуйте снова.</Text>
            )}
          </ScrollView>

          <View style={styles.bottom}>
            <TouchableOpacity
              style={[styles.button, (!isValid || setupProfile.isPending) && styles.buttonDisabled]}
              onPress={handleStart}
              disabled={!isValid || setupProfile.isPending}
            >
              <Text style={styles.buttonText}>
                {setupProfile.isPending ? 'Сохранение...' : 'Начать'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    flexGrow: 1,
  },
  title: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.xxl,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  form: { gap: Spacing.lg },
  field: { gap: Spacing.xs },
  label: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.textSecondary,
  },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.size.md,
    fontFamily: Typography.fonts.regular,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    height: 52,
  },
  at: {
    fontSize: Typography.size.md,
    color: Colors.textMuted,
    fontFamily: Typography.fonts.medium,
    marginRight: 2,
  },
  usernameInput: {
    flex: 1,
    borderWidth: 0,
    height: '100%',
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  hint: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.xs,
    color: Colors.textMuted,
  },
  error: {
    marginTop: Spacing.md,
    color: Colors.error,
    fontSize: Typography.size.sm,
    fontFamily: Typography.fonts.regular,
  },
  bottom: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  button: {
    backgroundColor: Colors.black,
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: {
    color: Colors.white,
    fontSize: Typography.size.md,
    fontFamily: Typography.fonts.semiBold,
  },
});
