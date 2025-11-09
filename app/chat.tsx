import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import ChatNavBar from '@/components/ChatNavBar';
import MessageBubble from '@/components/MessageBubble';
import VideoMessage from '@/components/VideoMessage';
import LockedContent from '@/components/LockedContent';
import ActionButton from '@/components/ActionButton';
import MessageInput from '@/components/MessageInput';

export default function ChatScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const chatData = {
    name: 'Barbara',
    status: 'Online',
    avatar: require('@/assets/chat/barbara-avatar.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ChatNavBar
        name={chatData.name}
        status={chatData.status}
        avatar={chatData.avatar}
        onCallPress={() => console.log('Call pressed')}
        onBackPress={() => router.back()}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.avatarFrame}>
            <LinearGradient
              colors={['#d058f8', '#f9319e']}
              start={{ x: 0.03, y: 0.01 }}
              end={{ x: 0.98, y: 1.0 }}
              style={styles.avatarFrameGradient}
            >
              <Image
                source={require('@/assets/chat/barbara-large.png')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </LinearGradient>
          </View>

          <Text style={styles.welcomeText}>
            Meet {chatData.name}, an AI Girlfriend with no filter. Dare to ask anything ?
          </Text>
        </View>

        {/* Date Badge */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>Today</Text>
        </View>

        {/* Messages */}
        <MessageBubble
          message={"Hey! I didn't expect a\nmessage from you..."}
          time="1:35pm"
          isFromAI={true}
        />

        <MessageBubble
          message="missed you..."
          time="1:35pm"
          isFromAI={true}
        />

        <ActionButton
          text="Send me a video of you"
          onPress={() => console.log('Action pressed')}
        />

        {/* Video Message Example */}
        <VideoMessage
          image={require('@/assets/chat/video-preview.png')}
          time="1:35pm"
          duration="Video"
          onPress={() => console.log('Video pressed')}
        />

        <ActionButton
          text="Send me a naughty video"
          onPress={() => console.log('Action pressed')}
        />

        {/* Locked Content with Welcome Bonus */}
        <LockedContent
          image={require('@/assets/chat/locked-welcome.png')}
          time="1:35pm"
          stars={39}
          isFree={true}
          badge="Welcome bonus"
          badgeTime="14:27"
          photoCount={10}
          onUnlockPress={() => console.log('Unlock pressed')}
        />

        {/* More Locked Content */}
        <LockedContent
          image={require('@/assets/chat/locked-1.png')}
          time="1:35pm"
          stars={39}
          onUnlockPress={() => console.log('Unlock pressed')}
        />

        <LockedContent
          image={require('@/assets/chat/locked-2.png')}
          time="1:36pm"
          stars={39}
          onUnlockPress={() => console.log('Unlock pressed')}
        />

        <View style={{ height: 20 }} />
      </ScrollView>

      <MessageInput
        onSend={(message) => {
          console.log('Send message:', message);
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
        onImagePress={() => console.log('Image picker pressed')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0e0f',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 12,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatarFrame: {
    borderRadius: 10,
    padding: 2,
    marginBottom: 16,
  },
  avatarFrameGradient: {
    padding: 4,
    borderRadius: 10,
  },
  avatarImage: {
    width: 147,
    height: 197,
    borderRadius: 8,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 172,
  },
  dateBadge: {
    backgroundColor: '#191919',
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 68,
    marginBottom: 16,
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});

