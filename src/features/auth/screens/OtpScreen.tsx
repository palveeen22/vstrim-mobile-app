import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../navigations/AuthStackNavigator';
import { useVerifyOtp } from '../hooks/useVerifyOtp';
import { TelegramBanner } from '../components/TelegramBanner';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';

type Props = NativeStackScreenProps<AuthStackParamList, 'OtpScreen'>;

const OTP_LENGTH = 4;

export function OtpScreen({ route, navigation }: Props) {
  const { phone, method, isNewUser } = route.params;
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const verifyOtp = useVerifyOtp();

  const handleChange = (value: string, index: number) => {
    const char = value.slice(-1);
    const next = [...otp];
    next[index] = char;
    setOtp(next);

    if (char && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const filled = next.join('');
    if (filled.length === OTP_LENGTH && next.every(Boolean)) {
      handleVerify(filled);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    const result = await verifyOtp.mutateAsync({ phone, otp: code });
    if (result.isNewUser) {
      navigation.replace('SetupProfileScreen');
    }
    // if not new user — RTK state updates → selectIsLoggedIn true → RootNavigator switches
  };

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Код подтверждения</Text>
          <Text style={styles.subtitle}>Отправлен на {phone}</Text>

          {method === 'telegram' && <TelegramBanner />}

          <View style={styles.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(ref) => { inputRefs.current[i] = ref; }}
                style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                value={digit}
                onChangeText={(v) => handleChange(v, i)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, i)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                autoFocus={i === 0}
              />
            ))}
          </View>

          {verifyOtp.isError && (
            <Text style={styles.error}>Неверный код. Попробуйте снова.</Text>
          )}

          {verifyOtp.isPending && (
            <Text style={styles.pending}>Проверяем...</Text>
          )}

          <TouchableOpacity style={styles.resend} onPress={handleResend}>
            <Text style={styles.resendText}>Отправить снова</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  back: { marginBottom: Spacing.xl },
  backText: {
    fontSize: 24,
    color: Colors.text,
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
    marginBottom: Spacing.lg,
  },
  otpRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  otpBox: {
    flex: 1,
    height: 60,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    fontSize: Typography.size.xl,
    fontFamily: Typography.fonts.bold,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  otpBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  error: {
    color: Colors.error,
    fontSize: Typography.size.sm,
    fontFamily: Typography.fonts.regular,
    marginBottom: Spacing.sm,
  },
  pending: {
    color: Colors.textMuted,
    fontSize: Typography.size.sm,
    fontFamily: Typography.fonts.regular,
    marginBottom: Spacing.sm,
  },
  resend: { marginTop: Spacing.md },
  resendText: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.md,
    color: Colors.primary,
  },
});
