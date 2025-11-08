import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';

interface ChatsNavBarProps {
  onClaimPress?: () => void;
  stars?: number;
}

export default function ChatsNavBar({ onClaimPress, stars = 3 }: ChatsNavBarProps) {
  return (
    <View style={styles.container}>
      {/* Claim Button */}
      <TouchableOpacity style={styles.claimButton} onPress={onClaimPress}>
        <LinearGradient
          colors={['#301866', '#5b1a3d']}
          start={{ x: 0.07, y: 0.04 }}
          end={{ x: 0.91, y: 1.0 }}
          style={styles.claimGradient}
        >
          <Icon name="gift" size={24} />
          <Text style={styles.claimText}>Claim</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Ai Tinder</Text>
      </View>

      {/* Stars Button */}
      <TouchableOpacity style={styles.starsButton}>
        <View style={styles.starsContent}>
          <Icon name="star" size={24} />
          <Text style={styles.starsText}>{stars}</Text>
          <View style={styles.plusBadge}>
            <LinearGradient
              colors={['#d05bf8', '#ff18a0']}
              start={{ x: 0.3, y: 0.11 }}
              end={{ x: 1.17, y: 0.93 }}
              style={styles.plusGradient}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0f0e0f',
  },
  claimButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  claimGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  claimText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 16,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: -0.37,
  },
  starsButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 43,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  starsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 16,
  },
  plusBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  plusGradient: {
    width: '100%',
    height: '100%',
  },
});


