import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getProgress, saveProgress } from '@/utils/storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function TabTwoScreen() {
  const { t } = useTranslation(); // Initialize useTranslation
  const [progress, setProgress] = useState<{ date: string } | null>(null);
  const [threePointChallenge, setThreePointChallenge] = useState<{ threesMade: number } | null>(null);
  const [zoneStats, setZoneStats] = useState<{ [key: string]: { shotsAttempted: number, shotsMade: number } }>({});
  const [updated, setUpdated] = useState(false);

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
      fetchZoneStats(); 
    }, [updated])
  );

  const resetStats = async () => {
    try {
      await saveProgress('workout', null);
      await saveProgress('threePointChallenge', null);
      const zones = [
        '3pt-left-corner', '3pt-left-wing', '3pt-top', '3pt-right-wing', '3pt-right-corner',
        'mid-left', 'mid-left-center', 'mid-center', 'mid-right-center', 'mid-right',
      ];
      for (const zone of zones) {
        await saveProgress(`progress_${zone}`, null);
      }
      setProgress(null);
      setThreePointChallenge(null);
      setZoneStats({});
      alert(t('Stats have been reset.'));
      setUpdated(!updated);
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
      } else {
        const newZoneStats = { ...zoneStats };
        newZoneStats[key] = { shotsAttempted: 0, shotsMade: 0 };
        setZoneStats(newZoneStats);
      }
      alert(t('Stat has been reset.'));
      setUpdated(!updated);
    } catch (e) {
      console.error('Failed to reset stat.', e);
    }
  };

  const zoneLabels = {
    '3pt-left-corner': t('3PT - Left Corner'),
    '3pt-left-wing': t('3PT - Left Wing'),
    '3pt-top': t('3PT - Top'),
    '3pt-right-wing': t('3PT - Right Wing'),
    '3pt-right-corner': t('3PT - Right Corner'),
    'mid-left': t('Mid-range Left'),
    'mid-left-center': t('Mid-range Left Center'),
    'mid-center': t('Mid-range Center'),
    'mid-right-center': t('Mid-range Right Center'),
    'mid-right': t('Mid-range Right'),
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
          <ThemedText type="title">{t('Settings')}</ThemedText>          
        </ThemedView>
      <View style={styles.progressContainer}>
        <ThemedText>{t('Language')}</ThemedText>
        <LanguageSwitcher />
      </View>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('Report')}</ThemedText>
      </ThemedView>
      <ThemedText>{t('Here are the user stats, completed exercises, progress, etc.')}</ThemedText>
      
      <View style={styles.progressContainer}>
        <ThemedText>{t('Last workout completed on:')}</ThemedText>
        <ThemedText>
          {progress ? new Date(progress.date).toLocaleDateString() : 'N/A'}
        </ThemedText>
      </View>
      <View style={styles.progressContainer}>
        <ThemedText>{t('Record in the 3 Point Challenge:')}</ThemedText>
        <ThemedText>
          {threePointChallenge ? threePointChallenge.threesMade : 'N/A'}
        </ThemedText>
        <TouchableOpacity onPress={() => resetSpecificStat('threePointChallenge')} style={styles.resetIcon}>
          <Icon name="refresh" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {Object.keys(zoneStats).map((zone) => (
          <View key={zone} style={styles.zoneContainer}>
            <View style={styles.fullWidth}>
            <ThemedText style={styles.zoneLabel}>{zoneLabels[zone as keyof typeof zoneLabels]}:</ThemedText>
            <ThemedText>{t('Shots Made')}: {zoneStats[zone].shotsMade}</ThemedText>
            <ThemedText>{t('Shots Attempted')}: {zoneStats[zone].shotsAttempted}</ThemedText>
            <ThemedText>{t('Success Rate')}: {calculateSuccessRate(zoneStats[zone].shotsAttempted, zoneStats[zone].shotsMade)}</ThemedText>
            
            </View>
            <TouchableOpacity onPress={() => resetSpecificStat(`progress_${zone}`)} style={styles.resetIcon}>
              <Icon name="refresh" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={resetStats}>
        <ThemedText>{t('Reset stats')}</ThemedText>
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
    width: '100%',
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