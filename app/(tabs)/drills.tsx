import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';

import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree, useNavigation } from '@react-navigation/native';
import DribblingFundamentalsDrills from '../../components/drills/DribblingFundamentalsDrills';
import WorkoutScreen from '../../components/drills/WorkoutScreen';
import DrillDetailsScreen from '../../components/drills/DrillDetailsScreen';
import ThreePointChallenge from '@/components/drills/ThreePointChallenge';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function DribbleWorkoutsList() {
  const navigation = useNavigation();
  return (
    <View style={styles.tabContainer}>
      <ThemedText style={styles.subtitle}>Select a workout:</ThemedText>
      <TouchableOpacity onPress={() => navigation.navigate('DribblingFundamentalsDrills')}>
        <ImageBackground
          source={require('@/assets/images/fundamentals.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>Fondamentaux</Text>
          <ThemedText type="default">5 min - 5 exercices</ThemedText>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Navigate to Workout 2')}>
        <Text style={styles.buttonText}>Workout 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Navigate to Workout 3')}>
        <Text style={styles.buttonText}>Workout 3</Text>
      </TouchableOpacity>
    </View>
  );
}

function ShootWorkoutsList() {
  const navigation = useNavigation();

  return (
    <View style={styles.tabContainer}>
      <ThemedText style={styles.subtitle}>Select a workout:</ThemedText>
      <TouchableOpacity onPress={() => navigation.navigate('ThreePointChallenge')}>
        <ImageBackground
          source={require('@/assets/images/shooting-challenge.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>3pt Challenge</Text>
          <ThemedText type="default">1 minute</ThemedText>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Navigate to Workout 2')}>
        <Text style={styles.buttonText}>Shooting Workout 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Navigate to Workout 3')}>
        <Text style={styles.buttonText}>Workout 3</Text>
      </TouchableOpacity>
    </View>
  );
}

function LayupsWorkoutsList() {
  const navigation = useNavigation();
 
  return (
    <View style={styles.tabContainer}>
      <ThemedText style={styles.subtitle}>Select a workout:</ThemedText>
      <TouchableOpacity onPress={() => navigation.navigate('DribblingFundamentalsDrills')}>
        <ImageBackground
          source={require('@/assets/images/fundamentals.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>Fondamentaux</Text>
          <ThemedText type="default">5 min - 5 exercices</ThemedText>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Navigate to Workout 2')}>
        <Text style={styles.buttonText}>Workout 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Navigate to Workout 3')}>
        <Text style={styles.buttonText}>Workout 3</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function DrillsScreen() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator>
        <Stack.Screen name="DrillsTabs" component={DrillsTabs} options={{ headerShown: false }} />
        <Stack.Screen name="DribblingFundamentalsDrills" component={DribblingFundamentalsDrills} />
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
        <Stack.Screen name="DrillDetailsScreen" component={DrillDetailsScreen} />
        <Stack.Screen name="ThreePointChallenge" component={ThreePointChallenge} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

function DrillsTabs() {
  return (

    <View style={{ flex: 1 }} >
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/image.png')}
            style={styles.reactLogo}
          />
        }>
      </ParallaxScrollView>
      <View style={styles.tabNavigatorContainer}>
        <Tab.Navigator>
          <Tab.Screen name="Dribble" component={DribbleWorkoutsList} />
          <Tab.Screen name="Shoot" component={ShootWorkoutsList} />
          <Tab.Screen name="Layups" component={LayupsWorkoutsList} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  reactLogo: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  tabNavigatorContainer: {
    flex: 1,
    marginTop: -220, // Adjust this value to reduce the space between the header and the Tab.Navigator
  },
  buttonBackground: {
    height: 200,
    width: 360,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonImage: {
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});