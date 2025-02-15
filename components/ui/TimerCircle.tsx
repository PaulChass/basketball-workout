import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ThemedText } from '@/components/ThemedText';

interface TimerCircleProps {
    onStop: (time: number) => void;
}

const TimerCircle: React.FC<TimerCircleProps> = ({ onStop }) => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeElapsed((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);


    useEffect(() => {

        let countdownInterval: NodeJS.Timeout;
        if (isStarted) {
            if (countdown > 0) {
                countdownInterval = setInterval(() => {
                    setCountdown((prev) => prev - 1);
                }, 1000);
            } else if (countdown === 0) {
                setIsRunning(true);
            }
        }
        return () => clearInterval(countdownInterval);
    }, [countdown,isStarted]);

    const handleStart = () => {
        setIsStarted(true);
        setCountdown(5);
    };

    const handleStop = () => {
        setIsRunning(false);
        onStop(timeElapsed);
    };

    const handleRestart = () => {
        setIsRunning(false);
        setIsStarted(false);
        setTimeElapsed(0);
        setCountdown(5);
    };

    const handleResume = () => {
        setIsRunning(true);
    };

    const fill = (timeElapsed % 60) * 1.67; // 100% fill for 60 seconds

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
                    <>
                    <ThemedText style={styles.timerText}>
                        {!isStarted ? (
                            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
                                <ThemedText style={styles.startButtonText}>Start</ThemedText>
                            </TouchableOpacity>
                        ) : (

                            countdown > 0
                                ? `Ready? ${countdown}`
                                : timeElapsed < 60
                                    ? `${timeElapsed} sec`
                                    : `${Math.floor(timeElapsed / 60)} min ${timeElapsed % 60} sec`
                        )}
                    </ThemedText>
                    {isRunning && (
                        <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
                            <ThemedText style={styles.stopButtonText}>Stop</ThemedText>
                        </TouchableOpacity>
                    )}
                    
            {!isRunning && isStarted && countdown=== 0 && (
                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                    <ThemedText style={styles.restartButtonText}>Restart</ThemedText>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.resumeButton} onPress={handleResume}>
                    <ThemedText style={styles.resumeButtonText}>Resume</ThemedText>
                </TouchableOpacity>
                </View>
            )}
                    </>
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
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    startButton: {
        marginTop: 0,
        backgroundColor: '#3d5875',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    startButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    stopButton: {
        marginTop: 20,
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    stopButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resumeButton: {
        marginTop: 20,
        backgroundColor: '#008000',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    resumeButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    restartButton: {
        marginTop: 20,
        backgroundColor: '#FFA500',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    restartButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default TimerCircle;
