import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const ThreePointChallenge = () => {
  const [timer, setTimer] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [threesMade, setThreesMade] = useState('');
  const [showInput, setShowInput] = useState(false);

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

  return (
    <View style={styles.container}>
      
      {!showInput && (<ThemedText style={styles.description}>
        Marquez autant de 3 points que possible en une minute.
      </ThemedText>)}
      <ThemedText style={styles.timer}>{timer} secondes restantes</ThemedText>
      {!isTimerRunning && !showInput && (
        <Button title="Commencer le minuteur" onPress={startTimer} />
      )}
      {showInput && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Entrez le nombre de 3 points"
            keyboardType="numeric"
            value={threesMade}
            onChangeText={setThreesMade}
          />
          <Button title="Soumettre" onPress={() => alert(`Vous avez marqué ${threesMade} trois points!`)} />
        </View>
      )}
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
});

export default ThreePointChallenge;