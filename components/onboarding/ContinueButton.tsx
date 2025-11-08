import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  label?: string;
  icon?: string;
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({ 
  onPress, 
  disabled = false,
  label = 'Continue',
  icon
}) => {
  return (
    <Pressable 
      onPress={onPress} 
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <LinearGradient
        colors={disabled ? ['#3B3B3B', '#3B3B3B'] : ['#D657ED', '#FA2AAA']}
        start={{ x: 0, y: 0.109 }}
        end={{ x: 0.957, y: 1 }}
        style={[
          styles.button,
          disabled && styles.buttonDisabled,
        ]}
      >
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {icon && icon + ' '}
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
  },
  pressed: {
    opacity: 0.8,
  },
  button: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  buttonDisabled: {
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  label: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  labelDisabled: {
    opacity: 0.3,
  },
});

