import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const { t, i18n } = useTranslation();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favoriteDrills');
        const favoriteDrills = storedFavorites ? JSON.parse(storedFavorites) : [];
        setIsFavorite(favoriteDrills.includes(drill.title));
      } catch (error) {
        console.error('Error checking favorite drill:', error);
      }
    };

    checkFavorite();
  }, [drill.title]);

  const markAsDone = async () => {
    const date = new Date().toISOString();
    try {
      await AsyncStorage.setItem(`done_${drill.title}`, date);
      
    } catch (error) {
      console.error('Error storing drill as done:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favoriteDrills');
      const favoriteDrills = storedFavorites ? JSON.parse(storedFavorites) : [];
      if (favoriteDrills.includes(drill.title)) {
        const updatedFavorites = favoriteDrills.filter((title: string) => title !== drill.title);
        await AsyncStorage.setItem('favoriteDrills', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      } else {
        favoriteDrills.push(drill.title);
        await AsyncStorage.setItem('favoriteDrills', JSON.stringify(favoriteDrills));
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite drill:', error);
    }
  };

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
            key={refreshKey}
            originWhitelist={['*']}
            source={{ html: videoHtml(drill.videoUrl) }}
            style={styles.animation}
            allowsFullscreenVideo={true}
            onError={() => {
              console.error('Error loading video');
            }}
          />
          
        </View>
      ) : (
        <ThemedText style={styles.noVideoText}>{t('No video available')}</ThemedText>
      )}
      {i18n.language !== 'en' && (
        <ThemedText style={styles.captionsInfo}>{t('Click on the CC button in the video player to enable captions')}</ThemedText>
      )}
      <ScrollView>
        <ThemedText style={styles.sectionTitle}>{t('Objective')}</ThemedText>
        <ThemedText style={styles.drillDescription}>{t(drill.description)}</ThemedText>
        <ThemedText style={styles.sectionTitle}>{t('Instructions')}</ThemedText>
        <ThemedText style={styles.drillInstructions}>{t(drill.instructions)}</ThemedText>
        {drill.tips && drill.tips.length > 0 && (
          <View style={styles.tipsContainer}>
            {drill.tips.map((tip, index) => (
              <ThemedText key={index} style={styles.tipItem}>{t(tip)}</ThemedText>
            ))}
          </View>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
        <Icon name="favorite" size={24} color={isFavorite ? 'red' : 'gray'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.doneButton} onPress={markAsDone}>
        <ThemedText style={styles.doneButtonText}>{t('Done')}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drillContainer: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 6,
    marginVertical: 10,
  },
  drillTitle: {
    marginTop: 0,
    fontSize: 20,
    fontWeight: 'bold',
  },
  drillDuration: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  drillInstructions: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  drillDescription: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
  timerText: {
    fontSize: 16,
    marginTop: 10,
  },
  animation: {
    marginVertical: 0,
    flex: 1,
    backgroundColor: 'transparent',
  },
  animationContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 0,
  },
  noVideoText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  tipsContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
    paddingBottom: 100,
  },
  tipItem: {
    fontSize: 14,
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  noTipsText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  captionsInfo: {
    fontSize: 8,
    opacity: 0.8,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 0,
    color: 'gray',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 8,
    elevation: 5,
  },
  doneButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DrillDetails;