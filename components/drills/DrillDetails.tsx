import React , {useState}from 'react';
import { View, StyleSheet,TouchableOpacity } from 'react-native';
import { ThemedText } from '../ThemedText';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';

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
  const {i18n} = useTranslation();
  const [refreshKey, setRefreshKey] = useState(0);


  return (
    <View style={styles.drillContainer}>
      <ThemedText style={styles.drillTitle}>{t(drill.title)}</ThemedText>
      <ThemedText style={styles.drillDuration}>
        {typeof drill.duration !== 'number' ? t(drill.duration) :
          drill.duration < 1 ? `${drill.duration * 60} ${t('seconds')}` : `${Math.floor(drill.duration)} ${t('minutes')}` + (drill.duration % 1 !== 0 ? ` ${drill.duration % 1 * 60} ${t('seconds')}` : '')}
      </ThemedText>
      {drill.videoUrl ? (
        <View style="">
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
         
          <TouchableOpacity style={styles.refreshIcon} onPress={() => setRefreshKey(refreshKey + 1)}>
                  <Icon name="refresh" size={24} color="gray" />
            </TouchableOpacity>
        
        </View>
        { i18n.language !== 'en' &&
        <ThemedText style={styles.captionsInfo}>{t('Click on the CC button in the video player to enable captions')}</ThemedText>
        }
        </View>
        
      ) : (
        <ThemedText style={styles.noVideoText}>{t('No video available')}</ThemedText>
      )}
      <ScrollView>
      <ThemedText style={styles.sectionTitle}>{t('Instructions')}</ThemedText>
      <ThemedText style={styles.drillInstructions}>{t(drill.instructions)}</ThemedText>
      <ThemedText style={styles.sectionTitle}>{t('Objective')}</ThemedText>
      <ThemedText style={styles.drillDescription}>{t(drill.description)}</ThemedText>
      {drill.tips && drill.tips.length > 0 && 
        <View style={styles.tipsContainer}>
            <ThemedText style={styles.sectionTitle}>{t('Tips')}</ThemedText>
          {drill.tips.map((tip, index) => (
            <ThemedText key={index} style={styles.tipItem}>{t(tip)}</ThemedText>
          ))}
        </View>
      }  
      </ScrollView>
      
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
    marginVertical: 0,
    flex: 1,
    backgroundColor: 'transparent',
  },
  animationContainer: {
    flexDirection: 'row',
    width: 300,
    height: 150,
    marginTop: 10,
    marginBottom: 0,
  },
  refreshIcon: {
    position: 'absolute',
    top: 50,
    right: -30,
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
  captionsInfo: {
    fontSize: 8,
    opacity: 0.8,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 0,
    color: 'gray',
  },
});

export default DrillDetails;