import React , {useEffect, useState, useRef} from 'react';
import { View, StyleSheet } from 'react-native';
import DrillDetails from '../../components/drills/DrillDetails';
import {  useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigate } from 'expo-router/build/global-state/routing';
import WorkoutScreen from '../../components/drills/WorkoutScreen';
import WebView from 'react-native-webview';

export default function DrillDetailsScreen() {
  const route = useRoute<{ key: string; name: string; params: { drill: any } }>();
  const navigation = useNavigation<NavigationProp<any>>();
  const { drill } = route.params;
  const { i18n, t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWorkoutScreen, setIsWorkoutScreen] = useState(false);
  const webViewRef = useRef<WebView>(null);
  const [currentTime, setCurrentTime] = useState(0);
  

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

  const markAsDone = async () => {
    const date = new Date().toISOString();
    try {
      // mark the drill as done
      await AsyncStorage.setItem(`doneDrill:${drill.title}`, date);
      navigation.goBack();
    } catch (error) {
      console.error('Error storing drill as done:', error);
    }
  };

  const videoHtml = (url: string) => {
    let videoId = url.includes('v=') ? url.split('v=')[1] : 
    url.split('youtu.be/')[1] ;
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
  
    return `
      <html>
        <body style="margin:0;">
          <div id="player"></div>
          <script>
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
            var player;
            function onYouTubeIframeAPIReady() {
              player = new YT.Player('player', {
                height: '100%',
                width: '100%',
                videoId: '${videoId}',
                events: {
                  'onReady': onPlayerReady
                }
              });
            }
  
            function onPlayerReady(event) {
              event.target.playVideo();
            }
  
            function seekTo(seconds) {
              player.seekTo(seconds, true);
            }
          </script>
        </body>
      </html>
    `;
  };

  return (
      <View style={styles.container}>
        <ThemedText style={styles.drillTitle}>{t(drill.title)}</ThemedText>
              <ThemedText style={styles.drillDuration}>
                {typeof drill.duration !== 'number' ? t(drill.duration) :
                  drill.duration < 1 ? `${drill.duration * 60} ${t('seconds')}` : `${Math.floor(drill.duration)} ${t('minutes')}` + (drill.duration % 1 !== 0 ? ` ${drill.duration % 1 * 60} ${t('seconds')}` : '')}
              </ThemedText>
              {drill.videoUrl ? (
                <View style={styles.animationContainer}>
                  <WebView
                    key={drill.videoUrl}
                    originWhitelist={['*']}
                    ref={webViewRef}
                    source={{ html: videoHtml(drill.videoUrl) }}
                    style={styles.animation}
                    allowsFullscreenVideo={true}
                    onError={() => {
                      console.error('Error loading video');
                    }}
                    onMessage={(event) => {
                      const eventTime = event.nativeEvent.data;
                      setCurrentTime(Number(eventTime));
                    }}
                  />
                  
                </View>
              ) : (
                <View style={styles.animationContainer}>
                  </View>
              )}
              {i18n.language !== 'en' && drill.videoUrl && (
                <ThemedText style={styles.captionsInfo}>{t('Click on the CC button in the video player to enable captions')}</ThemedText>
              )}
        {isWorkoutScreen ? (
          <WorkoutScreen drill={drill} webViewRef={webViewRef} currentTime = {currentTime}/>
        ) : (
          <><DrillDetails
            drill={drill}
            webViewRef={webViewRef}
          />
       
        <View style={styles.doneButtonContainer}>
        {drill.workoutSteps?.length > 0 ? (
          <TouchableOpacity style={styles.doneButton} onPress={() => setIsWorkoutScreen(true)}>
            <ThemedText style={styles.doneButtonText}>{t('Start Workout')}</ThemedText>
          </TouchableOpacity>
        ) : (
        <TouchableOpacity style={styles.doneButton} onPress={markAsDone}>
                <ThemedText style={styles.doneButtonText}>{t('Done')}</ThemedText>
        </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.favoriteIcon} onPress={toggleFavorite}>
                <Icon name="favorite" size={24} color={isFavorite ? 'red' : 'gray'} />
              </TouchableOpacity>
        </View>
      
        </>
            )}          
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactLogo: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  doneButtonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  doneButton: {
    opacity: 1,
    backgroundColor: 'blue',
    borderRadius: 25,
    padding: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    elevation: 5,
    marginHorizontal: 25,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
    marginHorizontal: 25,
  },
  drillContainer: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginHorizontal: 6,
    marginVertical: 10,
    marginBottom: -100,
  },
  drillTitle: {
    marginTop: 0,
    fontSize: 20,
    fontWeight: 'bold',
  },
  drillDuration: {
    fontSize: 16,
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
  captionsInfo: {
    fontSize: 8,
    opacity: 0.8,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 0,
    color: 'gray',
  },
  noVideoText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
});