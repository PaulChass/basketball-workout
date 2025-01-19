import React from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { View, StyleSheet, Image } from 'react-native';
import DrillDetails from '../../components/drills/DrillDetails';
import { useRoute } from '@react-navigation/native';

export default function DrillDetailsScreen() {
  const route = useRoute();
  const { drill } = route.params;

  const videoHtml = (uri: string) => `
    <html>
      <body style="margin: 0; padding: 0; background-color: black;">
        <video src="${uri}" autoplay muted loop style="width: 100%; height: 100%;"></video>
      </body>
    </html>
  `;

  return (
    <ParallaxScrollView
                    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
                    headerImage={
                      <Image
                        source={require('@/assets/images/fundamentals.png')}
                        style={styles.reactLogo}
                      />
                    }>
    <View style={styles.container}>
      <DrillDetails
        drill={drill}
        videoHtml={videoHtml}
      />
    </View>
    </ParallaxScrollView>
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
});