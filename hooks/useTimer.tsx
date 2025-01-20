import { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';

const useTimer = (initialTime: number) => {
  const [timer, setTimer] = useState(initialTime);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (timer <= 3 && timer > 0 && isTimerRunning) {
      Speech.speak(`${timer}`, { language: 'fr-FR' });
    }
  }, [timer]);

  const startTimer = () => {
    setIsTimerRunning(true);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          setShowInput(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    setTimer(initialTime);
    setIsTimerRunning(false);
    setShowInput(false);
  };

  return { timer, isTimerRunning, showInput, startTimer, resetTimer };
};

export default useTimer;