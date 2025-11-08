import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  totalSteps, 
  currentStep 
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View key={index} style={styles.indicatorWrapper}>
          {index < currentStep ? (
            <LinearGradient
              colors={['#FF792D', '#E555C5']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.indicator}
            />
          ) : (
            <View style={[styles.indicator, styles.indicatorInactive]} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  indicatorWrapper: {
    width: 48,
    height: 16,
  },
  indicator: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  indicatorInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
});

