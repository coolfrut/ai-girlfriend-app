import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import MaskedView from '@react-native-masked-view/masked-view';
import { Eye, EyeOff, Image as ImageIcon } from 'lucide-react-native';
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
        
        <BlurView intensity={25} tint="dark" style={styles.blur}>
          <View style={styles.blurOverlay} />
        </BlurView>

        {badge && (
          <View style={styles.badgeContainer}>
            <LinearGradient
              colors={['#471866', '#5b1a45']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.badgeGradient}
            >
              <MaskedView
                maskElement={
                  <Text style={[styles.badgeText, { backgroundColor: 'transparent' }]}>
                    {badge.toUpperCase()}
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#d05bf8', '#ff18a0']}
                  start={{ x: 0.3, y: 0.11 }}
                  end={{ x: 1.17, y: 0.93 }}
                  style={{ flex: 1 }}
                >
                  <Text style={[styles.badgeText, { opacity: 0 }]}>{badge.toUpperCase()}</Text>
                </LinearGradient>
              </MaskedView>
              {badgeTime && (
                <View style={styles.badgeTimeContainer}>
                  <Icon name="clock" size={24} />
                  <MaskedView
                    maskElement={
                      <Text style={[styles.badgeTimeText, { backgroundColor: 'transparent' }]}>
                        {badgeTime}
                      </Text>
                    }
                  >
                    <LinearGradient
                      colors={['#d05bf8', '#ff18a0']}
                      start={{ x: 0.3, y: 0.11 }}
                      end={{ x: 1.17, y: 0.93 }}
                      style={{ flex: 1 }}
                    >
                      <Text style={[styles.badgeTimeText, { opacity: 0 }]}>{badgeTime}</Text>
                    </LinearGradient>
                  </MaskedView>
                </View>
              )}
            </LinearGradient>
          </View>
        )}

        {photoCount && (
          <View style={styles.photoCountBadge}>
            <Text style={styles.photoCountText}>{photoCount}</Text>
            <ImageIcon size={24} color="#ffffff" />
          </View>
        )}

        <View style={styles.lockIconCenter}>
          <EyeOff size={48} color="#ffffff" />
        </View>

        <View style={styles.unlockOverlay}>
          <View style={styles.unlockInfoContainer}>
            {isFree && (
              <View style={styles.proTextContainer}>
                <Text style={styles.unlockTitle}>Get this pack for free with</Text>
                <View style={styles.proContainer}>
                  <View style={styles.proIcon} />
                  <Text style={styles.proText}>PRO</Text>
                </View>
              </View>
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
                  <Icon name="star" size={24} />
                  <Text style={styles.starsText}>{stars} Stars</Text>
                </View>
                {isFree && (
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeText}>FREE</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
    width: 358,
    height: 358,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f03bbd',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  blurOverlay: {
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
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 14,
  },
  badgeTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  badgeTimeText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 14,
  },
  photoCountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingRight: 2,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  photoCountText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  lockIconCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -48 }],
  },
  unlockOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    gap: 12,
  },
  unlockInfoContainer: {
    gap: 12,
  },
  proTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  unlockTitle: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    lineHeight: 18,
  },
  proContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  proIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  proText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 18,
  },
  unlockButton: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  unlockButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    gap: 8,
  },
  unlockButtonTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 18,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  starsText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    lineHeight: 18,
    textDecorationLine: 'line-through',
  },
  freeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  freeText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    lineHeight: 18,
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

