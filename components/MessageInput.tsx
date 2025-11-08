import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';

interface MessageInputProps {
  onSend?: (message: string) => void;
  onImagePress?: () => void;
}

export default function MessageInput({ onSend, onImagePress }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageButton} onPress={onImagePress}>
        <Icon name="imageAdd" size={24} />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write something..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={message}
          onChangeText={setMessage}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <LinearGradient
          colors={['#301866', '#5b1a3d']}
          start={{ x: 0.07, y: 0.04 }}
          end={{ x: 0.91, y: 1.0 }}
          style={styles.sendGradient}
        >
          <Icon name="send" size={24} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0f0e0f',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  imageButton: {
    width: 48,
    height: 48,
    backgroundColor: '#191919',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginRight: 8,
    minHeight: 48,
    maxHeight: 100,
  },
  input: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    padding: 0,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sendGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

