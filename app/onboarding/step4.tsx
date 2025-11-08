import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { OptionCard } from '@/components/onboarding/OptionCard';
import { ContinueButton } from '@/components/onboarding/ContinueButton';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function Step4Screen() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const handleContinue = () => {
    if (data.hairStyle && data.hairColor && data.eyeColor) {
      router.push('/onboarding/step5');
    }
  };

  return (
    <ImageBackground 
      source={require('@/assets/onboarding/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ProgressIndicator totalSteps={6} currentStep={4} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Hair Style */}
          <Text style={styles.heading}>Choose hair style</Text>
          <View style={styles.gridContainer}>
            <OptionCard
              label="Straight"
              image={require('@/assets/onboarding/hair-style/straight.png')}
              selected={data.hairStyle === 'straight'}
              onPress={() => updateData('hairStyle', 'straight')}
              size="3x3"
            />
            <OptionCard
              label="Wavy"
              image={require('@/assets/onboarding/hair-style/wavy.png')}
              selected={data.hairStyle === 'wavy'}
              onPress={() => updateData('hairStyle', 'wavy')}
              size="3x3"
            />
            <OptionCard
              label="Braids"
              image={require('@/assets/onboarding/hair-style/braids.png')}
              selected={data.hairStyle === 'braids'}
              onPress={() => updateData('hairStyle', 'braids')}
              size="3x3"
            />
          </View>
          <View style={[styles.gridContainer, { marginTop: 8 }]}>
            <OptionCard
              label="Bun"
              image={require('@/assets/onboarding/hair-style/bun.png')}
              selected={data.hairStyle === 'bun'}
              onPress={() => updateData('hairStyle', 'bun')}
              size="3x3"
            />
            <OptionCard
              label="Curly"
              image={require('@/assets/onboarding/hair-style/curly.png')}
              selected={data.hairStyle === 'curly'}
              onPress={() => updateData('hairStyle', 'curly')}
              size="3x3"
            />
            <OptionCard
              label="Ponytail"
              image={require('@/assets/onboarding/hair-style/ponytail.png')}
              selected={data.hairStyle === 'ponytail'}
              onPress={() => updateData('hairStyle', 'ponytail')}
              size="3x3"
            />
          </View>

          {/* Hair Color */}
          <Text style={[styles.heading, styles.headingSpaced]}>Choose hair color</Text>
          <View style={styles.gridContainer}>
            <OptionCard
              label="Black"
              image={require('@/assets/onboarding/hair-color/black.png')}
              selected={data.hairColor === 'black'}
              onPress={() => updateData('hairColor', 'black')}
              size="3x3"
            />
            <OptionCard
              label="Brunette"
              image={require('@/assets/onboarding/hair-color/brunette.png')}
              selected={data.hairColor === 'brunette'}
              onPress={() => updateData('hairColor', 'brunette')}
              size="3x3"
            />
            <OptionCard
              label="Blonde"
              image={require('@/assets/onboarding/hair-color/blonde.png')}
              selected={data.hairColor === 'blonde'}
              onPress={() => updateData('hairColor', 'blonde')}
              size="3x3"
            />
          </View>
          <View style={[styles.gridContainer, { marginTop: 8 }]}>
            <OptionCard
              label="Pink"
              image={require('@/assets/onboarding/hair-color/pink.png')}
              selected={data.hairColor === 'pink'}
              onPress={() => updateData('hairColor', 'pink')}
              size="3x3"
            />
            <OptionCard
              label="Redhead"
              image={require('@/assets/onboarding/hair-color/redhead.png')}
              selected={data.hairColor === 'redhead'}
              onPress={() => updateData('hairColor', 'redhead')}
              size="3x3"
            />
          </View>

          {/* Eye Color */}
          <Text style={[styles.heading, styles.headingSpaced]}>Choose eye color</Text>
          <View style={styles.gridContainer}>
            <OptionCard
              label="Brown"
              image={require('@/assets/onboarding/eye-color/brown.png')}
              selected={data.eyeColor === 'brown'}
              onPress={() => updateData('eyeColor', 'brown')}
              size="3x3"
            />
            <OptionCard
              label="Blue"
              image={require('@/assets/onboarding/eye-color/blue.png')}
              selected={data.eyeColor === 'blue'}
              onPress={() => updateData('eyeColor', 'blue')}
              size="3x3"
            />
            <OptionCard
              label="Green"
              image={require('@/assets/onboarding/eye-color/green.png')}
              selected={data.eyeColor === 'green'}
              onPress={() => updateData('eyeColor', 'green')}
              size="3x3"
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ContinueButton 
            onPress={handleContinue}
            disabled={!data.hairStyle || !data.hairColor || !data.eyeColor}
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
    gap: 8,
    justifyContent: 'space-between',
  },
  footer: {
    padding: 16,
  },
});

