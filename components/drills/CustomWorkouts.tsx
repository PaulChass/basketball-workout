import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import { getProgress, saveProgress } from '@/utils/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ThemedView } from '../ThemedView';

interface Drill {
  title: string;
  description: string;
}

const CustomWorkouts = () => {
  const navigation = useNavigation<any>();
  const [customDrills, setCustomDrills] = useState<Drill[]>([]);

  useEffect(() => {
    const fetchCustomDrills = async () => {
      const drills = await getProgress('customDrills');
      setCustomDrills(drills || []);
    };
    fetchCustomDrills();
  }, []);

  const deleteDrill = (index: number) => {
    Alert.alert(
      'Delete Drill',
      'Are you sure you want to delete this drill?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const updatedDrills = customDrills.filter((_, i) => i !== index);
            setCustomDrills(updatedDrills);
            await saveProgress('customDrills', updatedDrills);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ThemedView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedText style={styles.header}>Custom Workouts</ThemedText>
      {customDrills.length > 0 ? (
        customDrills.map((drill, index) => (
          <ThemedView key={index} style={styles.drillContainer}>
            <TouchableOpacity style={styles.drillContent} onPress={() => navigation.navigate('DrillDetailsScreen', { drill })}>
              <ThemedText style={styles.drillTitle}>{drill.title}</ThemedText>
              <ThemedText style={styles.drillDescription}>{drill.description}</ThemedText>
            </TouchableOpacity>
            <ThemedView style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('EditDrill', { drill, index })}>
                <Icon name="edit" size={24} color="gray" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteDrill(index)}>
                <Icon name="delete" size={24} color="red" />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        ))
      ) : (
        <ThemedText style={styles.noDrillsText}>No custom workouts available.</ThemedText>
      )}
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateDrill')}>
        <ThemedText style={styles.createButtonText}>Create New Workout</ThemedText>
      </TouchableOpacity>
    </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drillContainer: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drillContent: {
    flex: 1,
  },
  drillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drillDescription: {
    fontSize: 14,
    color: 'gray',
  },
  noDrillsText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  createButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomWorkouts;
