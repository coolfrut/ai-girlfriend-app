import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronLeft } from 'lucide-react-native';
import Icon from './Icon';
import CallModal from './CallModal';

interface ChatNavBarProps {
  name: string;
  status: string;
  avatar: ImageSourcePropType;
  onCallPress?: () => void;
  onBackPress?: () => void;
}

export default function ChatNavBar({ name, status, avatar, onCallPress, onBackPress }: ChatNavBarProps) {
  const [showCallModal, setShowCallModal] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleCallPress = () => {
    setIsListening(false);
    setShowCallModal(true);
    onCallPress?.();
    
    // Simulate call connecting after 3 seconds
    setTimeout(() => {
      setIsListening(true);
    }, 3000);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
            <ChevronLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Image source={avatar} style={styles.avatar} resizeMode="cover" />
              <View style={styles.onlineStatus} />
            </View>

            <View style={styles.textInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.status}>{status}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
          <LinearGradient
            colors={['rgba(71, 24, 102, 0.8)', 'rgba(91, 26, 69, 0.8)']}
            start={{ x: 0.07, y: 0.04 }}
            end={{ x: 0.91, y: 1.0 }}
            style={styles.callGradient}
          >
            <Icon name="phone" size={24} />
            <Text style={styles.callText}>Call Her</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <CallModal
        visible={showCallModal}
        onClose={() => setShowCallModal(false)}
        name={name}
        avatar={avatar}
        isListening={isListening}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: '#0f0e0f',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  onlineStatus: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#06df73',
  },
  textInfo: {
    justifyContent: 'center',
  },
  name: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  status: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  callButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f03bbd',
  },
  callGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  callText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
});

