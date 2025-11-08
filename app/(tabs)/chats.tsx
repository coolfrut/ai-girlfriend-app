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
import { router } from 'expo-router';
import ChatsNavBar from '@/components/ChatsNavBar';

interface ChatItem {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  avatar: any;
  isOnline: boolean;
}

const chats: ChatItem[] = [
  {
    id: 1,
    name: 'Name',
    message: 'Message or info',
    time: '1:35pm',
    unread: 1,
    avatar: require('@/assets/chats/chat-1.png'),
    isOnline: true,
  },
  {
    id: 2,
    name: 'Barbara',
    message: 'Send a video',
    time: '1:35pm',
    unread: 1,
    avatar: require('@/assets/chats/chat-2.png'),
    isOnline: true,
  },
  {
    id: 3,
    name: 'Daisy',
    message: 'still not coming back? missed you...',
    time: '1:35pm',
    unread: 1,
    avatar: require('@/assets/chats/chat-3.png'),
    isOnline: true,
  },
];

export default function ChatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ChatsNavBar onClaimPress={() => console.log('Claim pressed')} stars={3} />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Chats</Text>
          <View style={styles.badge}>
            <LinearGradient
              colors={['#d05bf8', '#ff18a0']}
              start={{ x: 0.3, y: 0.11 }}
              end={{ x: 1.17, y: 0.93 }}
              style={styles.badgeGradient}
            >
              <Text style={styles.badgeText}>2</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Chat List */}
        <ScrollView
          style={styles.chatList}
          contentContainerStyle={styles.chatListContent}
          showsVerticalScrollIndicator={false}
        >
          {chats.map((chat) => (
            <TouchableOpacity 
              key={chat.id} 
              style={styles.chatItem}
              onPress={() => router.push('/chat')}
            >
              <View style={styles.chatContent}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={chat.avatar}
                    style={styles.avatar}
                    resizeMode="cover"
                  />
                  {chat.isOnline && <View style={styles.onlineStatus} />}
                </View>

                <View style={styles.chatInfo}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text
                    style={styles.chatMessage}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {chat.message}
                  </Text>
                </View>
              </View>

              <View style={styles.chatMeta}>
                <Text style={styles.chatTime}>{chat.time}</Text>
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <LinearGradient
                      colors={['#d05bf8', '#ff18a0']}
                      start={{ x: 0.3, y: 0.11 }}
                      end={{ x: 1.17, y: 0.93 }}
                      style={styles.unreadBadgeGradient}
                    >
                      <Text style={styles.unreadText}>{chat.unread}</Text>
                    </LinearGradient>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0e0f',
  },
  content: {
    flex: 1,
    paddingTop: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 4,
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
  badge: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  badgeGradient: {
    minWidth: 20,
    height: 18,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#191919',
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
  },
  chatContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineStatus: {
    position: 'absolute',
    top: 2,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#06df73',
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    marginBottom: 2,
  },
  chatMessage: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  chatMeta: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 48,
    paddingVertical: 2,
  },
  chatTime: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
  },
  unreadBadge: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  unreadBadgeGradient: {
    minWidth: 18,
    height: 18,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    textAlign: 'center',
  },
});

