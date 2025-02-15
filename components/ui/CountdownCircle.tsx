import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ThemedText } from '@/components/ThemedText';

interface CountdownCircleProps {
  totalTime: number;
}

const CountdownCircle: React.FC<CountdownCircleProps> = ({  totalTime }) => {
    const [isStarted, setIsStarted] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(totalTime);
    
    useEffect(() => {
      if(isStarted){
      const interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
      }
    }, [isStarted]);
    const fill = (timeRemaining / totalTime) * 100;
  

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={200}
        width={10}
        fill={fill}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        rotation={180}
        lineCap="round"
      >
        
        {() => (
          
          <ThemedText style={styles.timerText}>
            {isStarted ? `${timeRemaining} sec` : <TouchableOpacity onPress={() => setIsStarted(true)}>
              <ThemedText>Start</ThemedText>
            </TouchableOpacity>}
           
          </ThemedText>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CountdownCircle;