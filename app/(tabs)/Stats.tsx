import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getProgress } from '@/utils/storage';
import { useFocusEffect } from '@react-navigation/native';
import { saveProgress } from '../../utils/storage';

export default function TabTwoScreen() {
  const [progress, setProgress] = useState(null);
  const [threePointChallenge, setThreePointChallenge] = useState(null);

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
      fetchProgress();
      fetchThreePointChallenge();
    }, [])
  );

  const resetStats = async () => {
    try {
      await saveProgress('workout', null);
      await saveProgress('threePointChallenge', null);
      setProgress(null);
      setThreePointChallenge(null);
      alert('Les statistiques ont été réinitialisées.');
    } catch (e) {
      console.error('Failed to reset stats.', e);
    }
  };

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
          <ThemedText>Record au 3 Point Challenge:
          </ThemedText>
          <ThemedText>
            {threePointChallenge && threePointChallenge.threesMade}
            </ThemedText>
        </View>
        <TouchableOpacity  onPress={resetStats}>
        <ThemedText >Réinitialiser les statistiques</ThemedText>
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