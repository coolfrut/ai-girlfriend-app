import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Icon from './Icon';

interface ChatsNavBarProps {
  onClaimPress?: () => void;
  stars?: number;
}

export default function ChatsNavBar({ onClaimPress, stars = 3 }: ChatsNavBarProps) {
  return (
    <View style={styles.wrapper}>
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
        <View style={styles.logoRow}>
          <MaskedView
            maskElement={
              <Text style={[styles.logoText, { backgroundColor: 'transparent' }]}>AI</Text>
            }
          >
            <LinearGradient
              colors={['#D05BF8', '#FF18A0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.logoText, { opacity: 0 }]}>AI</Text>
            </LinearGradient>
          </MaskedView>
          <Text style={styles.logoText}> Tinder</Text>
        </View>
      </View>

      {/* Stars Button */}
      <TouchableOpacity style={styles.starsButton}>
        <View style={styles.starsContent}>
          <Icon name="star" size={24} />
          <Text style={styles.starsText}>{stars}</Text>
          <Image
            source={require('@/assets/icons/plus.png')}
            style={styles.plusIcon}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0f0e0f',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 56,
  },
  claimButton: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  claimGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 16,
    paddingTop: 6,
    paddingBottom: 6,
    gap: 8,
  },
  claimText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 20,
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: 4,
    paddingTop: 6,
    paddingBottom: 6,
  },
  starsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starsText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 20,
  },
  plusIcon: {
    width: 24,
    height: 24,
  },
});


