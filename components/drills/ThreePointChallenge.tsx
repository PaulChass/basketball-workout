import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as Speech from 'expo-speech';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { saveProgress, getProgress } from '@/utils/storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import CountdownCircle from '../ui/CountdownCircle';
import MuteButton from '../ui/MuteButton';
import { useTranslation } from 'react-i18next';

const ThreePointChallenge = () => {
  const { t, i18n } = useTranslation();
  const [timer, setTimer] = useState(60);
  const [showCountdownCircle, setShowCountdownCircle] = useState(false);  
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [threesMade, setThreesMade] = useState('');
  const [showInput, setShowInput] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showRestart, setShowRestart] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speechLanguage = i18n.language === 'fr' ? 
  'fr-FR' : i18n.language ==='es' ? 'es-ES' : 'en-US';

  useEffect(() => {
    if (timer <= 3 && timer > 0 && isTimerRunning && !isMuted) {
      Speech.speak(`${timer}`, { language: speechLanguage });
    }
  }, [timer, speechLanguage]);

  const readyToGo = () => {
    let timeRemaining = 5;
    !isMuted && Speech.speak(t('Ready to go...'), { language: speechLanguage });
    setInterval(() => {
      timeRemaining--;
      if (0 < timeRemaining && timeRemaining < 4 && !isMuted) {
        let speak = timeRemaining.toString();
        Speech.speak(speak, { language: speechLanguage });
      }
      if (timeRemaining === 0 && !isMuted) {
        Speech.speak(t('Go!'), { language: speechLanguage });
        Speech.speak(t('Score as many 3-pointers as possible in one minute.'), { language: speechLanguage });
      }
    }, 1000);

    setShowCountdownCircle(true);
    setTimeout(() => {
      setShowCountdownCircle(false);
      startTimer();
    }, 5000);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current!);
          setIsTimerRunning(false);
          setShowInput(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setShowRestart(true);
    setIsPaused(true);
    setIsTimerRunning(false);
  };

  const handleSubmit = async () => {
    try {
      const completionDate = new Date().toISOString();
      const progress = await getProgress('threePointChallenge');
      if (progress) {
        const { threesMade: prevThreesMade } = progress;
        const newThreesMade = parseInt(threesMade, 10);
        if (newThreesMade > prevThreesMade) {
          alert(t('Success') + '! ' + t('New record! Congratulations!'));
          saveProgress('threePointChallenge', { threesMade: newThreesMade, date: completionDate });
        } else {
          alert(t('No record this time. Try again!'));
        }
      } else {
        saveProgress('threePointChallenge', { threesMade: parseInt(threesMade, 10), date: completionDate });
        alert(t('Number of 3-pointers successfully recorded!'));
      }
    } catch (e) {
      console.error('Failed to save the number of 3-pointers.', e);
    }
  };

  const handleRestart = () => {
    setThreesMade('');
    setShowInput(false);
    setShowRestart(false);
    setTimer(60);
  };

  const resumeTimer = () => {
    setShowRestart(false);
    setIsPaused(false);
    setIsTimerRunning(true);
    startTimer();
  };

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/shooting-challenge.png')}
            style={styles.reactLogo}
          />
        }>
        {!showInput && (
          <View style={styles.container}>
            <ThemedText style={styles.description}>
              {t('Score as many 3-pointers as possible in one minute.')}
            </ThemedText>
            <MuteButton isMuted={isMuted} setIsMuted={setIsMuted} />
            {showCountdownCircle ? (
              <>
                <ThemedText style={styles.timer}>{t('Ready?')}</ThemedText>
                <CountdownCircle totalTime={5} />
              </>
            ) : (
              (isTimerRunning || isPaused) && (
                <AnimatedCircularProgress
                  size={200}
                  width={10}
                  fill={(timer / 60) * 100}
                  tintColor="#00e0ff"
                  backgroundColor="#3d5875"
                  rotation={180}
                  lineCap="round"
                >
                  {() => (
                    <ThemedText style={styles.timer}>
                      {timer} {t('seconds remaining')}
                    </ThemedText>
                  )}
                </AnimatedCircularProgress>
              )
            )}
          </View>
        )}
        {!isTimerRunning && !showInput && (
          showRestart ? (
            <View style={styles.containerButtons}>
              <TouchableOpacity style={styles.button} onPress={() => resumeTimer()}>
                <Text style={styles.buttonText}>{t('Resume')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonRetry]} onPress={handleRestart}>
                <Text style={styles.buttonText}>{t('Retry')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            !showCountdownCircle && (
              <TouchableOpacity style={styles.button} onPress={readyToGo}>
                <Text style={styles.buttonText}>{t('Start')}</Text>
              </TouchableOpacity>
            )
          )
        )}
        {isTimerRunning && !showInput && (
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={styles.buttonText}>{t('Stop')}</Text>
          </TouchableOpacity>
        )}
        {showInput && (
          <View>
            <ThemedText style={styles.description}>{t('Number of 3-pointers made')}:</ThemedText>
            <TextInput
              style={styles.input}
              placeholder={t('Enter the number of 3-pointers')}
              placeholderTextColor="grey"
              keyboardType="numeric"
              value={threesMade}
              onChangeText={setThreesMade}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{t('Submit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonRetry]} onPress={handleRestart}>
              <Text style={styles.buttonText}>{t('Retry')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ParallaxScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  containerButtons: {
    marginTop: -20,
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  input: {
    height: 60,
    color: 'gray',
    borderColor: 'gray',
    textAlign: 'center',
    borderWidth: 1,
    marginBottom: 16,
    padding: 0,
    width: '100%',
    borderRadius: 25,
  },
  reactLogo: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRetry: {
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ThreePointChallenge;