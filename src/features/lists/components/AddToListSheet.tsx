import React, { useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, Typography, Radius } from '@/shared/theme/tokens';
import { BottomSheet } from '@/shared/components/BottomSheet';
import { useMyLists } from '../hooks/useMyLists';
import { useAddToList } from '../hooks/useAddToList';
import type { PlaceList } from '../types/lists.types';

interface Props {
  visible: boolean;
  placeId: string;
  onClose: () => void;
  onCreateNew: () => void;
}

export function AddToListSheet({ visible, placeId, onClose, onCreateNew }: Props) {
  const { data: lists, isLoading } = useMyLists();
  const { mutate: addToList, isPending } = useAddToList();

  const handleSelect = useCallback(
    (listId: string) => {
      addToList({ listId, placeId }, { onSuccess: onClose });
    },
    [placeId, addToList, onClose],
  );

  return (
    <BottomSheet visible={visible} onClose={onClose} snapHeight={420}>
      <View style={styles.header}>
        <Text style={styles.title}>Save to list</Text>
        <TouchableOpacity onPress={onCreateNew} activeOpacity={0.8}>
          <Text style={styles.createText}>+ New list</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color={Colors.primary} />
      ) : (
        <FlatList
          data={lists ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: PlaceList }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSelect(item.id)}
              disabled={isPending}
              activeOpacity={0.8}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCount}>{item.placeCount} places</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No lists yet. Create one!</Text>
          }
          style={styles.list}
        />
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontFamily: Typography.fonts.bold,
    fontSize: Typography.size.lg,
    color: Colors.text,
  },
  createText: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.primary,
  },
  loader: { marginVertical: Spacing.xl },
  list: { maxHeight: 300 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemName: {
    fontFamily: Typography.fonts.semiBold,
    fontSize: Typography.size.md,
    color: Colors.text,
  },
  itemCount: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.sm,
    color: Colors.textMuted,
  },
  empty: {
    fontFamily: Typography.fonts.regular,
    fontSize: Typography.size.md,
    color: Colors.textMuted,
    textAlign: 'center',
    padding: Spacing.xl,
  },
});
