import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; 
import AllDrills from '../../components/drills/AllDrills';
import DrillDetailsScreen from '../../components/drills/DrillDetailsScreen';
import CustomWorkouts from '@/components/drills/CustomWorkouts';
import { DrillDetailsScreenProps } from '../../types/navigationTypes';
import FreeShootingSession from '@/components/drills/FreeShootingSession';
import ShootingFundamentalsDrills from '@/components/drills/ShootingFundamentalsDrills';
import { ScrollView } from 'react-native-gesture-handler';
import CreateDrill from '@/components/drills/CreateDrill';
import FeedbackForm from '@/components/forms/FeedbackForm';
import { ThemedView } from '@/components/ThemedView';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function DrillsCategories() {
  const { t } = useTranslation();
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  const categories = [
    'Workouts',
    'Masterclass',
    'Ball handling',
    'Shooting',
    'Finishing',
    'Learning moves',
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
      <ThemedView style={styles.tabContainer}>
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
      </ThemedView>
    </ScrollView>
  );
}

function ShootWorkoutsList() {
  const { t } = useTranslation(); 
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  return (
    <ScrollView>
      <ThemedView style={styles.tabContainer}>     
      <TouchableOpacity style={styles.categoryButton} onPress={() => navigation.navigate('FreeShootingSession')}>
        <ImageBackground
          source={require('@/assets/images/shooting-free.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage} 
        >
          <Text style={styles.buttonText}>{t('Free Shooting Session')}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('CustomWorkouts')}>
        <ImageBackground
          source={require('@/assets/images/shooting-challenge.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>{t('Custom workouts')}</Text>
        </ImageBackground>
      </TouchableOpacity>
      </ThemedView>
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
        <Stack.Screen name="CustomWorkouts" component={CustomWorkouts} />
        <Stack.Screen name="CreateDrill" component={CreateDrill} />
        <Stack.Screen name="FreeShootingSession" component={FreeShootingSession} />
        <Stack.Screen name="Feedback" component={FeedbackForm} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

function DrillsTabs() {
  return (

    <ThemedView style={{ flex: 1 }} >
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/image2.png')}
            style={styles.reactLogo}
          />
        }>
      </ParallaxScrollView>
      <ThemedView style={styles.tabNavigatorContainer}>
        <Tab.Navigator
         screenOptions={{
          tabBarStyle: { backgroundColor: 'black' },
          tabBarLabelStyle: { color: 'white' },
          tabBarIndicatorStyle: { backgroundColor: 'white' },
        }}>
          <Tab.Screen name="Videos" component={DrillsCategories} />
          <Tab.Screen name="Custom" component={ShootWorkoutsList} />
        </Tab.Navigator>
      </ThemedView> 
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    minHeight: 500,
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
    marginTop: -320,
  },
  buttonBackground: {
    height: 200,
    width: 360,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
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