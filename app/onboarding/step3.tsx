import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { OptionCard } from '@/components/onboarding/OptionCard';
import { ContinueButton } from '@/components/onboarding/ContinueButton';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function Step3Screen() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const handleContinue = () => {
    if (data.bodyType && data.breastSize && data.bootySize) {
      router.push('/onboarding/step4');
    }
  };

  return (
    <ImageBackground 
      source={require('@/assets/onboarding/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ProgressIndicator totalSteps={6} currentStep={3} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Body Type */}
          <Text style={styles.heading}>Choose body type</Text>
          <View style={styles.gridContainer}>
            <OptionCard
              label="Slim"
              image={require('@/assets/onboarding/body/slim.png')}
              selected={data.bodyType === 'slim'}
              onPress={() => updateData('bodyType', 'slim')}
              size="4x3"
            />
            <OptionCard
              label="Athletic"
              image={require('@/assets/onboarding/body/athletic.png')}
              selected={data.bodyType === 'athletic'}
              onPress={() => updateData('bodyType', 'athletic')}
              size="4x3"
            />
            <OptionCard
              label="Curvy"
              image={require('@/assets/onboarding/body/curvy.png')}
              selected={data.bodyType === 'curvy'}
              onPress={() => updateData('bodyType', 'curvy')}
              size="4x3"
            />
            <OptionCard
              label="Thicc"
              image={require('@/assets/onboarding/body/thicc.png')}
              selected={data.bodyType === 'thicc'}
              onPress={() => updateData('bodyType', 'thicc')}
              size="4x3"
            />
          </View>

          {/* Breast Size */}
          <Text style={[styles.heading, styles.headingSpaced]}>Choose breast size</Text>
          <View style={styles.gridContainer}>
            <OptionCard
              label="Small"
              image={require('@/assets/onboarding/breast/small.png')}
              selected={data.breastSize === 'small'}
              onPress={() => updateData('breastSize', 'small')}
              size="4x3"
            />
            <OptionCard
              label="Medium"
              image={require('@/assets/onboarding/breast/medium.png')}
              selected={data.breastSize === 'medium'}
              onPress={() => updateData('breastSize', 'medium')}
              size="4x3"
            />
            <OptionCard
              label="Large"
              image={require('@/assets/onboarding/breast/large.png')}
              selected={data.breastSize === 'large'}
              onPress={() => updateData('breastSize', 'large')}
              size="4x3"
            />
            <OptionCard
              label="Huge"
              image={require('@/assets/onboarding/breast/huge.png')}
              selected={data.breastSize === 'huge'}
              onPress={() => updateData('breastSize', 'huge')}
              size="4x3"
            />
          </View>

          {/* Booty Size */}
          <Text style={[styles.heading, styles.headingSpaced]}>Choose booty size</Text>
          <View style={styles.gridContainer}>
            <OptionCard
              label="Small"
              image={require('@/assets/onboarding/booty/small.png')}
              selected={data.bootySize === 'small'}
              onPress={() => updateData('bootySize', 'small')}
              size="4x3"
            />
            <OptionCard
              label="Medium"
              image={require('@/assets/onboarding/booty/medium.png')}
              selected={data.bootySize === 'medium'}
              onPress={() => updateData('bootySize', 'medium')}
              size="4x3"
            />
            <OptionCard
              label="Athletic"
              image={require('@/assets/onboarding/booty/athletic.png')}
              selected={data.bootySize === 'athletic'}
              onPress={() => updateData('bootySize', 'athletic')}
              size="4x3"
            />
            <OptionCard
              label="Large"
              image={require('@/assets/onboarding/booty/large.png')}
              selected={data.bootySize === 'large'}
              onPress={() => updateData('bootySize', 'large')}
              size="4x3"
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ContinueButton 
            onPress={handleContinue}
            disabled={!data.bodyType || !data.breastSize || !data.bootySize}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  headingSpaced: {
    marginTop: 24,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  footer: {
    padding: 16,
  },
});

