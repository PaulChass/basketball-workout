import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { saveProgress } from '@/utils/storage';
import useStopwatch from '@/hooks/useStopwatch';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const DribblingChallenge = () => {
  const { time, isRunning, showSubmit, startStopwatch, stopStopwatch, resetStopwatch } = useStopwatch();
  const [timeTaken, setTimeTaken] = useState('');

  const handleSubmit = async () => {
    try {
      const completionDate = new Date().toISOString();
      saveProgress('dribblingChallenge', { timeTaken: time, date: completionDate });
      alert('Temps envoyé avec succès!');
    } catch (e) {
      console.error('Failed to save the time taken for the dribbling challenge.', e);
    }
  };

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/fundamentals.png')}
            style={styles.reactLogo}
          />
        }>
        <View style={styles.container}>
          <ThemedText style={styles.description}>
            Fais les exercices de dribble le plus vite possible.
          </ThemedText>
          
          <AnimatedCircularProgress
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
                time < 60 ? `${time} sec` : `${Math.floor(time / 60)} min ${time % 60} sec`
              }</ThemedText>
            )}
          </AnimatedCircularProgress>
        </View>
        {!isRunning && !showSubmit && (
          <TouchableOpacity style={styles.button} onPress={startStopwatch}>
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        )}
        {isRunning && (
          <TouchableOpacity style={styles.button} onPress={stopStopwatch}>
            <Text style={styles.buttonText}>Arrêter</Text>
          </TouchableOpacity>
        )}
        {showSubmit && (
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Envoyer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetStopwatch}>
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

export default DribblingChallenge;