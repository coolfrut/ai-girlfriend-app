import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Lock, Star } from 'lucide-react-native';
import Icon from './Icon';

interface LockedContentProps {
  image: ImageSourcePropType;
  time: string;
  stars?: number;
  isFree?: boolean;
  badge?: string;
  badgeTime?: string;
  photoCount?: number;
  onUnlockPress?: () => void;
}

export default function LockedContent({
  image,
  time,
  stars = 39,
  isFree = false,
  badge,
  badgeTime,
  photoCount,
  onUnlockPress,
}: LockedContentProps) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        
        <BlurView intensity={80} tint="dark" style={styles.blur} />

        {badge && (
          <View style={styles.badgeContainer}>
            <LinearGradient
              colors={['#471866', '#5b1a45']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.badgeGradient}
            >
              <Text style={styles.badgeText}>{badge}</Text>
              {badgeTime && (
                <View style={styles.badgeTimeContainer}>
                  <Icon name="clock" size={24} />
                  <Text style={styles.badgeTimeText}>{badgeTime}</Text>
                </View>
              )}
            </LinearGradient>
          </View>
        )}

        {photoCount && (
          <View style={styles.photoCountBadge}>
            <Text style={styles.photoCountText}>{photoCount}</Text>
          </View>
        )}

        <View style={styles.unlockOverlay}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)']}
            style={styles.overlayGradient}
          >
            <View style={styles.lockIcon}>
              <Lock size={32} color="#ffffff" />
            </View>

            <View style={styles.unlockInfoContainer}>
              {!isFree && (
                <Text style={styles.unlockTitle}>Get this pack for free with PRO</Text>
              )}

              <TouchableOpacity
                style={styles.unlockButton}
                onPress={onUnlockPress}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#d657ed', '#fa2aaa']}
                  start={{ x: 0, y: 0.11 }}
                  end={{ x: 0.96, y: 1.0 }}
                  style={styles.unlockButtonGradient}
                >
                  <Text style={styles.unlockButtonTitle}>Unlock for</Text>
                  <View style={styles.starsContainer}>
                    <Star size={20} color="#ffffff" />
                    <Text style={styles.starsText}>{stars} Stars</Text>
                  </View>
                  {isFree && (
                    <View style={styles.freeBadge}>
                      <Text style={styles.freeText}>Free</Text>
                    </View>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  contentContainer: {
    width: 320,
    height: 420,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f03bbd',
  },
  badgeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8,
  },
  badgeText: {
    color: '#d05bf8',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  badgeTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeTimeText: {
    color: '#d05bf8',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  photoCountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  photoCountText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  unlockOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
    overflow: 'hidden',
  },
  overlayGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    marginBottom: 20,
  },
  unlockInfoContainer: {
    width: '90%',
    alignItems: 'center',
    gap: 8,
  },
  unlockTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    textAlign: 'center',
  },
  unlockButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  unlockButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  unlockButtonTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  starsText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  freeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  freeText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
  timeBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
});

