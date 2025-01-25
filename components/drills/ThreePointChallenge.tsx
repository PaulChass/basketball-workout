import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as Speech from 'expo-speech';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { saveProgress, getProgress } from '@/utils/storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const ThreePointChallenge = () => {
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [threesMade, setThreesMade] = useState('');
  const [showInput, setShowInput] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    if (timer <= 3 && timer > 0 && isTimerRunning) {
      Speech.speak(`${timer}`, { language: 'fr-FR' });
    }
  }, [timer]);

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
    setIsTimerRunning(false);
    setShowRestart(true);
  };

  const handleSubmit = async () => {
    try {
      const completionDate = new Date().toISOString();
      const progress = await getProgress('threePointChallenge');
      if (progress) {
        const { threesMade: prevThreesMade } = progress;
        const newThreesMade = parseInt(threesMade, 10);
        if (newThreesMade > prevThreesMade) {
          alert('Nouveau record! Félicitations!');
          saveProgress('threePointChallenge', { threesMade: newThreesMade, date: completionDate });
        }
        else {
          alert('Pas de record cette fois-ci. Essayez encore!');
        }
      }
      else {
        saveProgress('threePointChallenge', { threesMade: parseInt(threesMade, 10), date: completionDate });
        alert('Nombre de 3 points enregistré avec succès!');
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
              Marquez autant de 3 points que possible en une minute.
            </ThemedText>
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
                <ThemedText style={styles.timer}>{timer} secondes restantes</ThemedText>
              )}
            </AnimatedCircularProgress>
          </View>
        )}
        {!isTimerRunning && !showInput && (
          showRestart ? (
            <View style={styles.containerButtons}>
            <TouchableOpacity style={styles.button} onPress={() => resumeTimer()}>
              <Text style={styles.buttonText}>Continuer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRestart}>
              <Text style={styles.buttonText}>Réessayer</Text>
            </TouchableOpacity>
            
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={startTimer}>
              <Text style={styles.buttonText}>Commencer</Text>
            </TouchableOpacity>
          )
        )}
        {isTimerRunning && !showInput && (
          <TouchableOpacity style={styles.button} onPress={stopTimer}>
            <Text style={styles.buttonText}>Arrêter</Text>
          </TouchableOpacity>
        )}
        {showInput && (
          <View>
            <ThemedText style={styles.description}>Nombre de 3pts réussis:</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Entrez le nombre de 3 points"
              keyboardType="numeric"
              value={threesMade}
              onChangeText={setThreesMade}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Soumettre</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleRestart}>
              <Text style={styles.buttonText}>Réessayer</Text>
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
    height: 40,
    color: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '80%',
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
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ThreePointChallenge;