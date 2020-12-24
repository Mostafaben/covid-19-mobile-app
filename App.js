import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './app/screens/home';
import ExploreScreen from './app/screens/explore';
import NewsScreen from './app/screens/news';
import BottomNavigation from './app/ui-components/bottom_navigation';
import { Directions } from 'react-native-gesture-handler';

const Tabs = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBar={({ navigation }) => (
          <BottomNavigation navigation={navigation} />
        )}
      >
        <Tabs.Screen
          name="home"
          component={HomeScreen}
          options={() => {
            return { animationDirection: Directions.LEFT };
          }}
        />
        <Tabs.Screen name="explore" component={ExploreScreen} />
        <Tabs.Screen name="news" component={NewsScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
