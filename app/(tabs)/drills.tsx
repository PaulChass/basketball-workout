import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import DribblingFundamentalsDrills from '../../components/drills/DribblingFundamentalsDrills';
import LayupsFundamentalsDrills from '../../components/drills/LayupsFundamentalsDrills';
import DribblingChallenge from '@/components/drills/DribblingChallenge';  
import WorkoutScreen from '../../components/drills/WorkoutScreen';
import DrillDetailsScreen from '../../components/drills/DrillDetailsScreen';
import ThreePointChallenge from '@/components/drills/ThreePointChallenge';
import { DrillDetailsScreenProps } from '../../types/navigationTypes';
import FreeShootingSession from '@/components/drills/FreeShootingSession';
import ShootingFundamentalsDrills from '@/components/drills/ShootingFundamentalsDrills';
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function DribbleWorkoutsList() {
  const { t } = useTranslation(); // Initialize useTranslation
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('DribblingFundamentalsDrills')}>
        <ImageBackground
          source={require('@/assets/images/fundamentals.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>{t('Fundamentals')}</Text>
          <ThemedText style={styles.default} type="default">{t('5 min - 5 exercises')}</ThemedText>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('DribblingChallenge')}>
        <ImageBackground
          source={require('@/assets/images/dribble-challenge.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <ThemedText style={styles.buttonText}>{t('Dribble Challenge')}</ThemedText>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert(t('Coming soon!'))}>
        <Text style={styles.buttonText}>{t('Combos / Moves')}</Text>
      </TouchableOpacity>
    </View>
  );
}

function ShootWorkoutsList() {
  const { t } = useTranslation(); 
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  return (
    <ScrollView>
      <View
    style={styles.tabContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('FreeShootingSession')}>
        <ImageBackground
          source={require('@/assets/images/shooting-free.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage} 
        >
          <Text style={styles.buttonText}>{t('Free Shooting Session')}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate(ShootingFundamentalsDrills)}>
      <ImageBackground
          source={require('@/assets/images/shooting-workout.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
        <Text style={styles.buttonText}>{t('Shooting Drills')}</Text>
      </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ThreePointChallenge')}>
        <ImageBackground
          source={require('@/assets/images/shooting-challenge.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>{t('3pt Challenge')}</Text>
          <ThemedText style={styles.default} type="default">{t('1 minute')}</ThemedText>
        </ImageBackground>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function LayupsWorkoutsList() {
  const { t } = useTranslation();
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();
 
  return (
    <View style={styles.tabContainer}>
      <ThemedText style={styles.subtitle}>{t('Select a workout:')}</ThemedText>
      <TouchableOpacity onPress={() =>navigation.navigate('LayupsFundamentalsDrills')}>
        <ImageBackground
          source={require('@/assets/images/layups.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>{t('Fundamentals')}</Text>
          <ThemedText style={styles.default} type="default">{t('5 x 5 Layups')}</ThemedText>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert(t('Coming soon!'))}>
        <Text style={styles.buttonText}>{t('Advanced Layups')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert(t('Coming soon!'))}>
        <Text style={styles.buttonText}>{t('Counter - Layups')}</Text>
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
        <Stack.Screen name="LayupsFundamentalsDrills" component={LayupsFundamentalsDrills} />
        <Stack.Screen name="ShootingFundamentalsDrills" component={ShootingFundamentalsDrills} />
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
        <Stack.Screen name="DrillDetailsScreen" component={DrillDetailsScreen} />
        <Stack.Screen name="ThreePointChallenge" component={ThreePointChallenge} />
        <Stack.Screen name="DribblingChallenge" component={DribblingChallenge} />
        <Stack.Screen name="FreeShootingSession" component={FreeShootingSession} />
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
  default: {
    fontSize: 16,
    color: 'white',
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
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