import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import { Drill } from '@/types/Drill';


interface DrillDetailsProps {
  drill: Drill;
  webViewRef: React.RefObject<WebView>;
}

const DrillDetails: React.FC<DrillDetailsProps> = ({ drill, webViewRef }) => {
  const { t, i18n } = useTranslation();

  const seekToTime = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const script = `document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"seekTo","args":[${totalSeconds}, true]}', '*');`;
    webViewRef.current?.injectJavaScript(script);
  };

  const pauseVideoAndRewind = (time: string) => {
    const script = `document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":[]}', '*');`;
    webViewRef.current?.injectJavaScript(script);
    seekToTime(time);
  }

    
  

  return ( 
      <ScrollView>
        {drill.description &&
        <>
        <ThemedText style={styles.sectionTitle}>{t('Objective')}</ThemedText>
        <ThemedText style={styles.drillDescription}>{t(drill.description || '')}</ThemedText>
        </>
        }
        <ThemedText style={styles.sectionTitle}>{drill.instructions && t('Instructions')}</ThemedText>
        <ThemedText style={styles.drillInstructions}>{t(drill.instructions || '')}</ThemedText>
        {drill.timestamps && drill.timestamps.length > 0 && (
          <View style={styles.timestampsContainer}>
            {drill.timestamps.map((timestamp, index) => (
              <TouchableOpacity key={index} onPress={() => seekToTime(timestamp.time)}>
                <ThemedText style={styles.timestampItem}>{`${timestamp.time} - ${t(timestamp.label)}`}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.tipsContainer}>
          {drill.tips && drill.tips.length > 0 && (
            drill.tips.map((tip: string, index: number) => (
              <ThemedText key={index} style={styles.tipItem}>{t(tip)}</ThemedText>
            ))
          )}
          {drill.workoutSteps && drill.workoutSteps.length > 0 && (
            drill.workoutSteps.map((step, index) => (
              <View key={index} style={styles.timestampsContainer}>
              
              <TouchableOpacity onPress={() => seekToTime(step.time)}>
                <ThemedText style={styles.timestampItem}>{step.time && step.time + ':' }{t(step.title)}</ThemedText>
              </TouchableOpacity>
            
              </View>
            ))
          )}
        </View>
      </ScrollView>
      
  );
};

const styles = StyleSheet.create({
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
  tipsContainer: {

    marginTop: 0,
    alignItems: 'flex-start',
    paddingBottom: 120,
  },
  tipItem: {
    fontSize: 14,
    marginVertical: 10,
    justifyContent: 'flex-start',
  },
  timestampsContainer: {
    marginTop: 0,
    alignItems: 'flex-start',
  },
  timestampItem: {
    fontSize: 14,
    marginVertical: 5,
    textDecorationLine: 'underline',
  },
  noTipsText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  
  
});

export default DrillDetails;