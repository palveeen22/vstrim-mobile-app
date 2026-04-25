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
import { useWriteReview } from '../hooks/useWriteReview';
import { useUpload } from '@/shared/hooks/useUpload';
import { RatingInput } from '../components/RatingInput';
import { MediaPicker } from '../components/MediaPicker';
import { MediaUploadGrid } from '../components/MediaUploadGrid';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';

type Props = StackScreenProps<MapStackParamList, 'WriteReviewScreen'>;

interface MediaItem {
  uri: string;
  mediaId?: string;
  uploading: boolean;
}

export function WriteReviewScreen({ route, navigation }: Props) {
  const { placeId, placeName } = route.params;
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);

  const writeReview = useWriteReview(placeId);
  const { upload } = useUpload();

  const handlePickMedia = async (uri: string, type: string, name: string) => {
    const idx = mediaItems.length;
    setMediaItems((prev) => [...prev, { uri, uploading: true }]);

    try {
      const media = await upload({ uri, type, name });
      setMediaItems((prev) =>
        prev.map((item, i) => (i === idx ? { ...item, mediaId: media.id, uploading: false } : item)),
      );
    } catch {
      setMediaItems((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleRemove = (index: number) => {
    setMediaItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!rating || !text.trim()) return;
    const mediaIds = mediaItems.filter((m) => m.mediaId).map((m) => m.mediaId!);
    writeReview.mutate(
      { placeId, rating, text: text.trim(), mediaIds },
      { onSuccess: () => navigation.goBack() },
    );
  };

  const isUploading = mediaItems.some((m) => m.uploading);
  const isValid = rating > 0 && text.trim().length > 0 && !isUploading;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.cancel}>Отмена</Text>
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>{placeName}</Text>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!isValid || writeReview.isPending}
          >
            <Text style={[styles.publish, (!isValid || writeReview.isPending) && styles.publishDisabled]}>
              {writeReview.isPending ? '...' : 'Опубликовать'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
          <View style={styles.ratingSection}>
            <Text style={styles.ratingLabel}>Ваша оценка</Text>
            <RatingInput value={rating} onChange={setRating} />
          </View>

          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Поделитесь впечатлениями..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            maxLength={1000}
          />

          <MediaUploadGrid items={mediaItems} onRemove={handleRemove} />
          <MediaPicker onPick={handlePickMedia} disabled={mediaItems.length >= 5} />

          {writeReview.isError && (
            <Text style={styles.error}>Ошибка публикации. Попробуйте снова.</Text>
          )}
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
  title: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.md,
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: Spacing.sm,
  },
  cancel: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.md, color: Colors.textSecondary },
  publish: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.md, color: Colors.primary },
  publishDisabled: { opacity: 0.4 },
  form: { padding: Spacing.md, gap: Spacing.lg },
  ratingSection: { gap: Spacing.sm, alignItems: 'center' },
  ratingLabel: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.md, color: Colors.text },
  textInput: {
    minHeight: 140,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  error: { color: Colors.error, fontFamily: Typography.fonts.regular, fontSize: Typography.size.sm },
});
