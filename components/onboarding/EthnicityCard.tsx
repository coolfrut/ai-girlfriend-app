import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface EthnicityCardProps {
  label: string;
  image: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
}

export const EthnicityCard: React.FC<EthnicityCardProps> = ({ 
  label, 
  image, 
  selected, 
  onPress 
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
        <Image source={image} style={styles.image} resizeMode="stretch" />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.8)', selected ? 'rgba(236, 64, 197, 0)' : 'rgba(43, 21, 66, 0)']}
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
    width: '100%',
    height: 137,
    marginBottom: 8,
  },
  glow: {
    position: 'absolute',
    top: 6,
    left: 8,
    right: 8,
    bottom: 6,
    backgroundColor: '#D05BF8',
    borderRadius: 22,
    zIndex: -1,
  },
  card: {
    flex: 1,
    borderRadius: 22,
    overflow: 'hidden',
  },
  cardSelected: {
    borderWidth: 1,
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
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
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

