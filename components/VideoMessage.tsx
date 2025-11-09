import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Play } from 'lucide-react-native';

interface VideoMessageProps {
  image: ImageSourcePropType;
  time: string;
  duration?: string;
  onPress?: () => void;
}

export default function VideoMessage({ image, time, duration = 'Video', onPress }: VideoMessageProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.videoContainer} onPress={onPress} activeOpacity={0.8}>
        <Image source={image} style={styles.videoImage} resizeMode="cover" />
        
        <BlurView intensity={25} tint="dark" style={styles.blur}>
          <View style={styles.blurOverlay} />
        </BlurView>

        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{duration}</Text>
        </View>

        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginBottom: 12,
  },
  videoContainer: {
    width: 320,
    height: 420,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#f03bbd',
  },
  videoImage: {
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
  durationBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
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

