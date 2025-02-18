import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ThemedText } from '../ThemedText';
import { saveProgress, getProgress } from '../../utils/storage';
import { useTranslation } from 'react-i18next';
import TimerCircle from '../ui/TimerCircle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountdownCircle from '../ui/CountdownCircle';
import { useNavigation } from '@react-navigation/native';

interface WorkoutScreenProps {
  drill: any;
  webViewRef: any;
}

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ drill, webViewRef }) => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const [timer, setTimer] = useState(0);
  const [timeToComplete, setTimeToComplete] = useState(0);
  const [drillIndex, setDrillIndex] = useState(0);
  const [bestTime, setBestTime] = useState('N/A');
  const [averageTime, setAverageTime] = useState('N/A');
  const [ maxReps, setMaxReps] = useState('N/A');
  const [ averageReps, setAverageReps] = useState('N/A'); 
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [numberOfReps, setNumberOfReps] = useState('');

  useEffect(() => {
    if(timeToComplete === 0) {
      const interval = setInterval(() => {
        setTimeToComplete((timeToComplete) => timeToComplete + 1);
      }
      , 1000);
    }
    const subDrillTitle = drill.title + '-' + drill.workoutSteps[drillIndex].title;
    // Reset all the stats when the drill changes
    seekToTime(drill.workoutSteps[drillIndex].time);
    setBestTime('N/A');
    setAverageTime('N/A');
    setNumberOfReps('N/A');
    setMaxReps('N/A');
    setAverageReps('N/A');
    // Get the stats for the current drill
    if (drill.workoutSteps[drillIndex].type === 'time') {
      getProgress(subDrillTitle).then((times) => {
        if (times.length === 0) {
          return;
        }
        const bestTime = Math.min(...times);
        const averageTime = Math.floor(times.reduce((a: number, b: number) => a + b, 0) / times.length);
        setBestTime(bestTime.toString());
        setAverageTime(averageTime.toString());
      });
    } 
    else if (drill.workoutSteps[drillIndex].type === 'reps') 
    {
      getProgress(subDrillTitle).then((reps) => {
        if (reps.length === 0) {
          return;
        }
        const maxReps = Math.max(...reps);
        const averageReps = Math.floor(reps.reduce((a: number, b: number) => a + b, 0) / reps.length);
        setMaxReps(maxReps.toString());
        setAverageReps(averageReps.toString());
      }
      );  
    }
    else if (drill.workoutSteps[drillIndex].type === 'weigths')
    {
      getProgress(subDrillTitle).then((weigths) => {
        const maxWeigth = Math.max(...weigths);
        const averageWeigth = Math.floor(weigths.reduce((a: number, b: number) => a + b, 0) / weigths.length);
        setMaxReps(maxWeigth.toString());
        setAverageReps(averageWeigth.toString());
      }
      );  
    }
  }, [drillIndex]);

  const resetSubDrillStats = async () => {
    Alert.alert(
      'Reset Stats',
      'Are you sure you want to reset your stats for this drill?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const subDrillTitle = drill.title + '-' + drill.workoutSteps[drillIndex].title;
            await saveProgress(subDrillTitle, []);
            setBestTime('N/A');
            setAverageTime('N/A');
          },
        },
      ],
      { cancelable: false }
    );
  };
  const seekToTime = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const script = `document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"seekTo","args":[${totalSeconds}, true]}', '*');`;
    webViewRef.current?.injectJavaScript(script);
  };
  const nextDrill = () => {
    setBestTime('N/A');
    setAverageTime('N/A');
    setNumberOfReps('N/A');
    if (drillIndex < drill.workoutSteps.length - 1) {
      // Stop the timeToComplete timer
      clearInterval(timeToComplete); 
      setDrillIndex(drillIndex + 1);
    } else {

      alert('Workout completed in : ' + timeToComplete + ' seconds');
      navigation.navigate('DrillsTabs');      
    }
  };
  const saveDrill = async () => {
    const subDrillTitle = drill.title + '-' + drill.workoutSteps[drillIndex].title;    
    try {
      const savedSubDrill = await getProgress(subDrillTitle);
      let subDrillArray = Array.isArray(savedSubDrill) ? savedSubDrill : [];
      if (drill.workoutSteps[drillIndex].type === 'reps') {
        subDrillArray = [...subDrillArray, numberOfReps];
      }
      if (drill.workoutSteps[drillIndex].type === 'time') {
        subDrillArray = [...subDrillArray, textToSeconds(minutes, seconds)];
      }
      if(drill.workoutSteps[drillIndex].type === 'weights') {
        subDrillArray = [...subDrillArray, numberOfReps];
      }
      await saveProgress(subDrillTitle, subDrillArray);
    } catch (error) {
      console.error('Error saving drill results:', error);
    }
    nextDrill();
  };
  const textToSeconds = (minutes: string, seconds: string) => {
    const minutesNum = parseInt(minutes, 10) || 0;
    const secondsNum = parseInt(seconds, 10) || 0;
    return minutesNum * 60 + secondsNum;
  };
  const onStop = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    setMinutes(minutes.toString());
    setSeconds(seconds.toString().padStart(2, '0'));
  };
  const toMinutesAndSeconds = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return { minutes: minutes.toString(), seconds: seconds.toString().padStart(2, '0') };
  };
  const timeToString = (time: number | string) => {
    const { minutes, seconds } = toMinutesAndSeconds(parseInt(time.toString(), 10));

    if (minutes === '0' && seconds === '0') {
      return 'N/A';
    }
    if (minutes === 'NaN' && seconds === 'NaN') {
      return 'N/A';
    }
    return `${minutes}:${seconds}`;
  };
  useEffect(() => {
    const { minutes, seconds } = toMinutesAndSeconds(timer);
    setMinutes(minutes);
    setSeconds(seconds);
  }, [timer]);

  return (
    <ScrollView style={styles.container}>
      <ThemedText style={styles.text}>{drill.title}</ThemedText>
      <ThemedText style={styles.subText}>
        Drill {drillIndex + 1} of {drill.workoutSteps.length}:
      </ThemedText>
      <TouchableOpacity style={styles.stepTitle} onPress={() => seekToTime(drill.workoutSteps[drillIndex].time)}>
        <ThemedText>
          <ThemedText style={styles.link}>{drill.workoutSteps[drillIndex].time}</ThemedText> {drill.workoutSteps[drillIndex].title}:
        </ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.timerText}>{drill.workoutSteps[drillIndex].description}</ThemedText>
      {drill.workoutSteps[drillIndex].type === 'none' && (
        <View style={styles.nextButtonContainer}>
          <TouchableOpacity onPress={() => nextDrill()} style={styles.nextButtonPrimary}>
            <ThemedText style={styles.nextButtonText}>Next</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      {drill.workoutSteps[drillIndex].type === 'time' && (
        <>
          <View style={styles.recordsContainer}>
            <ThemedText>Best time: {timeToString(bestTime)}</ThemedText>
            <ThemedText>Average time: {timeToString(averageTime)}</ThemedText>
            <TouchableOpacity onPress={() => resetSubDrillStats()}>
              <Icon name="refresh" size={24} color="grey" />
            </TouchableOpacity>
          </View>
          <View style={styles.timeContainer}>
            <TimerCircle onStop={onStop} />
            <View style={styles.inputContainer}>
              <View style={styles.timeInputContainer}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="MM"
                  value={minutes}
                  keyboardType="numeric"
                  onChangeText={(text) => setMinutes(text)}
                />
                <ThemedText>:</ThemedText>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Enter your time"
                  value={seconds}
                  keyboardType="numeric"
                  onChangeText={(text) => setSeconds(text)}
                />
              </View>
              <TouchableOpacity onPress={() => saveDrill()} style={styles.saveButton}>
                <ThemedText style={styles.nextButtonText}>Save</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => nextDrill()} style={styles.nextButton}>
                <ThemedText style={styles.nextButtonText}>Skip</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
      {drill.workoutSteps[drillIndex].type === 'reps' && (
        <View style={styles.readyContainer}>
          <ThemedText>
            Best amount of reps {isNaN(Number(maxReps)) ? 'N/A' : maxReps}</ThemedText>
          <ThemedText >Average amount of reps :{isNaN(Number(averageReps)) ? 'N/A' : averageReps}</ThemedText>
          {drill.workoutSteps[drillIndex].countdown && 
            <CountdownCircle totalTime={drill.workoutSteps[drillIndex].countdown} />}
          <TextInput
            style={styles.timeInput}
            placeholder="Enter your total of reps"
            keyboardType="numeric"
            onChangeText={(text) => (text)}
          />
          <TouchableOpacity onPress={() => saveDrill()} style={styles.saveButton}>
            <ThemedText style={styles.nextButtonText}>Save</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextDrill()} style={styles.nextButton}>
            <ThemedText style={styles.nextButtonText}>Skip</ThemedText>
          </TouchableOpacity>
        </View>
      )}
      {drill.workoutSteps[drillIndex].type === 'weights' && (
        <View style={styles.readyContainer}>
          <ThemedText>Best weight: N/A</ThemedText>
          <ThemedText>Average weight: N/A</ThemedText>
          {drill.workoutSteps[drillIndex].countdown && <CountdownCircle totalTime={drill.workoutSteps[drillIndex].countdown} />}
          <TextInput
            style={styles.timeInput}
            placeholder="Enter the weight you used"
            keyboardType="numeric"
            onChangeText={(text) => (text)}
          />
          <TouchableOpacity onPress={() => saveDrill()} style={styles.saveButton}>
            <ThemedText style={styles.nextButtonText}>Save</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextDrill()} style={styles.nextButton}>
            <ThemedText style={styles.nextButtonText}>Skip</ThemedText>
          </TouchableOpacity>
        </View>
      )}  
    </ScrollView>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  iconButton: {
    padding: 8,
  },
  link: {
    textDecorationLine: 'underline',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
  },
  readyText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  pauseIcon: {
    color: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  drillContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  timerText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 100,
    paddingTop: 20,
  },
  recordsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingTop: 10,
  },
  stepTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  nextButtonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    backgroundColor: 'grey',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  nextButtonPrimary: {
    backgroundColor: '#1E90FF',
    position: 'fixed',
    top: 200,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  readyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    height: 40,
    width: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 15,
    borderRadius: 5,
    textAlign: 'center',
    color: 'gray',
  },
});