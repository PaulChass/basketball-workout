import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import AllDrills from '../../components/drills/AllDrills';
import WorkoutScreen from '../../components/drills/WorkoutScreen';
import DrillDetailsScreen from '../../components/drills/DrillDetailsScreen';
import ThreePointChallenge from '@/components/drills/ThreePointChallenge';
import { DrillDetailsScreenProps } from '../../types/navigationTypes';
import FreeShootingSession from '@/components/drills/FreeShootingSession';
import ShootingFundamentalsDrills from '@/components/drills/ShootingFundamentalsDrills';
import { ScrollView } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function DrillsCategories() {
  const { t } = useTranslation();
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  const categories = [
    'Masterclass',
    'Workouts',
    'Learning moves',
    'Ball handling',
    'Shooting',
    'Finishing',
    'Strength & conditionning',
  ];

  const categoriesBackground: { [key: string]: any } = {
    'Masterclass': require('@/assets/images/jordan.png'),
    'Workouts': require('@/assets/images/workouts.png'),
    'Learning moves': require('@/assets/images/kyrie.png'),
    'Ball handling': require('@/assets/images/fundamentals.png'),
    Shooting: require('@/assets/images/shooting-workout.png'),
    Finishing: require('@/assets/images/layups.png'),
    'Strength & conditionning': require('@/assets/images/stamina.png'),
  };

  return (
    <ScrollView >
      <View style={styles.tabContainer}>
      {categories.map(category => (
        <TouchableOpacity
          key={category}
          style={styles.categoryButton}
          onPress={() => navigation.navigate('AllDrillsList', { category })}
        >
          <ImageBackground
          source={categoriesBackground[category] }
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage} 
        >
                    <ThemedText style={styles.categoryButtonText}>{t(category)}</ThemedText>

        </ImageBackground>
        </TouchableOpacity>
      ))}
      </View>
    </ScrollView>
  );
}

function ShootWorkoutsList() {
  const { t } = useTranslation(); 
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  return (
    <ScrollView>
      <View style={styles.tabContainer}>     
      <TouchableOpacity onPress={() => navigation.navigate('FreeShootingSession')}>
        <ImageBackground
          source={require('@/assets/images/shooting-free.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage} 
        >
          <Text style={styles.buttonText}>{t('Free Shooting Session')}</Text>
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


export default function DrillsScreen() {
  const { t } = useTranslation();
  return (
    <NavigationIndependentTree>
      <Stack.Navigator>
        <Stack.Screen name="DrillsTabs" component={DrillsTabs} options={{ headerShown: false }} />
        <Stack.Screen name="AllDrillsList"         
                      options={({ route }) => ({ title: (route.params as { category?: string }).category ?? 'All' })}
                      component={AllDrills}
                      initialParams={{ category: 'All' }} />
        <Stack.Screen name="ShootingFundamentalsDrills" component={ShootingFundamentalsDrills} />
      
        <Stack.Screen name="DrillDetailsScreen"
        component={DrillDetailsScreen}
        options={({ route }) => {
          const params = route.params as { drill: { title: string } };
          return { title: params ? params.drill.title : 'Drill Details' };
        }}         />
        <Stack.Screen name="ThreePointChallenge" component={ThreePointChallenge} />
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
            source={require('@/assets/images/image2.png')}
            style={styles.reactLogo}
          />
        }>
      </ParallaxScrollView>
      <View style={styles.tabNavigatorContainer}>
        <Tab.Navigator>
          <Tab.Screen name="Drills" component={DrillsCategories} />
          <Tab.Screen name="Challenges" component={ShootWorkoutsList} />
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
  buttonAllDrills: {
    backgroundColor: '#1E90FF',
    padding: 16,
    borderRadius: 25,
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
    marginTop: -300,
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
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 5,
  },
  categoryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});