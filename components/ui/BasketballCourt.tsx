import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';

interface BasketballCourtProps {
  onZoneSelect: (zone: string) => void;
}

const BasketballCourt: React.FC<BasketballCourtProps> = ({ onZoneSelect }) => {
  const zones = [
    { id: '3pt-left-corner', label: '3PT Left Corner', style: styles.zone3ptLeftCorner },
    { id: '3pt-left-wing', label: '3PT Left Wing', style: styles.zone3ptLeftWing },
    { id: '3pt-top', label: '3PT Top', style: styles.zone3ptTop },
    { id: '3pt-right-wing', label: '3PT Right Wing', style: styles.zone3ptRightWing },
    { id: '3pt-right-corner', label: '3PT Right Corner', style: styles.zone3ptRightCorner },
    { id: 'mid-left', label: 'Mid Left', style: styles.zoneMidLeft },
    { id: 'mid-left-center', label: 'Mid Left Center', style: styles.zoneMidLeftCenter },
    { id: 'mid-center', label: 'Mid Center', style: styles.zoneMidCenter },
    { id: 'mid-right-center', label: 'Mid Right Center', style: styles.zoneMidRightCenter },
    { id: 'mid-right', label: 'Mid Right', style: styles.zoneMidRight },
    
  ];

  return (
    <View style={styles.courtContainer}>
      <ImageBackground
        source={require('@/assets/images/half-court.png')}
        style={styles.courtImage}
      >
        {zones.map((zone) => (
          <TouchableOpacity
            key={zone.id}
            style={[styles.zone, zone.style]}
            onPress={() => onZoneSelect(zone.id)}
          >
            <Text style={styles.zoneLabel}>{zone.label}</Text>
          </TouchableOpacity>
        ))}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  courtContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courtImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zone: {
    position: 'absolute',
    backgroundColor: 'rgba(211, 211, 211, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  zoneLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  // 3PT Zones
  zone3ptLeftCorner: {
    left: '0%',
    top: '10%',
    width: '15%',
    height: '20%',
  },
  zone3ptLeftWing: {
    left: '5%',
    top: '45%',
    width: '15%',
    height: '20%',
  },
  zone3ptTop: {
    left: '40%',
    top: '61%',
    width: '20%',
    height: '10%',
  },
  zone3ptRightWing: {
    right: '5%',
    top: '45%',
    width: '15%',
    height: '20%',
  },
  zone3ptRightCorner: {
    right: '0%',
    top: '10%',
    width: '15%',
    height: '20%',
  },
  // Mid-range Zones
  zoneMidLeft: {
    left: '17%',
    top: '10%',
    width: '15%',
    height: '10%',
  },
  zoneMidLeftCenter: {
    left: '22%',
    top: '28%',
    width: '15%',
    height: '15%',
  },
  zoneMidCenter: {
    left: '42%',
    top: '42%',
    width: '15%',
    height: '15%',
  },
  zoneMidRightCenter: {
    right: '22%',
    top: '28%',
    width: '17%',
    height: '15%',
  },
  zoneMidRight: {
    right: '18%',
    top: '10%',
    width: '20%',
    height: '10%',
  },
  
});

export default BasketballCourt;