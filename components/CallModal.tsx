import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';

interface CallModalProps {
  visible: boolean;
  onClose: () => void;
  name: string;
  avatar: ImageSourcePropType;
  isListening?: boolean;
}

export default function CallModal({ visible, onClose, name, avatar, isListening = false }: CallModalProps) {
  const [timer, setTimer] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (visible && isListening) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [visible, isListening]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#1a1a1a', '#0f0e0f']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.modal}
        >
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <View style={styles.closeIcon} />
          </TouchableOpacity>

          {/* Emojis */}
          <View style={styles.emojiRow}>
            <Text style={styles.emoji}>🔥</Text>
            <Text style={styles.emoji}>🐶</Text>
            <Text style={styles.emoji}>💖</Text>
            <Text style={styles.emoji}>✨</Text>
          </View>

          {/* Encryption tip */}
          {isListening && (
            <View style={styles.tipContainer}>
              <View style={styles.tipArrow} />
              <View style={styles.tipContent}>
                <Icon name="lock" size={24} />
                <Text style={styles.tipText}>Encryption key of this call</Text>
              </View>
            </View>
          )}

          {/* Call Info */}
          <View style={styles.callInfo}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.timerText}>{formatTime(timer)}</Text>

            {/* Avatar with indicator */}
            <View style={styles.avatarContainer}>
              <View style={[
                styles.avatarBorder,
                isListening ? styles.avatarBorderListening : styles.avatarBorderRinging
              ]}>
                <Image source={avatar} style={styles.avatar} resizeMode="cover" />
              </View>
            </View>

            {/* Status tag */}
            <View style={styles.statusTag}>
              <View style={[
                styles.statusDot,
                isListening ? styles.statusDotListening : styles.statusDotRinging
              ]} />
              <Text style={[
                styles.statusText,
                isListening ? styles.statusTextListening : styles.statusTextRinging
              ]}>
                {isListening ? 'Listening' : 'Ringing...'}
              </Text>
            </View>
          </View>

          {/* Action buttons */}
          <View style={styles.actionsRow}>
            <View style={styles.actionButton}>
              <TouchableOpacity
                style={[
                  styles.roundButton,
                  isMuted ? styles.mutedButton : styles.normalButton
                ]}
                onPress={() => setIsMuted(!isMuted)}
              >
                <Icon name="micOff" size={24} />
              </TouchableOpacity>
              <Text style={styles.actionLabel}>Mute</Text>
            </View>

            <View style={styles.actionButton}>
              <TouchableOpacity style={styles.endButton} onPress={onClose}>
                <Icon name="decline" size={24} />
              </TouchableOpacity>
              <Text style={styles.actionLabel}>End</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 591,
    paddingHorizontal: 25,
    paddingTop: 16,
    paddingBottom: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  emoji: {
    fontSize: 24,
    lineHeight: 24,
  },
  callInfo: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 60,
  },
  nameText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 32,
    marginBottom: 4,
  },
  timerText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarBorder: {
    width: 144,
    height: 144,
    borderRadius: 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  avatarBorderListening: {
    borderColor: '#ccb047',
  },
  avatarBorderRinging: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  statusTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 68,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotListening: {
    backgroundColor: '#ccb047',
  },
  statusDotRinging: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },
  statusTextListening: {
    color: '#ccb047',
  },
  statusTextRinging: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
  },
  actionButton: {
    alignItems: 'center',
    gap: 16,
  },
  roundButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  normalButton: {
    backgroundColor: '#ffffff',
  },
  mutedButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  endButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eb5546',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  tipContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  tipArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: -1,
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  tipText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 12,
  },
});

