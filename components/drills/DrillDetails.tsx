import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';

interface Drill {
  title: string;
  duration: number | string;
  videoUrl?: string;
  instructions: string;
  description: string;
  tips?: string[];
}

interface DrillDetailsProps {
  drill: Drill;
  videoHtml: (url: string) => string;
}

const DrillDetails: React.FC<DrillDetailsProps> = ({ drill, videoHtml }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.drillContainer}>
      <ThemedText style={styles.drillTitle}>{t(drill.title)}</ThemedText>
      <ThemedText style={styles.drillDuration}>
        {typeof drill.duration !== 'number' ? t(drill.duration) :
          drill.duration < 1 ? `${drill.duration * 60} ${t('seconds')}` : `${Math.floor(drill.duration)} ${t('minutes')}` + (drill.duration % 1 !== 0 ? ` ${drill.duration % 1 * 60} ${t('seconds')}` : '')}
      </ThemedText>
      {drill.videoUrl ? (
        <View style={styles.animationContainer}>
          <WebView
            originWhitelist={['*']}
            source={{ html: videoHtml(drill.videoUrl) }}
            style={styles.animation}
            onError={() => {
              console.error('Error loading video');
            }}
          />
        </View>
      ) : (
        <ThemedText style={styles.noVideoText}>{t('No video available')}</ThemedText>
      )}
      <ThemedText style={styles.sectionTitle}>{t('Instructions')}</ThemedText>
      <ThemedText style={styles.drillInstructions}>{t(drill.instructions)}</ThemedText>
      <ThemedText style={styles.sectionTitle}>{t('Objective')}</ThemedText>
      <ThemedText style={styles.drillDescription}>{t(drill.description)}</ThemedText>
      <ThemedText style={styles.sectionTitle}>{t('Tips')}</ThemedText>
      {drill.tips && drill.tips.length > 0 ? (
        <View style={styles.tipsContainer}>
          {drill.tips.map((tip, index) => (
            <ThemedText key={index} style={styles.tipItem}>{t(tip)}</ThemedText>
          ))}
        </View>
      ) : (
        <ThemedText style={styles.noTipsText}>{t('No tips available')}</ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drillContainer: {
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 6,
    marginVertical: 50,
  },
  drillTitle: {
    marginTop: 0,
    fontSize: 22,
    fontWeight: 'bold',
  },
  drillDuration: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  drillInstructions: {
    fontSize: 16,
    marginVertical: 10,
  },
  drillDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  timerText: {
    fontSize: 16,
    marginTop: 10,
  },
  animation: {
    width: 300,
    height: 100,
    marginVertical: -100,
    flex: 1,
    padding: 0,
    backgroundColor: 'transparent',
  },
  animationContainer: {
    width: 300,
    height: 150,
    marginVertical: 10,
  },
  noVideoText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  tipsContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  tipItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  noTipsText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});

export default DrillDetails;