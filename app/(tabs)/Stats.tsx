import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getProgress, saveProgress } from '@/utils/storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function TabTwoScreen() {
  const [progress, setProgress] = useState<{ date: string } | null>(null);
  const [threePointChallenge, setThreePointChallenge] = useState<{ threesMade: number } | null>(null);
  const [dribblingChallenge, setDribblingChallenge] = useState<{ timeTaken: number }[]>([]);
  const [zoneStats, setZoneStats] = useState<{ [key: string]: { shotsAttempted: number, shotsMade: number } }>({});

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
        setDribblingChallenge(savedDribblingChallenge || []);
      };
      const fetchZoneStats = async () => {
        const zones = [
          '3pt-left-corner', '3pt-left-wing', '3pt-top', '3pt-right-wing', '3pt-right-corner',
          'mid-left', 'mid-left-center', 'mid-center', 'mid-right-center', 'mid-right',
        ];
        const stats: { [key: string]: { shotsAttempted: number, shotsMade: number } } = {};
        for (const zone of zones) {
          const zoneProgress = await getProgress(`progress_${zone}`);
          if (zoneProgress) {
            stats[zone] = zoneProgress;
          } else {
            stats[zone] = { shotsAttempted: 0, shotsMade: 0 };
          }
        }
        setZoneStats(stats);
      };
      fetchProgress();
      fetchThreePointChallenge();
      fetchDribblingChallenge();
      fetchZoneStats();
    }, [])
  );

  const resetStats = async () => {
    try {
      await saveProgress('workout', null);
      await saveProgress('threePointChallenge', null);
      await saveProgress('dribblingChallenge', null);
      const zones = [
        '3pt-left-corner', '3pt-left-wing', '3pt-top', '3pt-right-wing', '3pt-right-corner',
        'mid-left', 'mid-left-center', 'mid-center', 'mid-right-center', 'mid-right',
      ];
      for (const zone of zones) {
        await saveProgress(`progress_${zone}`, null);
      }
      setProgress(null);
      setThreePointChallenge(null);
      setDribblingChallenge([]);
      setZoneStats({});
      alert('Les statistiques ont été réinitialisées.');
    } catch (e) {
      console.error('Failed to reset stats.', e);
    }
  };

  const resetSpecificStat = async (key: string) => {
    try {
      await saveProgress(key, null);
      if (key === 'workout') {
        setProgress(null);
      } else if (key === 'threePointChallenge') {
        setThreePointChallenge(null);
      } else if (key === 'dribblingChallenge') {
        setDribblingChallenge([]);
      } else {
        const newZoneStats = { ...zoneStats };
        newZoneStats[key] = { shotsAttempted: 0, shotsMade: 0 };
        setZoneStats(newZoneStats);
      }
      alert('Statistique réinitialisée.');
    } catch (e) {
      console.error('Failed to reset stat.', e);
    }
  };

  const zoneLabels = {
    '3pt-left-corner': '3PT - Coin Gauche',
    '3pt-left-wing': '3PT - 45° Gauche',
    '3pt-top': '3PT - Centre',
    '3pt-right-wing': '3PT - 45° Droite',
    '3pt-right-corner': '3PT - Coin Droit',
    'mid-left': 'Mi-distance Gauche',
    'mid-left-center': 'Mi-distance Centre Gauche',
    'mid-center': 'Mi-distance Centre',
    'mid-right-center': 'Mi-distance Centre Droite',
    'mid-right': 'Mi-distance Droite',
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

  const calculateSuccessRate = (shotsAttempted: number, shotsMade: number) => {
    if (shotsAttempted === 0) return 'N/A';
    return ((shotsMade / shotsAttempted) * 100).toFixed(2) + '%';
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
          {progress ? new Date(progress.date).toLocaleDateString() : 'N/A'}
        </ThemedText>
        <TouchableOpacity onPress={() => resetSpecificStat('workout')} style={styles.resetIcon}>
          <Icon name="refresh" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <ThemedText>Record au 3 Point Challenge:</ThemedText>
        <ThemedText>
          {threePointChallenge ? threePointChallenge.threesMade : 'N/A'}
        </ThemedText>
        <TouchableOpacity onPress={() => resetSpecificStat('threePointChallenge')} style={styles.resetIcon}>
          <Icon name="refresh" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.fullWidth}> 
        <ThemedText style={styles.fullWidth}>Dribble Challenge:</ThemedText>
        <ThemedText >Meilleur temps:  
          {bestTime !== null ? (
            bestTime < 60 
              ? `${bestTime} sec` 
              : `${Math.floor(bestTime / 60)} min ${ bestTime % 60} sec`
          ) : ' N/A'}
        </ThemedText>
        <ThemedText>Temps Moyen:
          {averageTime !== null ? (
            averageTime < 60 
              ? `${averageTime.toFixed(2)} sec` 
              : `${Math.floor(averageTime / 60)} min ${(averageTime % 60).toFixed(2)} sec`
          ) : ' N/A'}
        </ThemedText>
        </View>
        <TouchableOpacity onPress={() => resetSpecificStat('dribblingChallenge')} style={styles.resetIcon}>
          <Icon name="refresh" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {Object.keys(zoneStats).map((zone) => (
          <View key={zone} style={styles.zoneContainer}>
            <ThemedText style={styles.zoneLabel}>{zoneLabels[zone as keyof typeof zoneLabels]}:</ThemedText>
            <ThemedText>Tirs réussis: {zoneStats[zone].shotsMade}</ThemedText>
            <ThemedText>Tirs tentés: {zoneStats[zone].shotsAttempted}</ThemedText>
            <ThemedText>Pourcentage de réussite: {calculateSuccessRate(zoneStats[zone].shotsAttempted, zoneStats[zone].shotsMade)}</ThemedText>
            <TouchableOpacity onPress={() => resetSpecificStat(`progress_${zone}`)} style={styles.resetIcon}>
              <Icon name="refresh" size={24} color="gray" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  zoneContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'grey',
    flexWrap: 'wrap',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  zoneLabel: {
    fontWeight: 'bold',
    width: '80%',
  },
  fullWidth: {
    width: '80%',
  },
  resetIcon: {
    marginLeft: 10,
  },
});