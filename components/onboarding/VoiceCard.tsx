import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';

interface VoiceCardProps {
  label: string;
  emoji: string;
  selected: boolean;
  onPress: () => void;
  isPlaying?: boolean;
}

export const VoiceCard: React.FC<VoiceCardProps> = ({ 
  label, 
  emoji,
  selected, 
  onPress,
  isPlaying = false
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {selected && <View style={styles.glow} />}
      <LinearGradient
        colors={selected ? ['#1D142F', '#EC40C5'] : ['rgba(46, 29, 75, 0)', '#32134B']}
        start={selected ? { x: 0.508, y: 0.018 } : { x: 0.5, y: 0 }}
        end={selected ? { x: 0.508, y: 1 } : { x: 0.5, y: 1.037 }}
        style={[
          styles.card,
          selected ? styles.cardSelected : styles.cardUnselected,
        ]}
      >
        <LinearGradient
          colors={['#D558EE', '#F437B6']}
          start={{ x: -0.004, y: 0 }}
          end={{ x: 0.945, y: 1 }}
          style={styles.playButton}
        >
          {selected ? (
            <Image 
              source={require('@/assets/onboarding/voice/pause-icon.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          ) : (
            <Image 
              source={require('@/assets/onboarding/voice/play-icon.png')}
              style={styles.icon}
              resizeMode="contain"
            />
          )}
        </LinearGradient>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{`${label} ${emoji}`}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 84,
  },
  glow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    backgroundColor: '#D05BF8',
    borderRadius: 12,
    zIndex: -1,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 13,
  },
  cardSelected: {
    borderWidth: 1,
    borderColor: '#D05BF8',
  },
  cardUnselected: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  labelContainer: {
    marginTop: 4,
    paddingHorizontal: 4,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 16,
  },
});

