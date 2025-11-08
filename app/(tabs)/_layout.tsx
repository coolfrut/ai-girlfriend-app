import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@/components/Icon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 20,
          left: 25,
          right: 25,
          height: 56,
          borderRadius: 60,
          paddingBottom: 0,
        },
        tabBarActiveTintColor: '#d05bf8',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <Icon name="home" size={24} style={{ tintColor: focused ? '#d05bf8' : 'rgba(255, 255, 255, 0.5)' }} />
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
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <Icon name="explore" size={24} style={{ tintColor: focused ? '#d05bf8' : 'rgba(255, 255, 255, 0.5)' }} />
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
        name="chats"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative', alignItems: 'center' }}>
              <Icon name="chat" size={24} style={{ tintColor: focused ? '#d05bf8' : 'rgba(255, 255, 255, 0.5)' }} />
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
    </Tabs>
  );
}

