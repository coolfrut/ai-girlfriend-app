import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { StyleCard } from '@/components/onboarding/StyleCard';
import { ContinueButton } from '@/components/onboarding/ContinueButton';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function Step1Screen() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const handleContinue = () => {
    if (data.style) {
      router.push('/onboarding/step2');
    }
  };

  return (
    <ImageBackground 
      source={require('@/assets/onboarding/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ProgressIndicator totalSteps={6} currentStep={1} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headingContainer}>
            <View style={styles.headingRow}>
              <Text style={styles.heading}>CREATE </Text>
              <MaskedView
                maskElement={
                  <Text style={[styles.heading, { backgroundColor: 'transparent' }]}>
                    YOUR OWN
                  </Text>
                }
              >
                <LinearGradient
                  colors={['#D05BF8', '#FF18A0']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientText}
                >
                  <Text style={[styles.heading, { opacity: 0 }]}>YOUR OWN</Text>
                </LinearGradient>
              </MaskedView>
            </View>
            <Text style={styles.heading}>AI GIRLFRIEND</Text>
          </View>

          <View style={styles.cardsContainer}>
            <StyleCard
              label="Realistic"
              image={require('@/assets/onboarding/styles/realistic.png')}
              selected={data.style === 'realistic'}
              onPress={() => updateData('style', 'realistic')}
            />
            <StyleCard
              label="Anime"
              image={require('@/assets/onboarding/styles/anime.png')}
              selected={data.style === 'anime'}
              onPress={() => updateData('style', 'anime')}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ContinueButton 
            onPress={handleContinue}
            disabled={!data.style}
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
    alignItems: 'center',
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    textTransform: 'uppercase',
  },
  gradientText: {
    height: 32,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  footer: {
    padding: 16,
  },
});

