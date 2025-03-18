import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';
import * as Speech from 'expo-speech';

interface CountdownCircleProps {
  totalTime: number;
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({ totalTime }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [countdown, setCountdown] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const { t, i18n } = useTranslation();
  

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStarted && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      const speechLanguage = i18n.language === 'fr' ? 'fr-FR' : i18n.language ==='es' ? 'es-ES' : 'en-US';
      if (countdown > 0 && !isPaused) {
        Speech.speak(`${countdown}`, { language: speechLanguage });
      }
    } else if (isStarted && countdown === 0 && isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, countdown, isRunning, isPaused]);

  const handleStart = () => {
    setIsStarted(true);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsPaused(false);
    setIsRunning(true);
  };

  const handleRestart = () => {
    setIsStarted(false);
    setIsRunning(false);
    setIsPaused(false);
    setTimeRemaining(totalTime);
    setCountdown(5);
  };

  const fill = (timeRemaining / totalTime) * 100;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  };

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={10}
        fill={fill}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={180}
        lineCap="round"
      >
        {() => (
          <ThemedText style={styles.timerText}>
            {!isStarted ? (
              <TouchableOpacity onPress={handleStart}>
                <ThemedText>Start</ThemedText>
              </TouchableOpacity>
            ) : countdown > 0 ? (
              `Ready? ${countdown}`
            ) : timeRemaining > 0 ? (
              formatTime(timeRemaining)
            ) : (
              <TouchableOpacity onPress={handleRestart}>
                <ThemedText>Restart</ThemedText>
              </TouchableOpacity>
            )}
          </ThemedText>
        )}
      </AnimatedCircularProgress>
      {isStarted && !isPaused && countdown === 0 && timeRemaining > 0 && (
        <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
          <ThemedText style={styles.pauseButtonText}>Pause</ThemedText>
        </TouchableOpacity>
      )}
      {isPaused && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resumeButton} onPress={handleResume}>
            <ThemedText style={styles.resumeButtonText}>Resume</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
            <ThemedText style={styles.restartButtonText}>Restart</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pauseButton: {
    marginTop: 20,
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  pauseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  resumeButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  resumeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  restartButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  restartButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CountdownCircle;