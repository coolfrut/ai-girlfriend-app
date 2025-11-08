import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface OptionCardProps {
  label: string;
  image?: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
  size?: '3x3' | '4x3';
}

export const OptionCard: React.FC<OptionCardProps> = ({ 
  label, 
  image, 
  selected, 
  onPress,
  size = '4x3'
}) => {
  const width = size === '3x3' ? 114 : 84;
  const height = 120;

  return (
    <Pressable onPress={onPress} style={[styles.container, { width, height }]}>
      {selected && <View style={[styles.glow, { width: width - 10, height: height - 13 }]} />}
      <LinearGradient
        colors={selected ? ['#1D142F', '#EC40C5'] : ['rgba(46, 29, 75, 0)', '#32134B']}
        start={{ x: 0.508, y: 0.018 }}
        end={{ x: 0.508, y: 1 }}
        style={[
          styles.card,
          selected && styles.cardSelected,
        ]}
      >
        {image && <Image source={image} style={styles.image} resizeMode="cover" />}
        <LinearGradient
          colors={selected ? ['rgba(0, 0, 0, 0.9)', 'rgba(236, 64, 197, 0)'] : ['rgba(0, 0, 0, 0.8)', 'rgba(43, 21, 66, 0)']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          style={styles.gradient}
        >
          <Text style={styles.label}>{label}</Text>
        </LinearGradient>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  glow: {
    position: 'absolute',
    top: 6,
    left: 5,
    backgroundColor: '#D05BF8',
    borderRadius: 12,
    zIndex: -1,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  cardSelected: {
    borderColor: '#D05BF8',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 12,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

