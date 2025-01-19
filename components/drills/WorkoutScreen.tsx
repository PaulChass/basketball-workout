import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { WebView } from 'react-native-webview';
import * as Speech from 'expo-speech';
import { drills } from './drillsData.js';

export default function WorkoutScreen() {
  const [currentDrillIndex, setCurrentDrillIndex] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(4);

  useEffect(() => {
    if (currentDrillIndex >= 0 && currentDrillIndex < drills.length) {
        Speech.speak(drills[currentDrillIndex].title, { language: 'fr-FR' });        
        if(drills[currentDrillIndex].duration >=1)
            {
                Speech.speak(drills[currentDrillIndex].duration + ' minute', { language: 'fr-FR' });
            }  
        else{
            let seconds = drills[currentDrillIndex].duration * 60;
            Speech.speak(seconds+ 'secondes', { language: 'fr-FR' });
        }
        
        Speech.speak(drills[currentDrillIndex].description, { language: 'fr-FR' });
    }
  }, [currentDrillIndex]);

  useEffect(() => {
    if (currentDrillIndex === -1) {
      const timer = setTimeout(() => {
        setCurrentDrillIndex(0);
        setTimeRemaining(drills[0].duration * 60);
      }, 4000); // 4 seconds delay
      return () => clearTimeout(timer);
    } else if (currentDrillIndex >= 0 && currentDrillIndex < drills.length) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      const timer = setTimeout(() => {
        setCurrentDrillIndex((prevIndex) => prevIndex + 1);
        setTimeRemaining(drills[currentDrillIndex + 1].duration * 60);
      }, drills[currentDrillIndex].duration * 60 * 1000); // 10 seconds per drill

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [currentDrillIndex]);

  //if time remaining is half of the total time, the app will speak the remaining time
    useEffect(() => {
        if (currentDrillIndex >= 0 && timeRemaining === drills[currentDrillIndex].duration * 30) {
        Speech.speak('Mi-temps', { language: 'fr-FR' });
        }
    }, [timeRemaining]);

  const videoHtml = (uri) => `
    <html>
      <body style="margin: 0; padding: 0; background-color: black;">
        <video src="${uri}" autoplay muted loop style="width: 100%; height: 100%;"></video>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
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
          <ThemedText style={styles.drillDescription}>{drills[currentDrillIndex].description}</ThemedText>
          <ThemedText style={styles.timerText}>Temps restant: {timeRemaining} secondes</ThemedText>
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  drillContainer: {
    alignItems: 'center',
  },
  drillTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
  },
  drillDuration: {
    fontSize: 18,
  },
  drillDescription: {
    fontSize: 16,
    marginVertical: 0,
    marginTop: 10,
    marginBottom: 100,
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
    backgroundColor: 'transparant', // Add background color for debugging
  },
  noVideoText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});