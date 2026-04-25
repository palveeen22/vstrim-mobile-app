import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import type { MapStackParamList } from '@/features/map/navigation/MapStackNavigator';
import { useComments } from '../hooks/useComments';
import { CommentItem } from '../components/CommentItem';
import { CommentInput } from '../components/CommentInput';
import { Colors, Spacing, Typography } from '@/shared/theme/tokens';

type Props = StackScreenProps<MapStackParamList, 'DiscussionScreen'>;

export function DiscussionScreen({ route, navigation }: Props) {
  const { reviewId } = route.params;
  const { data, isLoading, fetchNextPage, hasNextPage, addComment } = useComments(reviewId);

  const comments = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Text style={styles.back} onPress={() => navigation.goBack()}>← </Text>
          <Text style={styles.title}>Обсуждение</Text>
        </View>

        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <CommentItem comment={item} />}
            onEndReached={() => hasNextPage && fetchNextPage()}
            onEndReachedThreshold={0.3}
            contentContainerStyle={comments.length === 0 ? styles.emptyContainer : styles.list}
            ListEmptyComponent={
              <Text style={styles.empty}>Будьте первым, кто оставит комментарий</Text>
            }
            keyboardShouldPersistTaps="handled"
          />
        )}

        <CommentInput
          onSubmit={(text) => addComment.mutate(text)}
          isPending={addComment.isPending}
        />
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
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.sm,
  },
  back: { fontSize: 20, color: Colors.text },
  title: { fontFamily: Typography.fonts.semiBold, fontSize: Typography.size.md, color: Colors.text },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { paddingVertical: Spacing.sm },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl },
  empty: { fontFamily: Typography.fonts.regular, fontSize: Typography.size.md, color: Colors.textMuted, textAlign: 'center' },
});
