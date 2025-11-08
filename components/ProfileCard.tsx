import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Tag {
  label: string;
}

interface ProfileCardProps {
  name: string;
  age: number;
  description: string;
  tags: Tag[];
  image: ImageSourcePropType;
  isOnline?: boolean;
}

export default function ProfileCard({
  name,
  age,
  description,
  tags,
  image,
  isOnline = true,
}: ProfileCardProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)']}
        start={{ x: 0.5, y: 1.0 }}
        end={{ x: 0.5, y: 0 }}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>
            {name}, {age}
          </Text>
          {isOnline && <View style={styles.onlineStatus} />}
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 175,
    height: 400,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 131,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    marginRight: 6,
  },
  onlineStatus: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#05df72',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
  },
});

