import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import LanguageSwitcher from '@/components/LanguageSwitcher';
import FeedbackForm from '@/components/forms/FeedbackForm';
import { navigate } from 'expo-router/build/global-state/routing';

export default function TabTwoScreen() {
  const { t } = useTranslation(); // Initialize useTranslation
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');


  const handleSubmitFeedback = async () => {
    try {
      const response = await fetch('http://api.balldontlie.fr/feedback.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback,
          email,
        }),
      });
  
      if (response.ok) {
        alert(t('Thank you for your feedback!'));
        // Clear the form
        setFeedback('');
        setEmail('');
      } else {
        alert(t('Failed to submit feedback. Please try again later.'));
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(t('An error occurred. Please try again later.'));
    }
  };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>  
        <ThemedText type="title">{t('Settings')}</ThemedText>          
      </ThemedView>
      <View style={styles.progressContainer}>
        <ThemedText>{t('Language')}</ThemedText>
        <LanguageSwitcher />
      </View>
      <FeedbackForm />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  fullWidth: {
    width: '80%',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  progressContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  feedbackContainer: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: 'gray',
  },
  submitButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
  },
});