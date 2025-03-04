import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { saveProgress, getProgress } from '@/utils/storage';
import useStopwatch from '@/hooks/useStopwatch';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { drills as allDrills } from './drillsData';
import DrillsList from './DrillsList';
import { Drill } from '../../types/Drill';
import { useTranslation } from 'react-i18next';

const initialDrills: Drill[] = allDrills.filter(drill =>
  [
    "Wrap Around (no dribble)", 
    "Figure 8 (no dribble)",
    "Wrap Around (with dribble)", 
    "Figure 8 (with dribble)"
  ].includes(drill.title)
) as Drill[];

const DribblingChallenge = () => {
  const { t } = useTranslation();
  const { time, isRunning, showSubmit, startStopwatch, stopStopwatch, resetStopwatch } = useStopwatch();
  const [drills, setDrills] = useState(initialDrills);
  

    const handleSubmit = async () => {
      try {
        const savedDribblingChallenge = await getProgress('dribblingChallenge');
        const dribblingChallengeArray = Array.isArray(savedDribblingChallenge) ? savedDribblingChallenge : [];
        const newDribblingChallenge = [...dribblingChallengeArray, { timeTaken: time, date: new Date().toISOString() }];
        await saveProgress('dribblingChallenge', newDribblingChallenge);
        alert(t('Success') + '! ' + t('Time successfully submitted!'));
      } catch (e) {
        console.error('Failed to save the time taken for the dribbling challenge.', e);
      }
    };

  return (
    <View style={styles.scrollContainer}>
      <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/dribble-challenge.png')}
            style={styles.reactLogo}
          />
          
        <ThemedText style={styles.description}>
          {t('Complete the following dribbling exercises as quickly as possible.')}
        </ThemedText>
      </View>
      { !isRunning && !showSubmit && 
      <View style={styles.drillsContainer}>
      <DrillsList
          drills={drills}
          setDrills={setDrills}
        /></View>}
      
        <View style={styles.infoContainer}>
        {(isRunning || showSubmit) && <AnimatedCircularProgress
          size={200}
          width={10}
          fill={(time % 60) * 100 / 60}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <ThemedText style={styles.timer}>{ 
              time < 60 ? `${time} ${t('sec')}` : `${Math.floor(time / 60)} ${t('min')} ${time % 60} ${t('sec')}`
            }</ThemedText>
          )}
        </AnimatedCircularProgress>}
        {!isRunning && !showSubmit && (
          <TouchableOpacity style={styles.button} onPress={startStopwatch}>
            <Text style={styles.buttonText}>{t('Start')}</Text>
          </TouchableOpacity>
        )}
        {isRunning && (
          <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
            <Text style={styles.buttonText}>{t('Stop')}</Text>
          </TouchableOpacity>
        )}
        {showSubmit && (
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{t('Submit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
              <Text style={styles.buttonText}>{t('Retry')}</Text>
            </TouchableOpacity>
          </View>
        )}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  drillsContainer: {
    marginTop: 300,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
  },
  description: {
    fontSize: 18,
    marginBottom: 26,
    textAlign: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  reactLogo: {
    marginTop: 0,
    height: 200,
    width: '100%',
    marginBottom: 16,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DribblingChallenge;