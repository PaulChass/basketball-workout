import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useNavigation } from '@react-navigation/native';
import { DrillDetailsScreenProps } from '../../types/navigationTypes';
import { drills as allDrills } from './drillsData';
import DrillsList from './DrillsList';
import { useTranslation } from 'react-i18next';

const initialDrills = allDrills.filter(drill =>
  drill.tags && ["shooting"].includes(drill.tags[0])
);

export default function ShootingFundamentalsDrills() {
  const { t } = useTranslation();
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();
  const [drills, setDrills] = useState(initialDrills);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/shooting-workout.png')}
          style={styles.reactLogo}
        />
        <View style={styles.infoContainer}>
          <ThemedText type="default">{drills.length} {t('exercises')}</ThemedText>
        </View>
      </View>
      <View style={styles.drillsContainer}>
        <DrillsList
          drills={drills}
          setDrills={setDrills}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  drillsContainer: {
    paddingBottom: 250,
  },
  reactLogo: {
    height: 200,
    width: '100%',
    marginBottom: 1,
    marginTop: -16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 16,
  }
});