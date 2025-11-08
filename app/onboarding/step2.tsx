import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { EthnicityCard } from '@/components/onboarding/EthnicityCard';
import { AgeSlider } from '@/components/onboarding/AgeSlider';
import { ContinueButton } from '@/components/onboarding/ContinueButton';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function Step2Screen() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const handleContinue = () => {
    if (data.ethnicity) {
      router.push('/onboarding/step3');
    }
  };

  return (
    <ImageBackground 
      source={require('@/assets/onboarding/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ProgressIndicator totalSteps={6} currentStep={2} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Choose ethnicity</Text>

          <View style={styles.ethnicityContainer}>
            <EthnicityCard
              label="Caucasian"
              image={require('@/assets/onboarding/ethnicity/caucasian.png')}
              selected={data.ethnicity === 'caucasian'}
              onPress={() => updateData('ethnicity', 'caucasian')}
            />
            <EthnicityCard
              label="Asian"
              image={require('@/assets/onboarding/ethnicity/asian.png')}
              selected={data.ethnicity === 'asian'}
              onPress={() => updateData('ethnicity', 'asian')}
            />
            <EthnicityCard
              label="Arab"
              image={require('@/assets/onboarding/ethnicity/arab.png')}
              selected={data.ethnicity === 'arab'}
              onPress={() => updateData('ethnicity', 'arab')}
            />
            <EthnicityCard
              label="African"
              image={require('@/assets/onboarding/ethnicity/african.png')}
              selected={data.ethnicity === 'african'}
              onPress={() => updateData('ethnicity', 'african')}
            />
            <EthnicityCard
              label="Latina"
              image={require('@/assets/onboarding/ethnicity/latina.png')}
              selected={data.ethnicity === 'latina'}
              onPress={() => updateData('ethnicity', 'latina')}
            />
          </View>

          <View style={styles.ageSection}>
            <Text style={styles.heading}>Choose Age</Text>
            <AgeSlider 
              value={data.age} 
              onChange={(value) => updateData('age', value)}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ContinueButton 
            onPress={handleContinue}
            disabled={!data.ethnicity}
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
  ethnicityContainer: {
    marginBottom: 24,
  },
  ageSection: {
    marginTop: 12,
  },
  footer: {
    padding: 16,
  },
});

