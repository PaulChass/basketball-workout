import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getProgress, saveProgress } from '@/utils/storage';
import { useFocusEffect } from '@react-navigation/native';

export default function TabTwoScreen() {
  const [progress, setProgress] = useState<{ date: string } | null>(null);
  const [threePointChallenge, setThreePointChallenge] = useState<{ threesMade: number } | null>(null);
  const [dribblingChallenge, setDribblingChallenge] = useState<{ timeTaken: number }[]>([]); // Initialize with an empty array

  useFocusEffect(
    React.useCallback(() => {
      const fetchProgress = async () => {
        const savedProgress = await getProgress('workout');
        setProgress(savedProgress);
      };
      const fetchThreePointChallenge = async () => {
        const savedThreePointChallenge = await getProgress('threePointChallenge');
        setThreePointChallenge(savedThreePointChallenge);
      };
      const fetchDribblingChallenge = async () => {
        const savedDribblingChallenge = await getProgress('dribblingChallenge');
        setDribblingChallenge(savedDribblingChallenge || []); // Ensure it's an array
      };
      fetchProgress();
      fetchThreePointChallenge();
      fetchDribblingChallenge();
    }, [])
  );

  const resetStats = async () => {
    try {
      await saveProgress('workout', null);
      await saveProgress('threePointChallenge', null);
      await saveProgress('dribblingChallenge', null);
      setProgress(null);
      setThreePointChallenge(null);
      setDribblingChallenge([]); // Reset to an empty array
      alert('Les statistiques ont été réinitialisées.');
    } catch (e) {
      console.error('Failed to reset stats.', e);
    }
  };

  const calculateBestTime = (challenges: { timeTaken: number }[]) => {
    if (!Array.isArray(challenges) || challenges.length === 0) return null;
    return Math.min(...challenges.map((challenge: { timeTaken: number }) => challenge.timeTaken));
  };

  const calculateAverageTime = (challenges: { timeTaken: number }[]) => {
    if (!Array.isArray(challenges) || challenges.length === 0) return null;
    const total = challenges.reduce((sum: number, challenge: { timeTaken: number }) => sum + challenge.timeTaken, 0);
    return total / challenges.length;
  };

  const bestTime = calculateBestTime(dribblingChallenge);
  const averageTime = calculateAverageTime(dribblingChallenge);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Rapport</ThemedText>
      </ThemedView>
      <ThemedText>Ici les stats de l'utilisateur, les exercices effectués, les progrès, etc.</ThemedText>
      
      <View style={styles.progressContainer}>
        <ThemedText>Dernier entraînement terminé le: </ThemedText>
        <ThemedText>
          {progress && new Date(progress.date).toLocaleDateString()}
        </ThemedText>
      </View>
      <View style={styles.progressContainer}>
        <ThemedText>Record au 3 Point Challenge:</ThemedText>
        <ThemedText>
          {threePointChallenge && threePointChallenge.threesMade}
        </ThemedText>
      </View>
      <View style={styles.progressContainer}>
        <ThemedText>Meilleur temps pour le Dribbling Challenge:</ThemedText>
        <ThemedText>
          {bestTime !== null && (
            bestTime < 60 
              ? `${bestTime} sec` 
              : `${Math.floor(bestTime / 60)} min ${bestTime % 60} sec`
          )}
        </ThemedText>
      </View>
      <View style={styles.progressContainer}>
        <ThemedText>Temps moyen pour le Dribbling Challenge:</ThemedText>
        <ThemedText>
          {averageTime !== null && (
            averageTime < 60 
              ? `${averageTime.toFixed(2)} sec` 
              : `${Math.floor(averageTime / 60)} min ${(averageTime % 60).toFixed(2)} sec`
          )}
        </ThemedText>
      </View>
      <TouchableOpacity onPress={resetStats}>
        <ThemedText>Réinitialiser les statistiques</ThemedText>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  progressContainer: {
    marginTop: 20,
  },
});