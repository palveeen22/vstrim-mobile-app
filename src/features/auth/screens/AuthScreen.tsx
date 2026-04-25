import React, { useState } from 'react'
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
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from '@react-native-community/blur'
import { Colors, Spacing, Typography } from '@/shared/theme/tokens'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../navigations/AuthStackNavigator'

type TProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'PhoneScreen'>;
};

export function AuthScreen({ navigation }: TProps) {
  const [phone, setPhone] = useState<string>('')

const handleChange = (value: string) => {
  const cleaned = value.replace(/\D/g, '');

  // optional: kalau user paste nomor dengan 7 di depan
  const normalized = cleaned.startsWith('7')
    ? cleaned.slice(1)
    : cleaned;

  setPhone(normalized);
};

  const handleSubmit = (value: string) => {
    console.log(value);

    if (value === "+799920057") {
      navigation.navigate('OtpScreen', {
        phone: value,
        method: 'sms',
        isNewUser: false,
      });
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/onboard.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={20} />

      <SafeAreaView style={styles.SafeAra}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={styles.container}>

              {/* TITLE */}
              <Text style={styles.title}>
                Введите ваш номер
              </Text>

              {/* INPUT */}
              <View style={styles.inputWrapper}>
                <Text style={styles.flag}>🇷🇺</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={handleChange}
                  maxLength={12}
                />
              </View>
            </View>

            {/* BOTTOM SECTION */}
            <View style={styles.bottom}>
              <Text style={styles.terms}>
                Вводя номер, вы соглашаетесь с{' '}
                <Text style={styles.link}>политикой конфиденциальности</Text> и{' '}
                <Text style={styles.link}>условиями использования</Text>
              </Text>

              <TouchableOpacity onPress={() => handleSubmit(phone)} style={styles.button}>
                <Text style={styles.buttonText}>Поехали</Text>
              </TouchableOpacity>
            </View>

          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  SafeAra: {
    flex: 1
  },
  flex: {
    flex: 1,
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 140,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: Typography.fonts.blackItalic,
    fontSize: Typography.size.xxxl,
    lineHeight: 38,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 55,
  },
  flag: {
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: '#000',
    fontFamily: Typography.fonts.medium
  },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  terms: {
    textAlign: 'center',
    fontSize: 12,
    color: '#333',
    marginBottom: 16,
  },
  link: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#000',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})