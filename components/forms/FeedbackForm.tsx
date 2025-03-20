import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigationTypes'; // Import the RootStackParamList

type FeedbackFormNavigationProp = StackNavigationProp<RootStackParamList, 'DrillsTabs'>;

const FeedbackForm = () => {
  const { t } = useTranslation();
  const [drillFeedback, setDrillFeedback] = useState('');
  const [newDrills, setNewDrills] = useState('');
  const [uxFeedback, setUxFeedback] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation<FeedbackFormNavigationProp>(); // Use the correct type

  const handleSubmitFeedback = async () => {
    try {
      const response = await fetch('http://api.balldontlie.fr/feedback.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drillFeedback,
          newDrills,
          uxFeedback,
          email,
        }),
      });

      if (response.ok) {
        alert(t('feedback.thankYou'));
        // Clear the form
        setDrillFeedback('');
        setNewDrills('');
        setUxFeedback('');
        setEmail('');
        // if current screen is FeedbackForm, navigate to Home
        if (navigation.isFocused()) { 
          navigation.navigate('DrillsTabs');
        }

      } else {
        alert(t('feedback.failed'));
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(t('feedback.error'));
    }
  };

  return (
    <View style={styles.feedbackContainer}>
      <ThemedText style={styles.feedbackTitle}>{t('Feedback')}</ThemedText>
      <TextInput
        style={styles.input}
        placeholder={t('What did you think of the drills?')}
        placeholderTextColor="gray"
        value={drillFeedback}
        onChangeText={setDrillFeedback}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder={t('What kind of drills should be added?')}
        placeholderTextColor="gray"
        value={newDrills}
        onChangeText={setNewDrills}
        multiline={true}
      />
      <TextInput
        style={styles.input}
        placeholder={t('What is your general UX of the app?')}
        placeholderTextColor="gray"
        value={uxFeedback}
        onChangeText={setUxFeedback}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder={t('Your email (optional)')}
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
        <ThemedText style={styles.submitButtonText}>{t('Submit')}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 120,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackForm;