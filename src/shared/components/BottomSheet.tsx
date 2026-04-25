import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors, Radius } from '@/shared/theme/tokens';

interface Props {
  visible: boolean;
  snapHeight?: number;
  onClose: () => void;
  children: React.ReactNode;
  hideHandle?: boolean;
}

export function BottomSheet({ visible, snapHeight = 320, onClose, children, hideHandle = false }: Props) {
  const translateY = useRef(new Animated.Value(snapHeight)).current;
  const [modalVisible, setModalVisible] = useState(false);

  const open = useCallback(() => {
    setModalVisible(true);
    // tiny delay so Modal is mounted before animating
    requestAnimationFrame(() => {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    });
  }, [translateY]);

  const close = useCallback(() => {
    Animated.timing(translateY, {
      toValue: snapHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setModalVisible(false);
        onClose();
      }
    });
  }, [translateY, snapHeight, onClose]);

  const openRef = useRef(open);
  const closeRef = useRef(close);
  useEffect(() => { openRef.current = open; }, [open]);
  useEffect(() => { closeRef.current = close; }, [close]);

  useEffect(() => {
    if (visible) openRef.current();
    else closeRef.current();
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => g.dy > 5,
      onPanResponderMove: (_, g) => {
        if (g.dy > 0) translateY.setValue(g.dy);
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 80 || g.vy > 0.5) closeRef.current();
        else openRef.current();
      },
    }),
  ).current;

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => closeRef.current()}
    >
      <TouchableWithoutFeedback onPress={() => closeRef.current()}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[styles.sheet, { height: snapHeight, transform: [{ translateY }] }, hideHandle && { paddingTop: 0 }]}
        {...panResponder.panHandlers}
      >
        {!hideHandle && <View style={styles.handle} />}
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingTop: 12,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.border,
    alignSelf: 'center',
    marginBottom: 12,
  },
});
