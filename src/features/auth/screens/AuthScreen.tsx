import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { Colors, Spacing, Typography } from '@/shared/theme/tokens';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigations/AuthStackNavigator';
import { useSendOtp } from '../hooks/useSendOtp';

type Props = NativeStackScreenProps<AuthStackParamList, 'PhoneScreen'>;

export function AuthScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('');
  const sendOtp = useSendOtp();

  const handleChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const normalized = cleaned.startsWith('7') ? cleaned.slice(1) : cleaned;
    setPhone(normalized);
  };

  const handleSubmit = async () => {
    if (phone.length < 10) return;
    const fullPhone = `+7${phone}`;
    const result = await sendOtp.mutateAsync(fullPhone);
    navigation.navigate('OtpScreen', {
      phone: fullPhone,
      method: result.method,
      isNewUser: result.isNewUser,
    });
  };

  return (
    <ImageBackground
      source={require('@/assets/onboard.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={20} />

      <SafeAreaView style={styles.safeArea}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.container}>
              <Text style={styles.title}>Введите ваш номер</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.flag}>🇷🇺</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={handleChange}
                  maxLength={12}
                  autoFocus
                />
              </View>
              {sendOtp.isError && (
                <Text style={styles.error}>Ошибка. Попробуйте снова.</Text>
              )}
            </View>

            <View style={styles.bottom}>
              <Text style={styles.terms}>
                Вводя номер, вы соглашаетесь с{' '}
                <Text style={styles.link}>политикой конфиденциальности</Text> и{' '}
                <Text style={styles.link}>условиями использования</Text>
              </Text>

              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.button, (phone.length < 10 || sendOtp.isPending) && styles.buttonDisabled]}
                disabled={phone.length < 10 || sendOtp.isPending}
              >
                <Text style={styles.buttonText}>
                  {sendOtp.isPending ? 'Отправка...' : 'Поехали'}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1, justifyContent: 'space-between' },
  background: { flex: 1 },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 140,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontFamily: Typography.fonts.blackItalic,
    fontSize: Typography.size.xxxl,
    lineHeight: 38,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    paddingHorizontal: Spacing.md,
    height: 55,
  },
  flag: { fontSize: 20, marginRight: 10 },
  input: {
    flex: 1,
    fontSize: 20,
    color: Colors.text,
    fontFamily: Typography.fonts.medium,
  },
  error: {
    marginTop: Spacing.sm,
    color: Colors.error,
    fontSize: Typography.size.sm,
    fontFamily: Typography.fonts.regular,
  },
  bottom: { paddingHorizontal: Spacing.lg, paddingBottom: 30 },
  terms: {
    textAlign: 'center',
    fontSize: Typography.size.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  link: { textDecorationLine: 'underline', fontWeight: '500' },
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
