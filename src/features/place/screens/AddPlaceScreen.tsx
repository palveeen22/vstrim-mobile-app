import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import type { MapStackParamList } from '@/features/map/navigation/MapStackNavigator';
import { useMutation } from '@tanstack/react-query';
import { placeApi } from '../api/place.api';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';
import { CATEGORIES } from '@/shared/constants/categories';

type Props = StackScreenProps<MapStackParamList, 'AddPlaceScreen'>;

export function AddPlaceScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const create = useMutation({
    mutationFn: () =>
      placeApi.createPlace({ name, category, address, lat: 0, lng: 0, description }),
    onSuccess: () => navigation.goBack(),
  });

  const isValid = name.trim() && category && address.trim();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancel}>Отмена</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Добавить место</Text>
          <TouchableOpacity
            onPress={() => create.mutate()}
            disabled={!isValid || create.isPending}
          >
            <Text style={[styles.save, (!isValid || create.isPending) && styles.saveDisabled]}>
              {create.isPending ? '...' : 'Сохранить'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <View style={styles.field}>
            <Text style={styles.label}>Название</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Название места"
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Категория</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catChip, category === cat.id && styles.catChipActive]}
                  onPress={() => setCategory(cat.id)}
                >
                  <Text style={styles.catIcon}>{cat.icon}</Text>
                  <Text style={[styles.catName, category === cat.id && styles.catNameActive]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Адрес</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Введите адрес"
              placeholderTextColor={Colors.textMuted}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Описание (необязательно)</Text>
            <TextInput
              style={[styles.input, styles.textarea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Расскажите об этом месте"
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.md, color: Colors.text },
  cancel: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.md, color: Colors.textSecondary },
  save: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.md, color: Colors.primary },
  saveDisabled: { opacity: 0.4 },
  form: { padding: Spacing.md, gap: Spacing.lg },
  field: { gap: Spacing.xs },
  label: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.sm, color: Colors.textSecondary },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  textarea: { height: 100, paddingTop: Spacing.sm },
  catScroll: { marginTop: 4 },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.xs,
    backgroundColor: Colors.white,
  },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catIcon: { fontSize: 16 },
  catName: { fontFamily: Typography.fonts.medium, fontSize: Typography.size.sm, color: Colors.text },
  catNameActive: { color: Colors.white },
});
