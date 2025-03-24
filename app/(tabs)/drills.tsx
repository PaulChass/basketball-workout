import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { Image } from 'react-native';
import { Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationIndependentTree, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; 
import AllDrills from '../../components/drills/AllDrills';
import DrillDetailsScreen from '../../components/drills/DrillDetailsScreen';
import CustomWorkouts from '@/components/drills/CustomWorkouts';
import { DrillDetailsScreenProps } from '../../types/navigationTypes';
import FreeShootingSession from '@/components/drills/FreeShootingSession';
import CreateDrill from '@/components/drills/CreateDrill';
import { ThemedView } from '@/components/ThemedView';
import DrillsCategories from '@/components/drills/DrillCategories';

const Stack = createStackNavigator();

function DrillsCategoriesLink() {
  const { t } = useTranslation();
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  return (
    <ThemedView style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => {
            navigation.navigate('DrillsCategories');
          }}
        >
          <ImageBackground
            source={require('@/assets/images/fundamentals.png')}
            style={styles.buttonBackground}
            imageStyle={styles.buttonImage}
          >
            <ThemedText style={styles.categoryButtonText}>{t(('All Drills, Videos and Workouts'))}</ThemedText>
          </ImageBackground>
        </TouchableOpacity>
    </ThemedView>
  );
}

function ShootWorkoutsList() {
  const { t } = useTranslation();
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  console.log('Rendering ShootWorkoutsList');

  return (
    <ThemedView style={styles.tabContainer}>
      <TouchableOpacity style={styles.categoryButton} onPress={() => {
        console.log('Navigating to FreeShootingSession');
        navigation.navigate('FreeShootingSession');
      }}>
        <ImageBackground
          source={require('@/assets/images/shooting-free.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>{t('Free Shooting Session')}</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        console.log('Navigating to CustomWorkouts');
        navigation.navigate('CustomWorkouts');
      }}>
        <ImageBackground
          source={require('@/assets/images/shooting-challenge.png')}
          style={styles.buttonBackground}
          imageStyle={styles.buttonImage}
        >
          <Text style={styles.buttonText}>{t('Custom workouts')}</Text>
        </ImageBackground>
      </TouchableOpacity>
    </ThemedView>
  );
}

function DrillsAndWorkouts() {
  return (
    <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
          headerImage={
            <Image
              source={require('@/assets/images/image2.png')}
              style={styles.reactLogo}
            />
          }>
      <DrillsCategoriesLink />
      <ShootWorkoutsList />
    </ParallaxScrollView>
  );
}

const DrillsScreen = () => {
  const { t } = useTranslation();
  console.log('Rendering DrillsScreen');
  return (
    <NavigationIndependentTree>
      <Stack.Navigator>
        <Stack.Screen name="DrillsAndWorkouts" component={DrillsAndWorkouts} options={{ headerShown: false }} />
        <Stack.Screen name="AllDrillsList"
                      options={({ route }) => ({ title: (route.params as { category?: string }).category ?? 'All' })}
                      component={AllDrills}
                      initialParams={{ category: 'All' }} />
        <Stack.Screen name="DrillDetailsScreen"
                      component={DrillDetailsScreen}
                      options={({ route }) => {
                        const params = route.params as { drill: { title: string } };
                        return { title: params ? params.drill.title : 'Drill Details' };
                      }} />
        <Stack.Screen name="CustomWorkouts" component={CustomWorkouts} />
        <Stack.Screen name="CreateDrill" component={CreateDrill} />
        <Stack.Screen name="FreeShootingSession" component={FreeShootingSession} />
        <Stack.Screen name="DrillsCategories" component={DrillsCategories} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

export default DrillsScreen;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 0,
    marginTop: -20,
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
    marginTop: 320,
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