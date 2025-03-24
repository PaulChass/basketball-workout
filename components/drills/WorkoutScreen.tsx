import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { ThemedText } from '../ThemedText';
import { saveProgress, getProgress } from '../../utils/storage';
import { useTranslation } from 'react-i18next';
import TimerCircle from '../ui/TimerCircle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CountdownCircle from '../ui/CountdownCircle';
import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '../ThemedView';

interface WorkoutScreenProps {
  drill: any;
  webViewRef: any;
  currentTime: number;
}

const WorkoutScreen: React.FC<WorkoutScreenProps> = ({ drill, webViewRef, currentTime }) => {
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
  const [refreshDrillData, setRefreshDrillData] = useState(false);

  useEffect(() => {
    if(timeToComplete === 0) {
      const interval = setInterval(() => {
        setTimeToComplete((timeToComplete) => timeToComplete + 1);
        getCurrentTime();
      }
      , 1000);
    }
    const subDrillTitle = drill.title + '-' + drill.workoutSteps[drillIndex].title;
    // Reset all the stats when the drill changes
    if(drill.workoutSteps[drillIndex].time){
    seekToTime(drill.workoutSteps[drillIndex].time);
  }
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
    else if (drill.workoutSteps[drillIndex].type === 'weights')
    {
      getProgress(subDrillTitle).then((weigths) => {
        if (weigths.length === 0) {
          return;
        }
        const maxWeigth = Math.max(...weigths);
        const averageWeigth = Math.floor(weigths.reduce((a: number, b: number) => a + b, 0) / weigths.length);
        setMaxReps(maxWeigth.toString());
        setAverageReps(averageWeigth.toString());
      }
      );  
    }
  }, [drillIndex, refreshDrillData]);

  const resetSubDrillStats = async () => {
    Alert.alert(
      t('resetStatsTitle'),
      t('resetStatsMessage'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('ok'),
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
    setRefreshDrillData(!refreshDrillData);
  };
  const seekToTime = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const script = `document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"seekTo","args":[${totalSeconds}, true]}', '*');`;
    webViewRef.current?.injectJavaScript(script);
  };
  const playVideo = () => {
    const script = `document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":[]}', '*');`;
    webViewRef.current?.injectJavaScript(script);
  };
  const pauseVideoAndRewind = (time: string) => {
    const script = `document.querySelector('iframe').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":[]}', '*');`;
    webViewRef.current?.injectJavaScript(script);
    seekToTime(time);
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
      alert(t('Congratulations! Workout completed!'));
      navigation.navigate('Home');      
    }
  };
  
  const previousDrill = () => {
    if (drillIndex > 0) {
      setDrillIndex(drillIndex - 1);
    }
  };

  const getCurrentTime = () => {
    const script = `
      (function() {
        const currentTime = player.getCurrentTime();
        window.ReactNativeWebView.postMessage(currentTime.toString());
      })();
    `;
    webViewRef.current?.injectJavaScript(script); 
  };

  // Get the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentTime();
      
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // if the next drill exists and has a time, compare the current time to the next drill's time
  useEffect(() => {
    if (drill.workoutSteps[drillIndex + 1] && drill.workoutSteps[drillIndex + 1].time) {
      const nextDrillTime = drill.workoutSteps[drillIndex + 1].time.split(':').reduce((acc: number, time: string) => acc * 60 + parseInt(time, 10), 0);
      if (currentTime >= nextDrillTime) {
        pauseVideoAndRewind(drill.workoutSteps[drillIndex].time);
      }
    }
  }
  , [currentTime , drillIndex]);
  
  const saveDrill = async () => {
    const subDrillTitle = drill.title + '-' + drill.workoutSteps[drillIndex].title;    
    try {
      
      const savedSubDrill = await getProgress(subDrillTitle);
      let subDrillArray = Array.isArray(savedSubDrill) ? savedSubDrill : [];
      
      if (drill.workoutSteps[drillIndex].type === 'time') {
        subDrillArray = [...subDrillArray, textToSeconds(minutes, seconds)];
      }
      if(drill.workoutSteps[drillIndex].type === 'weights' || drill.workoutSteps[drillIndex].type === 'reps') {
        if(isNaN(Number(numberOfReps))) {
          alert('Please enter a valid number');
          return;
        }
        subDrillArray = [...subDrillArray, Number(numberOfReps)];
      }
      await saveProgress(subDrillTitle, subDrillArray);
    } catch (error) {
      console.error('Error saving drill results:', error);
    }
    alert(t('resultsSaved'));
    setRefreshDrillData(!refreshDrillData);

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
    <>
    <ScrollView style={styles.container}>
    
      <TouchableOpacity style={styles.stepTitle} onPress={() => seekToTime(drill.workoutSteps[drillIndex].time)}>
        <ThemedText>
          <ThemedText style={styles.link}>{drill.workoutSteps[drillIndex].time && drill.workoutSteps[drillIndex].time+':' }</ThemedText> 
          {drill.workoutSteps[drillIndex].title} - ({drillIndex + 1} / {drill.workoutSteps.length})
        </ThemedText>
      </TouchableOpacity>
      <ThemedText style={styles.timerText}>{drill.workoutSteps[drillIndex].description}</ThemedText>
        {drill.workoutSteps[drillIndex].countdown>0 && 
          <ThemedView style={styles.countdownContainer}>
          <CountdownCircle totalTime={drill.workoutSteps[drillIndex].countdown} />
          </ThemedView>
        }

        {drill.workoutSteps[drillIndex].type === 'time' && (
        <>
          <View style={styles.recordsContainer}>
            <ThemedText>{t('bestTime')}: {timeToString(bestTime)}</ThemedText>
            <ThemedText>{t('averageTime')}: {timeToString(averageTime)}</ThemedText>
            <TouchableOpacity onPress={() => resetSubDrillStats()}>
              <Icon name="refresh" size={24} color="grey" />
            </TouchableOpacity>
          </View>
            <TimerCircle onStop={onStop} />
          <View style={styles.timeContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.timeInputContainer}>
                  <TextInput
                    style={styles.smallerTimeInput}
                    placeholder={t('minutesPlaceholder')}
                    placeholderTextColor={'gray'}
                    value={minutes}
                    keyboardType="numeric"
                    onChangeText={(text) => setMinutes(text)}
                  />
                  <ThemedText>:</ThemedText>
                  <TextInput
                    style={styles.smallerTimeInput}
                    placeholder={t('secondsPlaceholder')}
                    placeholderTextColor={'gray'}
                    value={seconds}
                    keyboardType="numeric"
                    onChangeText={(text) => setSeconds(text)}
                  />
                <TouchableOpacity onPress={() => saveDrill()} style={styles.saveButton}>
                  <ThemedText style={styles.nextButtonText}>{t('save')}</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            
          </View>
        </>
        )}
        {drill.workoutSteps[drillIndex].type === 'reps' && (
        <View style={styles.readyContainer}>
          <ThemedText>{t('bestReps')}: {isNaN(Number(maxReps)) ? 'N/A' : maxReps}</ThemedText>
          <ThemedText >{t('averageReps')}: {isNaN(Number(averageReps)) ? 'N/A' : averageReps}</ThemedText>
          <TouchableOpacity onPress={() => resetSubDrillStats()}>
              <Icon name="refresh" size={24} color="grey" />
            </TouchableOpacity>
          
          <View style={styles.timeInputContainer}>
          <TextInput
            style={styles.timeInput}
            placeholder={t('repsPlaceholder')}
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            onChangeText={(text) => (setNumberOfReps(text))}
          />
          <TouchableOpacity onPress={() => saveDrill()} style={styles.saveButton}>
            <ThemedText style={styles.nextButtonText}>{t('save')}</ThemedText>
          </TouchableOpacity>
          </View>
        </View>
        )}
        {drill.workoutSteps[drillIndex].type === 'weights' && (
        <View style={styles.readyContainer}>
          <ThemedText>{t('bestWeight')}: {isNaN(Number(maxReps))?'N/A':maxReps} kg</ThemedText>
          <ThemedText>{t('averageWeight')}: {isNaN(Number(averageReps))?'N/A':averageReps} kg</ThemedText>
          <TouchableOpacity onPress={() => resetSubDrillStats()}>
              <Icon name="refresh" size={24} color="grey" />
            </TouchableOpacity>
          <View style={styles.timeInputContainer}>
          <TextInput
            style={styles.timeInput}
            placeholder={t('weightPlaceholder')}
            placeholderTextColor={'gray'}
            keyboardType="numeric"
            onChangeText={(text) => (setNumberOfReps(text))}
          />
          <TouchableOpacity onPress={() => saveDrill()} style={styles.saveButton}>
            <ThemedText style={styles.nextButtonText}>{t('save')}</ThemedText>
          </TouchableOpacity>
          </View>
        </View>
      )}  
    </ScrollView>
    <View style={styles.nextButtonContainer}>
          {drillIndex > 0 && (
            <TouchableOpacity onPress={() => previousDrill()} style={styles.previousButton}>
              <ThemedText style={styles.nextButtonText}>{t('previous')}</ThemedText>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => nextDrill()} style={styles.nextButton}>
            <ThemedText style={styles.nextButtonText}>{t('next')}</ThemedText>
          </TouchableOpacity>
        </View>
    </>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    flexDirection: 'column',
    alignContent: 'space-between',
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
    backgroundColor: 'rgba(128,128,128,0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
    marginVertical: 25,
    
  },
  stepTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  nextButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'sticky',
    bottom: 10,
    left: 0,
    right: 0,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 20,
  },
  nextButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    width: '40%',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  previousButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  readyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
    
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
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 15,
    borderRadius: 5,
    textAlign: 'center',
    color: 'gray',
  },
  smallerTimeInput: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    marginVertical: 15,
    borderRadius: 5,
    textAlign: 'center',
    color: 'gray',
  },
  countdownContainer: {
    marginTop: 20,
    marginBottom:20,
  },

});