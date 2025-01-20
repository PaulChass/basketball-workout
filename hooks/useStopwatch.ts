import { useState, useEffect } from 'react';

const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    setShowSubmit(true);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
    setShowSubmit(false);
  };

  return { time, isRunning, showSubmit, startStopwatch, stopStopwatch, resetStopwatch };
};

export default useStopwatch;