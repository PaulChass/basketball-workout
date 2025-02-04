import React from 'react';
import { View, StyleSheet } from 'react-native';
import DrillDetails from '../../components/drills/DrillDetails';
import {  useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function DrillDetailsScreen() {
  const route = useRoute<{ key: string; name: string; params: { drill: any } }>();
  const { drill } = route.params;
  const { i18n } = useTranslation();

  const videoHtml = (uri: string) => {
    const isYouTubeUrl = uri.includes('youtube.com') || uri.includes('youtu.be');
    if (isYouTubeUrl) {
      let videoId = '';
      try {
        if (uri.includes('youtube.com')) {
          const urlParams = new URLSearchParams(new URL(uri).search);
          videoId = urlParams.get('v') || '';
        } else if (uri.includes('youtu.be')) {
          videoId = uri.split('/').pop() || '';
        }
      } catch (error) {
        console.error('Failed to extract YouTube video ID:', error);
      }
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&cc_load_policy=1&cc_lang_pref=${i18n.language}`;
      return `
        <html>
          <body style="margin: 0; padding: 0; background-color: black;">
            <iframe width="100%" height="100%" src="${embedUrl}" frameborder="0" allow="autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </body>
        </html>
      `;
    } else {
      return `
        <html>
          <body style="margin: 0; padding: 0; background-color: black;">
            <video src="${uri}" autoplay muted loop style="width: 100%; height: 100%;"></video>
          </body>
        </html>
      `;
    }
  };

  return (
      <View style={styles.container}>
        <DrillDetails
          drill={drill}
          videoHtml={videoHtml}
        />
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
});