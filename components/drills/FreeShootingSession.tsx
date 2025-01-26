import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BasketballCourt from '../ui/BasketballCourt';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from 'react-i18next';

const FreeShootingSession: React.FC = () => {
  const { t } = useTranslation();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [shotsAttempted, setShotsAttempted] = useState<string>('');
  const [shotsMade, setShotsMade] = useState<string>('');

  const handleZoneSelect = (zone: string) => {
    setSelectedZone(zone);
    setShotsAttempted('');
    setShotsMade('');
  };

  const handleSave = async () => {
    if (!selectedZone || !shotsAttempted || !shotsMade) {
      Alert.alert(t('Error'), t('Please fill in all fields.'));
      return;
    }
    if (parseInt(shotsMade, 10) > parseInt(shotsAttempted, 10)) {
      Alert.alert(t('Error'), t('The number of shots made cannot be greater than the number of shots attempted.'));
      return;
    }

    const progress = {
      zone: selectedZone,
      shotsAttempted: parseInt(shotsAttempted, 10),
      shotsMade: parseInt(shotsMade, 10),
      date: new Date().toISOString(),
    };

    try {
      await AsyncStorage.setItem(`progress_${selectedZone}`, JSON.stringify(progress));
      Alert.alert(t('Success'), t('Progress saved successfully.'));
      setSelectedZone(null);
      setShotsAttempted('');
      setShotsMade('');
    } catch (e) {
      console.error('Failed to save progress.', e);
      Alert.alert(t('Error'), t('Failed to save progress.'));
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.inputLabel}>{t('Select a zone')}</ThemedText>
      <View style={styles.inputZone}>
        <BasketballCourt onZoneSelect={handleZoneSelect} />
      </View>
      {selectedZone && (
        <View style={styles.inputContainer}>
          <ThemedText style={styles.inputTitle}>{t('Selected zone')}: {selectedZone}</ThemedText>
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
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{t('Save')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
    color: 'white',
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