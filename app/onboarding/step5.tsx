import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { VoiceCard } from '@/components/onboarding/VoiceCard';
import { RelationshipCard } from '@/components/onboarding/RelationshipCard';
import { ContinueButton } from '@/components/onboarding/ContinueButton';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function Step5Screen() {
  const router = useRouter();
  const { data, updateData } = useOnboarding();

  const handleContinue = () => {
    if (data.voice && data.relationship) {
      router.push('/onboarding/final');
    }
  };

  return (
    <ImageBackground 
      source={require('@/assets/onboarding/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ProgressIndicator totalSteps={6} currentStep={5} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Voice */}
          <Text style={styles.heading}>Choose voice</Text>
          <View style={styles.voiceContainer}>
            <VoiceCard
              label="Cute"
              emoji="🥰"
              selected={data.voice === 'cute'}
              onPress={() => updateData('voice', 'cute')}
            />
            <VoiceCard
              label="Student"
              emoji="😋"
              selected={data.voice === 'student'}
              onPress={() => updateData('voice', 'student')}
            />
            <VoiceCard
              label="Soft"
              emoji="😌"
              selected={data.voice === 'soft'}
              onPress={() => updateData('voice', 'soft')}
            />
            <VoiceCard
              label="Dominant"
              emoji="😈"
              selected={data.voice === 'dominant'}
              onPress={() => updateData('voice', 'dominant')}
            />
          </View>

          {/* Relationships */}
          <Text style={[styles.heading, styles.headingSpaced]}>Choose relationships</Text>
          <View style={styles.relationshipContainer}>
            <RelationshipCard
              label="Step sister"
              icon={require('@/assets/onboarding/relationship/step-sister.png')}
              selected={data.relationship === 'step-sister'}
              onPress={() => updateData('relationship', 'step-sister')}
            />
            <RelationshipCard
              label="Step mom"
              icon={require('@/assets/onboarding/relationship/step-mom.png')}
              selected={data.relationship === 'step-mom'}
              onPress={() => updateData('relationship', 'step-mom')}
            />
            <RelationshipCard
              label="Girlfriend"
              icon={require('@/assets/onboarding/relationship/girlfriend.png')}
              selected={data.relationship === 'girlfriend'}
              onPress={() => updateData('relationship', 'girlfriend')}
            />
            <RelationshipCard
              label="Fuck Buddy"
              icon={require('@/assets/onboarding/relationship/fuck-buddy.png')}
              selected={data.relationship === 'fuck-buddy'}
              onPress={() => updateData('relationship', 'fuck-buddy')}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ContinueButton 
            onPress={handleContinue}
            disabled={!data.voice || !data.relationship}
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
  voiceContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  relationshipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  footer: {
    padding: 16,
  },
});

