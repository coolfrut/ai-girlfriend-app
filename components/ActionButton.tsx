import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';

interface ActionButtonProps {
  text: string;
  onPress?: () => void;
  icon?: boolean;
}

export default function ActionButton({ text, onPress, icon = true }: ActionButtonProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#471866', '#5b1a45']}
        start={{ x: 0.02, y: 0 }}
        end={{ x: 0.97, y: 1.0 }}
        style={styles.gradient}
      >
        {icon && <Icon name="fire" size={24} />}
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f03bbd',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
});

