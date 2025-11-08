import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
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
        
        <View style={styles.overlay}>
          <View style={styles.playButton}>
            <Play size={24} color="#ffffff" fill="#ffffff" />
          </View>
        </View>

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
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
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

