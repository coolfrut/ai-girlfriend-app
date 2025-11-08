import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface StyleCardProps {
  label: string;
  image: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
}

export const StyleCard: React.FC<StyleCardProps> = ({ 
  label, 
  image, 
  selected, 
  onPress 
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={selected ? ['#1D142F', '#EC40C5'] : ['rgba(46, 29, 75, 0)', '#32134B']}
        start={selected ? { x: 0.034, y: 0.017 } : { x: 0.5, y: 0 }}
        end={selected ? { x: 0.946, y: 0.979 } : { x: 0.5, y: 1.037 }}
        style={[
          styles.card,
          selected ? styles.cardSelected : styles.cardUnselected,
        ]}
      >
        <Image 
          source={image} 
          style={[
            styles.image,
            !selected && styles.imageUnselected
          ]} 
          resizeMode="cover" 
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
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
    width: 175,
    height: 300,
  },
  card: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
    padding: 9,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#D05BF8',
  },
  cardUnselected: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 12,
    left: 9,
    top: 9,
    right: 9,
    bottom: 9,
  },
  imageUnselected: {
    opacity: 0.6,
  },
  gradient: {
    position: 'absolute',
    bottom: 9,
    left: 9,
    right: 9,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
});

