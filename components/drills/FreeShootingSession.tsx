import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProgress, saveProgress } from '@/utils/storage';
import BasketballCourt from '../ui/BasketballCourt';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Icon } from 'react-native-vector-icons/Icon';
import { ThemedView } from '../ThemedView';

const FreeShootingSession: React.FC = () => {
  const { t } = useTranslation();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [shotsAttempted, setShotsAttempted] = useState<string>('');
  const [shotsMade, setShotsMade] = useState<string>('');
  const [progress, setProgress] = useState<any>(0);

  const handleZoneSelect = async (zone: string) => {
    setSelectedZone(zone);
    setShotsAttempted('');
    setShotsMade('');
    const shots = await getProgress(zone);
    setProgress(shots ? ((shots[0] / shots[1]) * 100).toFixed(2) : 0);
  };

  const askIfSure = () => {
    if (!selectedZone || !shotsAttempted || !shotsMade) {
      Alert.alert(t('Error'), t('Please fill in all fields.'));
      return;
    }

    if (parseInt(shotsMade, 10) > parseInt(shotsAttempted, 10)) {
      Alert.alert(t('Error'), t('The number of shots made cannot be greater than the number of shots attempted.'));
      return;
    }

    Alert.alert(
      t('Confirmation'),
      t('You are going to save ' + shotsMade + ' shots made out of ' + shotsAttempted + ' shots attempted in the ' + selectedZone + ' zone. Are you sure you want to save this progress?'),
      [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Save'),
          onPress: handleSave,
        }
      ]
    );
  }

  const handleSave = async () => {
    const currentProgress = await getProgress(selectedZone);
    if (!currentProgress) {
      saveProgress(selectedZone, [shotsMade, shotsAttempted]);
    } else {
      saveProgress(selectedZone, [parseInt(currentProgress[0]) + parseInt(shotsMade, 10), parseInt(currentProgress[1]) + parseInt(shotsAttempted, 10)]);
    }
    setShotsAttempted('');
    setShotsMade('');
    const newProgress =  [parseInt(currentProgress[0] + shotsMade),parseInt(currentProgress[1] + shotsAttempted)];
    setProgress(((newProgress[0]/newProgress[1]) * 100).toFixed(2));
  };

   
    
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.inputLabel}>{t('Select a zone')}</ThemedText>
      <ThemedView style={styles.inputZone}>
        <BasketballCourt onZoneSelect={handleZoneSelect} />
      </ThemedView>
      {selectedZone && (
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.inputTitle}>{t('Selected zone')}: {selectedZone}</ThemedText>
          <ThemedText style={styles.inputLabel}>{t('Average')}:  {progress} % </ThemedText>
          <ThemedText style={styles.inputLabel}>{t('Shots Made')}</ThemedText>
          <TextInput
            style={styles.input}
            placeholder={t('Shots Made')}
            keyboardType="numeric"
            value={shotsMade}
            onChangeText={setShotsMade}
          />
          <ThemedText style={styles.inputLabel}>{t('Shots Attempted')}</ThemedText>
          <TextInput
            style={styles.input}
            placeholder={t('Shots Attempted')}
            keyboardType="numeric"
            value={shotsAttempted}
            onChangeText={setShotsAttempted}
          />
          <TouchableOpacity style={styles.saveButton} onPress={askIfSure}>
            <Text style={styles.saveButtonText}>{t('Save')}</Text>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%',
  },
  inputContainer: {
    marginTop: 16,
  },
  inputLabel: {
    fontSize: 16,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '80%',
    color: 'gray',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputZone: {
    height: 300,
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
});

export default FreeShootingSession;