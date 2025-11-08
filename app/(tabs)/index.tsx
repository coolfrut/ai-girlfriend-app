import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import ChatsNavBar from '@/components/ChatsNavBar';
import ProfileCard from '@/components/ProfileCard';

const profiles = [
  {
    id: 1,
    name: 'Barbara',
    age: 22,
    description: "A yacht won't surprise\nme, unlike sincerity an…",
    tags: [
      { label: 'blonde' },
      { label: 'romantic' },
      { label: 'busty' },
    ],
    image: require('@/assets/profiles/profile-1.png'),
  },
  {
    id: 2,
    name: 'Daisy',
    age: 18,
    description: 'looking for someone\ngentle to laugh with…',
    tags: [
      { label: 'teen' },
      { label: 'blonde' },
      { label: 'caring' },
    ],
    image: require('@/assets/profiles/profile-2.png'),
  },
  {
    id: 3,
    name: 'Name',
    age: 25,
    description: 'Lorem ipsum dolor sit amet consectetur.',
    tags: [
      { label: 'Group1' },
      { label: 'Group2' },
      { label: 'Group3' },
    ],
    image: require('@/assets/profiles/profile-3.png'),
  },
  {
    id: 4,
    name: 'Daisy',
    age: 18,
    description: 'looking for someone\ngentle to laugh with…',
    tags: [
      { label: 'teen' },
      { label: 'blonde' },
      { label: 'caring' },
    ],
    image: require('@/assets/profiles/profile-4.png'),
  },
];

const categories = ['All', 'Milf', 'Asian', 'Teen', 'Busty', 'Blonde', 'Goth'];

export default function HomeScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [isAdult, setIsAdult] = React.useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      <ChatsNavBar onClaimPress={() => console.log('Claim pressed')} stars={3} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <LinearGradient
            colors={['#23247c', '#36195e']}
            start={{ x: 0.69, y: 0.79 }}
            end={{ x: 0, y: 0 }}
            style={styles.bannerBackground}
          />
          
          <Image
            source={require('@/assets/profiles/banner.png')}
            style={styles.bannerImage}
            resizeMode="cover"
          />

          <View style={styles.bannerContent}>
            <View style={styles.bannerTop}>
              <View>
                <View style={styles.updateBadge}>
                  <LinearGradient
                    colors={['#d657ed', '#fa2aaa']}
                    start={{ x: 0, y: 0.11 }}
                    end={{ x: 0.96, y: 1.0 }}
                    style={styles.updateBadgeGradient}
                  >
                    <Text style={styles.updateText}>Update</Text>
                  </LinearGradient>
                </View>
                <Text style={styles.bannerTitle}>Autumn</Text>
              </View>
            </View>

            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>02</Text>
              <Text style={styles.timerSeparator}>:</Text>
              <Text style={styles.timerText}>59</Text>
              <Text style={styles.timerSeparator}>:</Text>
              <Text style={styles.timerText}>35</Text>

              <TouchableOpacity style={styles.claimBonusButton}>
                <LinearGradient
                  colors={['#d657ed', '#fa2aaa']}
                  start={{ x: 0, y: 0.11 }}
                  end={{ x: 0.96, y: 1.0 }}
                  style={styles.claimBonusGradient}
                >
                  <Text style={styles.claimBonusText}>Claim Bonus</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            <View style={styles.discountBadge}>
              <LinearGradient
                colors={['#ff792d', '#e555c5']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.discountGradient}
              >
                <Text style={styles.discountText}>70% Off</Text>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Create AI Girlfriend Button */}
        <View style={styles.createButtonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/onboarding/step1')}
          >
            <LinearGradient
              colors={['#d657ed', '#fa2aaa']}
              start={{ x: 0, y: 0.11 }}
              end={{ x: 0.96, y: 1.0 }}
              style={styles.createButtonGradient}
            >
              <Text style={styles.createButtonEmoji}>🪄</Text>
              <Text style={styles.createButtonText}>Create your AI Girlfriend</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Explore Section */}
        <View style={styles.exploreHeader}>
          <Text style={styles.exploreTitle}>Explore</Text>
          
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setIsAdult(!isAdult)}
          >
            <LinearGradient
              colors={['#301866', '#5b1a3d']}
              start={{ x: 0.07, y: 0.04 }}
              end={{ x: 0.91, y: 1.0 }}
              style={styles.switchGradient}
            >
              <View
                style={[
                  styles.switchToggle,
                  isAdult && styles.switchToggleActive,
                ]}
              >
                <LinearGradient
                  colors={['#d558ee', '#f437b6']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0.94, y: 1.0 }}
                  style={styles.switchToggleGradient}
                >
                  <Text style={styles.switchText}>18+</Text>
                </LinearGradient>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Profile Cards Grid */}
        <View style={styles.cardsGrid}>
          {profiles.map((profile, index) => (
            <View
              key={profile.id}
              style={[
                styles.cardWrapper,
                index % 2 === 0 ? styles.cardLeft : styles.cardRight,
              ]}
            >
              <ProfileCard
                name={profile.name}
                age={profile.age}
                description={profile.description}
                tags={profile.tags}
                image={profile.image}
              />
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0e0f',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  bannerContainer: {
    width: '100%',
    height: 159,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bannerImage: {
    position: 'absolute',
    left: 155,
    top: 3,
    width: 225,
    height: 156,
  },
  bannerContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  bannerTop: {
    gap: 8,
  },
  updateBadge: {
    alignSelf: 'flex-start',
    borderRadius: 48,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  updateBadgeGradient: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  updateText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  bannerTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.34)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 14,
    padding: 8,
    alignSelf: 'flex-start',
    gap: 4,
  },
  timerText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  timerSeparator: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  claimBonusButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 8,
  },
  claimBonusGradient: {
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  claimBonusText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  discountBadge: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  discountGradient: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  createButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  createButton: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  createButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  createButtonEmoji: {
    fontSize: 24,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  exploreTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  switchButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  switchGradient: {
    width: 60,
    height: 36,
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  switchToggle: {
    position: 'absolute',
    left: 2,
    width: 30,
    height: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  switchToggleActive: {
    left: 28,
  },
  switchToggleGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 6,
    marginBottom: 12,
  },
  categoryChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  categoryChipActive: {
    backgroundColor: '#ffffff',
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#000000',
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  cardWrapper: {
    marginBottom: 8,
  },
  cardLeft: {
    marginRight: 4,
  },
  cardRight: {
    marginLeft: 4,
  },
});

