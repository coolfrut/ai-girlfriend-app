import React from 'react';
import { Image, ImageStyle } from 'react-native';

interface IconProps {
  name: 'phone' | 'fire' | 'clock' | 'send' | 'ai' | 'imageAdd' | 'picture' | 'micOff' | 'decline' | 'lock' | 'gift' | 'star' | 'home' | 'explore' | 'chat';
  size?: number;
  style?: ImageStyle;
}

const iconSources = {
  phone: require('@/assets/icons/phone.png'),
  fire: require('@/assets/icons/fire.png'),
  clock: require('@/assets/icons/clock.png'),
  send: require('@/assets/icons/send.png'),
  ai: require('@/assets/icons/ai.png'),
  imageAdd: require('@/assets/icons/image-add.png'),
  picture: require('@/assets/icons/picture.png'),
  micOff: require('@/assets/icons/mic-off.png'),
  decline: require('@/assets/icons/decline.png'),
  lock: require('@/assets/icons/lock.png'),
  gift: require('@/assets/icons/gift.png'),
  star: require('@/assets/icons/star.png'),
  home: require('@/assets/icons/home.png'),
  explore: require('@/assets/icons/explore.png'),
  chat: require('@/assets/icons/chat.png'),
};

export default function Icon({ name, size = 24, style }: IconProps) {
  const flatStyle = style ? (Array.isArray(style) ? Object.assign({}, ...style) : style) : {};
  const tintColor = flatStyle.tintColor;
  
  return (
    <Image
      source={iconSources[name]}
      style={[
        { width: size, height: size },
        tintColor && { tintColor },
        style
      ]}
      resizeMode="contain"
    />
  );
}

