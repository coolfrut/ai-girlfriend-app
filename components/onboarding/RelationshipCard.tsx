import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface RelationshipCardProps {
  label: string;
  icon: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
}

export const RelationshipCard: React.FC<RelationshipCardProps> = ({ 
  label, 
  icon,
  selected, 
  onPress 
}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={selected ? ['#1D142F', '#EC40C5'] : ['rgba(46, 29, 75, 0)', '#32134B']}
        start={selected ? { x: 0.508, y: 0.018 } : { x: 0.5, y: 0 }}
        end={selected ? { x: 0.508, y: 1 } : { x: 0.5, y: 1.037 }}
        style={[
          styles.card,
          selected ? styles.cardSelected : styles.cardUnselected,
        ]}
      >
        <View style={styles.content}>
          <LinearGradient
            colors={['#D558EE', '#F437B6']}
            start={{ x: -0.004, y: 0 }}
            end={{ x: 0.945, y: 1 }}
            style={styles.iconContainer}
          >
            <Image 
              source={icon}
              style={styles.icon}
              resizeMode="contain"
            />
          </LinearGradient>
          <Text style={styles.label}>{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48.5%',
    height: 112,
    marginBottom: 8,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardSelected: {
    borderWidth: 1,
    borderColor: '#D05BF8',
  },
  cardUnselected: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  content: {
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
  },
});

