import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { ContinueButton } from '@/components/onboarding/ContinueButton';
import { useOnboarding } from '@/contexts/OnboardingContext';

// Helper functions to get images based on selected values
const getHairStyleImage = (hairStyle: string | null) => {
  const images: Record<string, any> = {
    straight: require('@/assets/onboarding/hair-style/straight.png'),
    wavy: require('@/assets/onboarding/hair-style/wavy.png'),
    braids: require('@/assets/onboarding/hair-style/braids.png'),
    bun: require('@/assets/onboarding/hair-style/bun.png'),
    curly: require('@/assets/onboarding/hair-style/curly.png'),
    ponytail: require('@/assets/onboarding/hair-style/ponytail.png'),
  };
  return images[hairStyle || 'straight'] || images.straight;
};

const getBodyTypeImage = (bodyType: string | null) => {
  const images: Record<string, any> = {
    slim: require('@/assets/onboarding/body/slim.png'),
    athletic: require('@/assets/onboarding/body/athletic.png'),
    curvy: require('@/assets/onboarding/body/curvy.png'),
    thicc: require('@/assets/onboarding/body/thicc.png'),
  };
  return images[bodyType || 'slim'] || images.slim;
};

const getBreastSizeImage = (breastSize: string | null) => {
  const images: Record<string, any> = {
    small: require('@/assets/onboarding/breast/small.png'),
    medium: require('@/assets/onboarding/breast/medium.png'),
    large: require('@/assets/onboarding/breast/large.png'),
    huge: require('@/assets/onboarding/breast/huge.png'),
  };
  return images[breastSize || 'small'] || images.small;
};

const getBootySizeImage = (bootySize: string | null) => {
  const images: Record<string, any> = {
    small: require('@/assets/onboarding/booty/small.png'),
    medium: require('@/assets/onboarding/booty/medium.png'),
    athletic: require('@/assets/onboarding/booty/athletic.png'),
    large: require('@/assets/onboarding/booty/large.png'),
  };
  return images[bootySize || 'small'] || images.small;
};

const getHairColorImage = (hairColor: string | null) => {
  const images: Record<string, any> = {
    black: require('@/assets/onboarding/hair-color/black.png'),
    brunette: require('@/assets/onboarding/hair-color/brunette.png'),
    blonde: require('@/assets/onboarding/hair-color/blonde.png'),
    pink: require('@/assets/onboarding/hair-color/pink.png'),
    redhead: require('@/assets/onboarding/hair-color/redhead.png'),
  };
  return images[hairColor || 'black'] || images.black;
};

const getEyeColorImage = (eyeColor: string | null) => {
  const images: Record<string, any> = {
    brown: require('@/assets/onboarding/eye-color/brown.png'),
    blue: require('@/assets/onboarding/eye-color/blue.png'),
    green: require('@/assets/onboarding/eye-color/green.png'),
  };
  return images[eyeColor || 'brown'] || images.brown;
};

const getRelationshipIcon = (relationship: string | null) => {
  const icons: Record<string, any> = {
    'step-sister': require('@/assets/onboarding/relationship/step-sister.png'),
    'step-mom': require('@/assets/onboarding/relationship/step-mom.png'),
    'girlfriend': require('@/assets/onboarding/relationship/girlfriend.png'),
    'fuck-buddy': require('@/assets/onboarding/relationship/fuck-buddy.png'),
  };
  return icons[relationship || 'step-sister'] || icons['step-sister'];
};

const getRelationshipLabel = (relationship: string | null) => {
  const labels: Record<string, string> = {
    'step-sister': 'Step sister',
    'step-mom': 'Step mom',
    'girlfriend': 'Girlfriend',
    'fuck-buddy': 'Fuck Buddy',
  };
  return labels[relationship || 'step-sister'] || 'Step sister';
};

const getVoiceLabel = (voice: string | null) => {
  const labels: Record<string, string> = {
    'cute': 'Cute 🥰',
    'student': 'Student 😋',
    'soft': 'Soft 😌',
    'dominant': 'Dominant 😈',
  };
  return labels[voice || 'cute'] || 'Cute 🥰';
};

