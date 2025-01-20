import React, { useState, useEffect } from 'react';
import { View, Image, Button, TextInput, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as Speech from 'expo-speech';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { saveProgress, getProgress } from '@/utils/storage';

const ThreePointChallenge = () => {
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [threesMade, setThreesMade] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (timer <= 3 && timer > 0 && isTimerRunning) {
      Speech.speak(`${timer}`, { language: 'fr-FR' });
    }
  }, [timer]);

  const startTimer = () => {
    setIsTimerRunning(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          setShowInput(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSubmit = async () => {
    try {
      const completionDate = new Date().toISOString();
      const progress = await getProgress('threePointChallenge');
      if (progress) {
        const { threesMade: prevThreesMade } = progress;
        const newThreesMade = parseInt(threesMade, 10);
        if (newThreesMade > prevThreesMade) {
          Speech.speak('Nouveau record! Félicitations!', { language: 'fr-FR' });
          saveProgress('threePointChallenge', { threesMade: newThreesMade, date: completionDate });
        }
      }
    } catch (e) {
      console.error('Failed to save the number of 3-pointers.', e);
    }
  };

  const handleRestart = () => {
    setThreesMade('');
    setShowInput(false);
    setTimer(60);
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
          <>
            <ThemedText style={styles.description}>
              Marquez autant de 3 points que possible en une minute.
            </ThemedText>
            <ThemedText style={styles.timer}>{timer} secondes restantes</ThemedText>
          </>
        )}
        {!isTimerRunning && !showInput && (
          <Button title="Commencer le minuteur" onPress={startTimer} />
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
            <Button title='Réessayer' onPress={() => handleRestart()} />
            <Button title="Soumettre" onPress={handleSubmit} />
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
  description: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  timer: {
    fontSize: 14,
    marginBottom: 16,
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
});

export default ThreePointChallenge;