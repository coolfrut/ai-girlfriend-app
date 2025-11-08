import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface MessageBubbleProps {
  message: string;
  time: string;
  isFromAI: boolean;
}

export default function MessageBubble({ message, time, isFromAI }: MessageBubbleProps) {
  if (!isFromAI) {
    return (
      <View style={styles.userMessageContainer}>
        <View style={styles.userBubble}>
          <Text style={styles.messageText}>{message}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.aiMessageContainer}>
      <View style={styles.aiBubble}>
        <View style={styles.bubbleContent}>
          <Text style={styles.messageText}>{message}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>

      <Image 
        source={require('@/assets/icons/ai.png')}
        style={styles.aiIcon}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  aiMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
    paddingLeft: 16,
  },
  aiBubble: {
    backgroundColor: '#191919',
    borderRadius: 12,
    padding: 14,
    maxWidth: '70%',
  },
  bubbleContent: {
    gap: 4,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  aiIcon: {
    width: 32,
    height: 32,
    marginLeft: 8,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12,
    paddingRight: 16,
  },
  userBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 14,
    maxWidth: '70%',
  },
});