export default function FinalScreen() {
  const router = useRouter();
  const { data } = useOnboarding();

  const handleCreate = () => {
    // TODO: Implement AI generation logic
    router.replace('/(tabs)');
  };

  return (
    <ImageBackground 
      source={require('@/assets/onboarding/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ProgressIndicator totalSteps={6} currentStep={6} />

        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.heading}>Your Fantasy Babe is ready!</Text>

          {/* Preview Cards */}
          <View style={styles.previewContainer}>
            <LinearGradient
              colors={['rgba(46, 29, 75, 0)', '#32134B']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1.037 }}
              style={styles.previewCard}
            >
              <Image 
                source={require('@/assets/onboarding/preview/realistic-preview.png')}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.previewGradient}
              >
                <Text style={styles.previewLabel}>{data.style === 'realistic' ? 'Realistic' : 'Anime'}</Text>
              </LinearGradient>
            </LinearGradient>

            <LinearGradient
              colors={['rgba(46, 29, 75, 0)', '#32134B']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1.037 }}
              style={styles.previewCard}
            >
              <Image 
                source={require('@/assets/onboarding/preview/ethnicity-preview.png')}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                style={styles.previewGradient}
              >
                <Text style={styles.previewLabel}>
                  {data.ethnicity ? data.ethnicity.charAt(0).toUpperCase() + data.ethnicity.slice(1) : 'Caucasian'}
                </Text>
              </LinearGradient>
            </LinearGradient>
          </View>

          {/* Traits Section */}
          <View style={styles.traitsContainer}>
            <View style={styles.traitRow}>
              <LinearGradient
                colors={['rgba(46, 29, 75, 0)', '#32134B']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.037 }}
                style={styles.traitCard}
              >
                <LinearGradient
                  colors={['#D558EE', '#F437B6']}
                  start={{ x: -0.004, y: 0 }}
                  end={{ x: 0.945, y: 1 }}
                  style={styles.traitIconContainer}
                >
                  <Image 
                    source={getRelationshipIcon(data.relationship)}
                    style={styles.traitIconImage}
                    resizeMode="contain"
                  />
                </LinearGradient>
                <Text style={styles.traitLabel}>{getRelationshipLabel(data.relationship)}</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(46, 29, 75, 0)', '#32134B']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.037 }}
                style={styles.traitCard}
              >
                <LinearGradient
                  colors={['#D558EE', '#F437B6']}
                  start={{ x: -0.004, y: 0 }}
                  end={{ x: 0.945, y: 1 }}
                  style={styles.traitIconContainer}
                >
                  <Image 
                    source={require('@/assets/onboarding/voice/microphone-icon.png')}
                    style={styles.traitIconImage}
                    resizeMode="contain"
                  />
                </LinearGradient>
                <Text style={styles.traitLabel}>{getVoiceLabel(data.voice)}</Text>
              </LinearGradient>

              <LinearGradient
                colors={['rgba(46, 29, 75, 0)', '#32134B']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1.037 }}
                style={styles.traitCard}
              >
                <LinearGradient
                  colors={['#D558EE', '#F437B6']}
                  start={{ x: -0.004, y: 0 }}
                  end={{ x: 0.945, y: 1 }}
                  style={styles.traitIconContainer}
                >
                  <Text style={styles.traitValue}>{data.age}</Text>
                </LinearGradient>
                <Text style={styles.traitLabel}>Years</Text>
              </LinearGradient>
            </View>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailRow}>
              <DetailCard 
                image={getHairStyleImage(data.hairStyle)}
                label={data.hairStyle ? data.hairStyle.charAt(0).toUpperCase() + data.hairStyle.slice(1) : ''}
              />
              <DetailCard 
                image={getBodyTypeImage(data.bodyType)}
                label={data.bodyType ? data.bodyType.charAt(0).toUpperCase() + data.bodyType.slice(1) : ''}
              />
              <DetailCard 
                image={getBreastSizeImage(data.breastSize)}
                label={data.breastSize ? data.breastSize.charAt(0).toUpperCase() + data.breastSize.slice(1) : ''}
              />
            </View>
            <View style={styles.detailRow}>
              <DetailCard 
                image={getBootySizeImage(data.bootySize)}
                label={data.bootySize ? data.bootySize.charAt(0).toUpperCase() + data.bootySize.slice(1) : ''}
              />
              <DetailCard 
                image={getHairColorImage(data.hairColor)}
                label={data.hairColor ? data.hairColor.charAt(0).toUpperCase() + data.hairColor.slice(1) : ''}
              />
              <DetailCard 
                image={getEyeColorImage(data.eyeColor)}
                label={data.eyeColor ? data.eyeColor.charAt(0).toUpperCase() + data.eyeColor.slice(1) : ''}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ContinueButton 
            onPress={handleCreate}
            label="Bring my AI to life"
            icon="🪄"
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

interface DetailCardProps {
  image: any;
  label: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ image, label }) => (
  <LinearGradient
    colors={['rgba(46, 29, 75, 0)', '#32134B']}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1.037 }}
    style={styles.detailCard}
  >
    <Image source={image} style={styles.detailImage} resizeMode="cover" />
    <LinearGradient
      colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={styles.detailGradient}
    >
      <Text style={styles.detailLabel}>{label}</Text>
    </LinearGradient>
  </LinearGradient>
);

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
  previewContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  previewCard: {
    flex: 1,
    height: 194,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  previewGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  traitsContainer: {
    marginBottom: 8,
  },
  traitRow: {
    flexDirection: 'row',
    gap: 8,
  },
  traitCard: {
    flex: 1,
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  traitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  traitIconImage: {
    width: 24,
    height: 24,
  },
  traitValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  traitLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  detailsGrid: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 8,
  },
  detailCard: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  detailImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 12,
  },
  detailGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    padding: 16,
  },
});

