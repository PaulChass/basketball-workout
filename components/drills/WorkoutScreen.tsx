import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { drills } from './drillsData.js';


export default function WorkoutScreen() {
  const [currentDrillIndex, setCurrentDrillIndex] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(4);
  const [isMuted, setIsMuted] = useState(false);
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
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    } else if (currentDrillIndex >= 0 && currentDrillIndex < drills.length) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      const timer = setTimeout(() => {
        setCurrentDrillIndex((prevIndex) => prevIndex + 1);
        if(currentDrillIndex !== drills.length - 1) {
        setTimeRemaining(drills[currentDrillIndex + 1]?.duration * 60 || 0);}
      }, drills[currentDrillIndex].duration * 60 * 1000); // duration per drill

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [currentDrillIndex]);

  useEffect(() => {
    if (currentDrillIndex >= 0 && timeRemaining === drills[currentDrillIndex].duration * 30) {
      if (!isMuted) Speech.speak('Mi-temps', { language: 'fr-FR' });
    }
  }, [timeRemaining, isMuted]);

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

  const handleNextDrill = () => {
    Speech.stop();
    setCurrentDrillIndex((prevIndex) => prevIndex + 1);
    if(currentDrillIndex !== drills.length - 1) {
    setTimeRemaining(drills[currentDrillIndex + 1]?.duration * 60 || 0);
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
        <TouchableOpacity onPress={handleMuteToggle} style={styles.iconButton}>
          <Icon name={isMuted ? "volume-off" : "volume-up"} size={30} color={'gray'} />
        </TouchableOpacity>
      </View>
      {currentDrillIndex === -1 ? (
        <ThemedText style={styles.text}>Prêt à y aller...</ThemedText>
      ) : currentDrillIndex < drills.length ? (
        <View style={styles.drillContainer}>
          <ThemedText style={styles.drillTitle}>{drills[currentDrillIndex].title}</ThemedText>
          <ThemedText style={styles.drillDuration}>{drills[currentDrillIndex].duration} minute</ThemedText>
          {drills[currentDrillIndex].videoUrl ? (
            <WebView
              originWhitelist={['*']}
              source={{ html: videoHtml(drills[currentDrillIndex].videoUrl) }}
              style={styles.animation}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
              }}
            />
          ) : (
            <ThemedText style={styles.noVideoText}>Pas de vidéo disponible</ThemedText>
          )}
          <ThemedText style={styles.sectionTitle}>Instruction</ThemedText>
          <ThemedText style={styles.drillInstructions}>{drills[currentDrillIndex].instructions}</ThemedText>
          <ThemedText style={styles.sectionTitle}>Objectif</ThemedText>
          <ThemedText style={styles.drillDescription}>{drills[currentDrillIndex].description}</ThemedText>
          <ThemedText style={styles.timerText}>Temps restant: {timeRemaining} secondes</ThemedText>
          <TouchableOpacity onPress={handleNextDrill} style={styles.nextButton}>
            <ThemedText style={styles.nextButtonText}>Exercice suivant</ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <ThemedText style={styles.text}>Entraînement terminé!</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  drillContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  drillTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  drillDuration: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  drillInstructions: {
    fontSize: 16,
    marginVertical: 10,
  },
  drillDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  timerText: {
    fontSize: 16,
    marginTop: 10,
  },
  animation: {
    width: 300,
    height: 100,
    marginVertical: 10,
    flex: 1,
    backgroundColor: 'transparent', // Add background color for debugging
  },
  noVideoText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
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

