import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { saveProgress } from '../../utils/storage';
import DrillDetails from './DrillDetails';
import { useRoute } from '@react-navigation/native';
import CountdownCircle from '../ui/CountdownCircle';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import MuteButton from '../ui/MuteButton';
import { useTranslation } from 'react-i18next';

export default function WorkoutScreen() {
  const { t, i18n } = useTranslation();
  const [currentDrillIndex, setCurrentDrillIndex] = useState(-1);
  const [timeRemaining, setTimeRemaining] = useState(4);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const route = useRoute();
  const { drills } = route.params as { drills: { title: string; duration: number; instructions: string; description: string }[] };

  const speechLanguage = i18n.language === 'fr' ? 'fr-FR' : 'en-US';

  useEffect(() => {
    if (currentDrillIndex === -1) {
      if (!isMuted) Speech.speak(t('Ready to go...'), { language: speechLanguage });
    } else if (currentDrillIndex >= 0 && currentDrillIndex < drills.length) {
      if (!isMuted) {
        Speech.speak(t(drills[currentDrillIndex].title), { language: speechLanguage });
        if (drills[currentDrillIndex].duration >= 1) {
          Speech.speak(drills[currentDrillIndex].duration + ' ' + t('minutes'), { language: speechLanguage });
        } else {
          let seconds = drills[currentDrillIndex].duration * 60;
          Speech.speak(seconds + ' ' + t('seconds'), { language: speechLanguage });
        }
      }
    }
  }, [currentDrillIndex, isMuted, speechLanguage]);

  useEffect(() => {
    if (currentDrillIndex === -1) {
      const timer = setTimeout(() => {
        setCurrentDrillIndex(0);
        setTimeRemaining(drills[0].duration * 60);
      }, timeRemaining * 1000);
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
      alert(t('Workout Completed!'));
    }
  };

  const videoHtml = (uri: string) => {
    const isYouTubeUrl = uri.includes('youtube.com') || uri.includes('youtu.be');
    if (isYouTubeUrl) {
      let videoId = '';
      try {
        if (uri.includes('youtube.com')) {
          const urlParams = new URLSearchParams(new URL(uri).search);
          videoId = urlParams.get('v') || '';
        } else if (uri.includes('youtu.be')) {
          videoId = uri.split('/').pop() || '';
        }
      } catch (error) {
        console.error('Failed to extract YouTube video ID:', error);
      }
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return `
        <html>
          <body style="margin: 0; padding: 0; background-color: black;">
            <iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </body>
        </html>
      `;
    } else {
      return `
        <html>
          <body style="margin: 0; padding: 0; background-color: black;">
            <video src="${uri}" muted loop style="width: 100%; height: 100%;"></video>
          </body>
        </html>
      `;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {currentDrillIndex !== drills.length && (<>
          <MuteButton isMuted={isMuted} setIsMuted={setIsMuted}/>
          </>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {currentDrillIndex === -1 ? (
          <View style={styles.readyContainer}>
            <ThemedText style={styles.readyText}>{t('Ready to go...')}</ThemedText>
            <CountdownCircle totalTime={timeRemaining} />
          </View>
        ) : currentDrillIndex < drills.length ? (
          <View style={styles.drillContainer}>
            <DrillDetails drill={drills[currentDrillIndex]} videoHtml={videoHtml} />
            <AnimatedCircularProgress
              size={200}
              width={10}
              fill={(timeRemaining / drills[currentDrillIndex].duration / 60) * 100}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
              rotation={180}
              lineCap="round"
            >
              {() => (
                <ThemedText style={styles.timerText}>
                  {timeRemaining < 60 ? `${timeRemaining} ${t('seconds')}` : `${Math.floor(timeRemaining / 60)} ${t('minutes')} ${timeRemaining % 60} ${t('seconds')}`}
                </ThemedText>
              )}  
            </AnimatedCircularProgress>

          </View>
        ) : (
          <ThemedText style={styles.text}>{t('Experience Feedback Form')}</ThemedText>
        )}
      </ScrollView>
      {currentDrillIndex !== drills.length && currentDrillIndex !== -1 && (
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity onPress={handlePauseToggle} style={styles.nextButton}>
            <Icon style={styles.pauseIcon} name={isPaused ? "play-arrow" : "pause"} size={30}  />
          </TouchableOpacity>

        <TouchableOpacity onPress={handleNextDrill} style={styles.nextButton}>
          <ThemedText style={styles.nextButtonText}>{t('Next')} ( {timeRemaining}s )</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setTimeRemaining((prev) => prev + 15)} style={styles.nextButton}>
          <ThemedText style={styles.nextButtonText}>+ 15s</ThemedText>  
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
  readyText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  pauseIcon: {
    color: 'white',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  readyContainer: {
    alignItems: 'center',
  
    justifyContent: 'center',
  },
});