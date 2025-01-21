import React, { useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { drills as allDrills } from './drillsData';

const initialDrills = allDrills.filter(drill =>
  ["Pound Dribble", "Crossover", "Dribble devant et derrière la ligne", "Entre les jambes", "Derrière le dos"].includes(drill.title)
);

export default function DribblingFundamentalsDrills() {
  const [drills, setDrills] = useState(initialDrills);
  const navigation = useNavigation();

  const videoHtml = (uri: string) => `
  <html>
    <body style="margin: 0; padding: 0;">
      <video src="${uri}" autoplay muted loop style="width: 100%; height: 100%;"></video>
    </body>
  </html>
`;

  const handleDeleteDrill = (index: number) => {
    const newDrills = drills.filter((_, i) => i !== index);
    setDrills(newDrills);
  };

  return (
    <View style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/fundamentals.png')}
            style={styles.reactLogo}
          />
        }>
        <View style={styles.container}>
          <ThemedText type="title">Exercices Fondamentaux de Dribble</ThemedText>
          <View style={styles.infoContainer}>
            <ThemedText type="default">2 min 30 sec</ThemedText>
            <ThemedText type="default">5 exercices</ThemedText>
          </View>
        </View>

        {drills.map((drill, index) => (
          <View key={index} style={styles.drillContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('DrillDetailsScreen', { drill })}>
              <View style={styles.infoBar}>
                <ThemedText type="subtitle">{drill.title}
                </ThemedText>
                <ThemedText type="default">Durée: {drill.duration < 1 ? `${drill.duration * 60} sec` : `${drill.duration} min`}
                </ThemedText>
              </View>

              {drill.videoUrl && (
                <View style={styles.animationBar}>
                  <WebView
                    originWhitelist={['*']}
                    source={{ html: videoHtml(drill.videoUrl) }}
                    style={styles.animation}
                  />
                  <TouchableOpacity onPress={() => handleDeleteDrill(index)} style={styles.deleteButton}>
                    <Icon name="delete" size={24} color="gray" />
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ))}
      </ParallaxScrollView>
      <View style={styles.startButtonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('WorkoutScreen', { drills })}>
          <ThemedText style={styles.startButtonText}>Commencer</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
  reactLogo: {
    height: 250,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  animation: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 100,
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  drillContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
  },
  infoBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  animationBar: {
    flexDirection: 'row',
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    right: 40,
    paddingHorizontal: 16,
  },
  startButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});