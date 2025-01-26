import { Image, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next'; // Import useTranslation

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { t } = useTranslation(); // Initialize useTranslation

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/image2.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('Welcome!')}
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('Explore training programs')}
        </ThemedText>
        <ThemedText>
        {t('Discover a library of exercises and interactive drills suitable for all levels.')}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('Track your progress')}
        </ThemedText>
        <ThemedText>
        {t('Keep an eye on your progress with simple and motivating indicators.')}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('Create personalized programs')}
        </ThemedText>
        <ThemedText>
        {t('Design custom training sessions according to your goals and schedule.')}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
