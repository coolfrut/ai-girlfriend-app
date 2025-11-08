import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from '@/components/Icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 34,
          left: 12,
          right: 12,
          height: 56,
          borderRadius: 60,
          paddingBottom: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={64}
            tint="dark"
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 60,
              overflow: 'hidden',
            }}
          />
        ),
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <Icon name="chat" size={24} style={{ tintColor: focused ? '#ffffff' : 'rgba(255, 255, 255, 0.4)' }} />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -18,
                    width: 48,
                    height: 6,
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <LinearGradient
                    colors={['#d05bf8', '#ff18a0']}
                    start={{ x: 0.3, y: 0.11 }}
                    end={{ x: 1.17, y: 0.93 }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              )}
              <View
                style={{
                  position: 'absolute',
                  top: -2,
                  right: -6,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#eb46ca',
                  borderWidth: 1,
                  borderColor: '#000000',
                }}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <Icon name="home" size={24} style={{ tintColor: focused ? '#ffffff' : 'rgba(255, 255, 255, 0.4)' }} />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -18,
                    width: 48,
                    height: 6,
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <LinearGradient
                    colors={['#d05bf8', '#ff18a0']}
                    start={{ x: 0.3, y: 0.11 }}
                    end={{ x: 1.17, y: 0.93 }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <Icon name="explore" size={24} style={{ tintColor: focused ? '#ffffff' : 'rgba(255, 255, 255, 0.4)' }} />
              {focused && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: -18,
                    width: 48,
                    height: 6,
                    borderRadius: 3,
                    overflow: 'hidden',
                  }}
                >
                  <LinearGradient
                    colors={['#d05bf8', '#ff18a0']}
                    start={{ x: 0.3, y: 0.11 }}
                    end={{ x: 1.17, y: 0.93 }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

