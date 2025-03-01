import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { saveProgress, getProgress } from '@/utils/storage';
import { useNavigation } from '@react-navigation/native';

type WorkoutStep = {
  title: string;
  description: string;
  type: string;
  countdown: string;
};

const CreateDrill = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [workoutSteps, setWorkoutSteps] = useState<WorkoutStep[]>([]);
  const [stepTitle, setStepTitle] = useState('');
  const [stepDescription, setStepDescription] = useState('');
  const [stepType, setStepType] = useState('none');
  const [countdown, setCountdown] = useState('');
  const [showWorkoutStepForm, setShowWorkoutStepForm] = useState(false);
  const navigation = useNavigation<any>();
  
  const saveWorkoutStep = () => {
    setWorkoutSteps([...workoutSteps, { title: stepTitle, description: stepDescription, type: stepType, countdown }]);
    setStepTitle('');
    setStepDescription('');
    setStepType('none');
    setCountdown('none');
    setShowWorkoutStepForm(false);
  };

  const addWorkoutStep = () => {
    setShowWorkoutStepForm(true);
  };

  const saveDrill = async () => {
    const newDrill = {
      title,
      description,
      workoutSteps,
    };
    const existingDrills = await getProgress('customDrills');
    alert(JSON.stringify(existingDrills));
    const updatedDrills = existingDrills && existingDrills.length > 0 ? [...existingDrills, newDrill] : [newDrill] ;
    await saveProgress('customDrills', updatedDrills);
    setTitle('');
    setDescription('');
    setWorkoutSteps([]);
    navigation.navigate('CustomWorkouts');
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedText style={styles.header}>Create a New Drill</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="gray"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description (optional)"
        placeholderTextColor="gray"
        value={description}
        onChangeText={setDescription}
      />
      {workoutSteps.map((step, index) => (
        <View key={index}>
          <ThemedText style={styles.subHeader}>Step {index}: {step.title}</ThemedText>
        </View>
      ))}
      {showWorkoutStepForm && (
        <>
          <ThemedText style={styles.subHeader}>Add Workout Step</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Step Title"
            placeholderTextColor="gray"
            value={stepTitle}
            onChangeText={setStepTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Step Description (optional)"
            placeholderTextColor="gray"
            value={stepDescription}
            onChangeText={setStepDescription}
          />
          <ThemedText style={styles.subHeader}>Measure type</ThemedText>
          <Picker
            selectedValue={stepType}
            style={styles.picker}
            onValueChange={(itemValue) => setStepType(itemValue)}
          > 
            <Picker.Item label="None" value="none" color='grey' />
            <Picker.Item label="Time" value="time" color='grey' />
            <Picker.Item label="Weights" value="weights" color='grey'/>
            <Picker.Item label="Total Reps" value="reps" color='grey'/>
            <Picker.Item label="Makes per Total Attempts" value="makes" color='grey' />
          </Picker>
          <ThemedText style={styles.subHeader}>Countdown (optional)</ThemedText>
          <View style={styles.checkboxContainer}>
          <TextInput
              style={styles.input}
              placeholder="Countdown in seconds"
              placeholderTextColor="gray"
              value={countdown.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setCountdown(text)}
            />
          </View>
        </>
      )}
      {!showWorkoutStepForm && (
        <TouchableOpacity style={styles.addButton} onPress={addWorkoutStep}>
          <ThemedText style={styles.addButtonText}>Add Workout Step</ThemedText>
        </TouchableOpacity>
      )}
      {showWorkoutStepForm && (
        <TouchableOpacity style={styles.addButton} onPress={saveWorkoutStep}>
          <ThemedText style={styles.addButtonText}>Save Workout Step</ThemedText>
        </TouchableOpacity>
      )}
      {workoutSteps.length > 0 && (
        <TouchableOpacity style={styles.saveButton} onPress={saveDrill}>
          <ThemedText style={styles.saveButtonText}>Save workout</ThemedText>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    color: 'gray',
    borderColor: 'gray',
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateDrill;