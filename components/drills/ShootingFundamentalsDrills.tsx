import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import { DrillDetailsScreenProps } from '../../types/navigationTypes';
import { drills as allDrills } from './drillsData';
import DrillsList from './DrillsList';
import { useTranslation } from 'react-i18next';

const initialDrills = allDrills.filter(drill =>
  ["Form Shots","Pound Shots","One Dribble Pull-ups","Free throws"]
  .includes(drill.title)
);

export default function ShootingFundamentalsDrills() {
  const { t } = useTranslation();
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();
  const [drills, setDrills] = useState(initialDrills);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/shooting-workout.png')}
          style={styles.reactLogo}
        />
        <View style={styles.infoContainer}>
          <ThemedText type="default">~ {drills.length * 5} {t('minutes')}</ThemedText>
          <ThemedText type="default">{drills.length} {t('exercises')}</ThemedText>
        </View>
      </View>
      <View style={styles.drillsContainer}>
        <DrillsList
          drills={drills}
          setDrills={setDrills}
        />
      </View>
      <View style={styles.startButtonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('WorkoutScreen', { drills })}>
          <ThemedText style={styles.startButtonText}>{t('Start')}</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  drillsContainer: {
    paddingBottom: 250,
  },
  reactLogo: {
    height: 200,
    width: '100%',
    marginBottom: 1,
    marginTop: -16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    right: 40,
    paddingHorizontal: 16,
  },
  startButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});