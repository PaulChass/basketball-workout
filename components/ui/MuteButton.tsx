import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface MuteButtonProps {

    isMuted: boolean;
  
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  
  }

export default function MuteButton({ isMuted, setIsMuted }: MuteButtonProps) {
    
    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
    };
    
    return (
        <TouchableOpacity onPress={handleMuteToggle} style={styles.iconButton}>
        <Icon name={isMuted ? "volume-off" : "volume-up"} size={30} color={'gray'} />
        </TouchableOpacity>
    );
    }

const styles = StyleSheet.create({
    iconButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 0,
    },
});
