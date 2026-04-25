import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export function PhoneInput() {
  const [digits, setDigits] = useState<string>('')

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 10)

    let formatted = '+7'

    if (cleaned.length > 0) {
      formatted += ' (' + cleaned.slice(0, 3)
    }
    if (cleaned.length >= 3) {
      formatted += ') ' + cleaned.slice(3, 6)
    }
    if (cleaned.length >= 6) {
      formatted += '-' + cleaned.slice(6, 8)
    }
    if (cleaned.length >= 8) {
      formatted += '-' + cleaned.slice(8, 10)
    }

    return formatted
  }

  const handleChange = (text: string) => {
    const numbersOnly = text.replace(/\D/g, '')

    let normalized = numbersOnly
    if (numbersOnly.startsWith('7') || numbersOnly.startsWith('8')) {
      normalized = numbersOnly.slice(1)
    }

    setDigits(normalized)
  }

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.flag}>🇷🇺</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={formatPhone(digits)}
        onChangeText={handleChange}
        placeholder="+7 (___) ___-__-__"
        placeholderTextColor="#999"
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 16,
  },
})