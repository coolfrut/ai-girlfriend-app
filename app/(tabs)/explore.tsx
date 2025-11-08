import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { X, Heart, Star } from 'lucide-react-native';
import ChatsNavBar from '@/components/ChatsNavBar';

const { width, height } = Dimensions.get('window');

const cards = [
  {
    id: 1,
    name: 'Name',
    age: 25,
    description:
      'Lorem ipsum dolor sit amet consectetur. Mauris interdum mauris velit in pretium.',
    image: require('@/assets/explore/explore-1.png'),
    photos: 9,
  },
  {
    id: 2,
    name: 'Barbara',
    age: 22,
    description:
      "A yacht won't surprise me, unlike sincerity and honesty.",
    image: require('@/assets/profiles/profile-1.png'),
    photos: 5,
  },
  {
    id: 3,
    name: 'Daisy',
    age: 18,
    description: 'Looking for someone gentle to laugh with and share moments.',
    image: require('@/assets/profiles/profile-2.png'),
    photos: 7,
  },
];

export default function ExploreScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          handleSwipeRight();
        } else if (gesture.dx < -120) {
          handleSwipeLeft();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleSwipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width * 1.5, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      nextCard();
    });
  };

  const handleSwipeRight = () => {
    Animated.timing(position, {
      toValue: { x: width * 1.5, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      nextCard();
    });
  };

  const nextCard = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setPhotoIndex(0);
  };

  const currentCard = cards[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ChatsNavBar onClaimPress={() => console.log('Claim pressed')} stars={3} />

      <View style={styles.cardContainer}>
        {/* Background Cards */}
        {cards.map((card, index) => {
          if (index === currentIndex) return null;
          const offset = (index - currentIndex + cards.length) % cards.length;
          
          return (
            <View
              key={card.id}
              style={[
                styles.backgroundCard,
                {
                  transform: [
                    { scale: 1 - offset * 0.05 },
                    { translateY: offset * 10 },
                  ],
                  opacity: 1 - offset * 0.3,
                  zIndex: -offset,
                },
              ]}
            >
              <Image
                source={card.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </View>
          );
        })}

        {/* Active Card */}
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate },
              ],
            },
          ]}
        >
          <Image
            source={currentCard.image}
            style={styles.cardImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)']}
            start={{ x: 0.5, y: 1.0 }}
            end={{ x: 0.5, y: 0 }}
            style={styles.gradient}
          />

          {/* Photo Indicators */}
          <View style={styles.photoIndicators}>
            {Array.from({ length: currentCard.photos }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === photoIndex && styles.indicatorActive,
                ]}
              />
            ))}
          </View>

          {/* Card Info */}
          <View style={styles.cardInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>
                {currentCard.name}, {currentCard.age}
              </Text>
            </View>
            <Text style={styles.description}>{currentCard.description}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSwipeLeft}
            >
              <View style={styles.closeButton}>
                <X size={24} color="#ffffff" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.starButton}
              onPress={() => console.log('Star pressed')}
            >
              <LinearGradient
                colors={['#d558ee', '#f437b6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.94, y: 1.0 }}
                style={styles.starGradient}
              >
                <Star size={40} color="#ffffff" fill="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleSwipeRight}
            >
              <View style={styles.heartButton}>
                <Heart size={24} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0e0f',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 100,
  },
  backgroundCard: {
    position: 'absolute',
    width: width - 32,
    height: height * 0.7,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  card: {
    width: width - 32,
    height: height * 0.7,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    position: 'absolute',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 196,
  },
  photoIndicators: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 5,
  },
  indicator: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderRadius: 21,
  },
  indicatorActive: {
    backgroundColor: '#ffffff',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 100,
    left: 12,
    right: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartButton: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  starGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

