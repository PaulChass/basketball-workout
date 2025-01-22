import React from 'react';
import Animated from 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';
import DrillDetails from '../../components/drills/DrillDetails';
import { useRoute } from '@react-navigation/native';

export default function DrillDetailsScreen() {
  const route = useRoute<{ key: string; name: string; params: { drill: any } }>();
  const { drill } = route.params;

  const videoHtml = (uri: string) => `
    <html>
      <body style="margin: 0; padding: 0; background-color: black;">
        <video src="${uri}" autoplay muted loop style="width: 100%; height: 100%;"></video>
      </body>
    </html>
  `;

  return (
    <Animated.ScrollView>
    <View style={styles.container}>
      <DrillDetails
        drill={drill}
        videoHtml={videoHtml}
      />
    </View>
    </Animated.ScrollView>
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