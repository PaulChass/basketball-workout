import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { saveProgress, getProgress } from '../../utils/storage';
import DrillDetails from './DrillDetails';

import { drills } from './drillsData';

export default function WorkoutScreen() {
  const [currentDrillIndex, setCurrentDrillIndex] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(4);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (currentDrillIndex === -1) {
      if (!isMuted) Speech.speak('Prêt à y aller...', { language: 'fr-FR' });
    } else if (currentDrillIndex >= 0 && currentDrillIndex < drills.length) {
      if (!isMuted) {
        Speech.speak(drills[currentDrillIndex].title);
        if (drills[currentDrillIndex].duration >= 1) {
          Speech.speak(drills[currentDrillIndex].duration + ' minute', { language: 'fr-FR' });
        } else {
          let seconds = drills[currentDrillIndex].duration * 60;
          Speech.speak(seconds + ' secondes', { language: 'fr-FR' });
        }
      }
    }
  }, [currentDrillIndex, isMuted]);

  useEffect(() => {
    if (currentDrillIndex === -1) {
      const timer = setTimeout(() => {
        setCurrentDrillIndex(0);
        setTimeRemaining(drills[0].duration * 60);
      }, 3000); // 2 seconds delay
      return () => clearTimeout(timer);
    } else if (currentDrillIndex >= 0 && currentDrillIndex < drills.length) {
      const interval = setInterval(() => {
        if (!isPaused) {
          setTimeRemaining((prev) => prev - 1);
        }
      }, 1000);

      const timer = setTimeout(() => {
        if (!isPaused) {
          setCurrentDrillIndex((prevIndex) => prevIndex + 1);
          if (currentDrillIndex !== drills.length - 1) {
            setTimeRemaining(drills[currentDrillIndex + 1]?.duration * 60 || 0);
          } else {
            const completionDate = new Date().toISOString();
            saveProgress('workout', { completed: true, date: completionDate });
          }
        }
      }, drills[currentDrillIndex].duration * 60 * 1000); // duration per drill

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [currentDrillIndex, isPaused]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        Speech.stop();
      };
    }, [])
  );

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    Speech.stop();
  };

  const handlePauseToggle = () => {
    setIsPaused(!isPaused);
  };

  const handleNextDrill = () => {
    Speech.stop();
    setCurrentDrillIndex((prevIndex) => prevIndex + 1);
    if (currentDrillIndex !== drills.length - 1) {
      setTimeRemaining(drills[currentDrillIndex + 1]?.duration * 60 || 0);
    }
    else {
      const completionDate = new Date().toISOString();
      saveProgress('workout', { completed: true, date: completionDate });
      alert('Entraînement terminé!');
    }
  };

  const videoHtml = (uri: string) => `
    <html>
      <body style="margin: 0; padding: 0; background-color: black;">
        <video src="${uri}" autoplay muted loop style="width: 100%; height: 100%;"></video>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {currentDrillIndex !== drills.length && (<>
          <TouchableOpacity onPress={handleMuteToggle} style={styles.iconButton}>
            <Icon name={isMuted ? "volume-off" : "volume-up"} size={30} color={'gray'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePauseToggle} style={styles.iconButton}>
            <Icon name={isPaused ? "play-arrow" : "pause"} size={30} color={'gray'} />
          </TouchableOpacity></>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {currentDrillIndex === -1 ? (
          <ThemedText style={styles.text}>Prêt à y aller...</ThemedText>
        ) : currentDrillIndex < drills.length ? (
          <View style={styles.drillContainer}>
            <DrillDetails drill={drills[currentDrillIndex]} videoHtml={videoHtml} />
          </View>
        ) : (
          <ThemedText style={styles.text}>Ici , mettre un formulaire de reours d'expérience.</ThemedText>
        )}
      </ScrollView>
      {currentDrillIndex !== drills.length && currentDrillIndex !== -1 && (
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity onPress={handleNextDrill} style={styles.nextButton}>
          <ThemedText style={styles.nextButtonText}>Exercice suivant ( {timeRemaining}s )</ThemedText>
        </TouchableOpacity>
       
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  iconButton: {
    padding: 8,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100, // Add padding to avoid content being hidden behind the button
  },
  drillContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  timerText: {
    fontSize: 16,
    marginTop: 10,
  },
  nextButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});