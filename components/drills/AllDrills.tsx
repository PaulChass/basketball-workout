import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { drills as allDrills } from './drillsData';
import DrillsList from './DrillsList';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';



export default function AllDrills() {
  const { t } = useTranslation();
  const route = useRoute();
  const params = route.params as { category?: string } | undefined;
  const category = params?.category;
  const initialDrills = category ? allDrills.filter(drill => drill.tags && drill.tags.includes(category)) : allDrills;
  const [drills, setDrills] = useState(initialDrills);

  return (
    <View style={styles.container}>
      {/** Header with possibility to filter drills */}
        <DrillsList
          drills={drills}
          setDrills={setDrills}
        />
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
    padding: 25,
    width: '100%',
    height: 200,
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
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    right: 40,
    paddingHorizontal: 16,
  },
  startButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});