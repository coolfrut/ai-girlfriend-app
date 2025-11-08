import React, { useRef, useCallback } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AgeSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const AgeSlider: React.FC<AgeSliderProps> = ({ value, onChange }) => {
  const sliderRef = useRef<View>(null);
  const sliderWidth = useRef(0);
  const sliderX = useRef(0);

  const handleLayout = useCallback((event: any) => {
    const { width, x } = event.nativeEvent.layout;
    sliderWidth.current = width;
    sliderX.current = x;
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        updateValue(evt.nativeEvent.pageX);
      },
      onPanResponderMove: (evt) => {
        updateValue(evt.nativeEvent.pageX);
      },
    })
  ).current;

  const updateValue = (pageX: number) => {
    const position = pageX - sliderX.current;
    const percentage = Math.max(0, Math.min(1, position / sliderWidth.current));
    const newValue = Math.round(18 + percentage * (55 - 18));
    onChange(newValue);
  };

  const thumbPosition = ((value - 18) / (55 - 18)) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.tagContainer}>
        <Text style={styles.tagText}>{value} years</Text>
      </View>
      
      <View style={styles.sliderRow}>
        <Text style={styles.ageLabel}>18+</Text>
        
        <View 
          style={styles.sliderWrapper}
          onLayout={handleLayout}
          ref={sliderRef}
          {...panResponder.panHandlers}
        >
          <View style={styles.sliderTrack} />
          <LinearGradient
            colors={['#D05BF8', '#FF18A0']}
            start={{ x: 0.304, y: 0.114 }}
            end={{ x: 1.169, y: 0.928 }}
            style={[
              styles.filledTrack,
              { width: `${thumbPosition}%` }
            ]}
          />
          <View style={[styles.thumbContainer, { left: `${thumbPosition}%` }]}>
            <LinearGradient
              colors={['#D05BF8', '#FF18A0']}
              start={{ x: 0.304, y: 0.114 }}
              end={{ x: 1.169, y: 0.928 }}
              style={styles.thumb}
            />
          </View>
        </View>
        
        <Text style={styles.ageLabel}>55+</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  tagContainer: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 68,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 12,
  },
  tagText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ageLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    width: 32,
    textAlign: 'center',
    lineHeight: 32,
  },
  sliderWrapper: {
    flex: 1,
    height: 32,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 25,
  },
  filledTrack: {
    position: 'absolute',
    left: 0,
    height: 12,
    borderRadius: 25,
  },
  thumbContainer: {
    position: 'absolute',
    width: 24,
    height: 24,
    marginLeft: -12,
    top: 4,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
});

