import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import DraggableFlatList, { RenderItemParams, RenderItem } from 'react-native-draggable-flatlist';
import { DrillDetailsScreenProps } from '../../types/navigationTypes';


interface Drill {
  title: string;
  duration: number | string;
  videoUrl?: string;
}

interface DrillsListProps {
  drills: Drill[];
  setDrills: React.Dispatch<React.SetStateAction<Drill[]>>;
}

const DrillsList: React.FC<DrillsListProps> = ({ drills, setDrills }) => {
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  const videoHtml = (uri: string) => `
    <html>
      <body style="margin: 0; padding: 0;">
        <video src="${uri}" autoplay muted loop style="width: 100%; height: 100%;"></video>
      </body>
    </html>
  `;

  const handleDeleteDrill = (title: string) => {
    const index = drills.findIndex(drill => drill.title === title);
    const newDrills = drills.slice(); 
    newDrills.splice(index, 1); 
    setDrills(newDrills); 
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Drill>) => (
    <View key={item.title} style={[styles.drillContainer, isActive && styles.activeDrillContainer]}>
      <TouchableOpacity onPress={() => navigation.navigate('DrillDetailsScreen', { drill: item })}>
        <View style={styles.infoBar}>
          <ThemedText type="subtitle">{item.title}</ThemedText>
          <ThemedText type="default">
            {typeof item.duration !== 'number' ? item.duration :
              item.duration < 1 ? `${item.duration * 60} sec` : `${item.duration} min`}
          </ThemedText>
        </View>
        <View style={styles.animationBar}>
          <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
            <Icon name="drag-handle" size={24} color="gray" />
          </TouchableOpacity>
          {item.videoUrl && (
            <WebView
              originWhitelist={['*']}
              source={{ html: videoHtml(item.videoUrl) }}
              style={styles.animation}
            />
          )}
          <TouchableOpacity onPress={() => handleDeleteDrill(item.title)} style={styles.deleteButton}>
            <Icon name="delete" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <DraggableFlatList
      data={drills}
      onDragEnd={({ data }) => setDrills([...data])} // Ensure state update is immutable
      keyExtractor={(_, index) => `drill-${index}`}
      renderItem={renderItem}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  drillContainer: {
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activeDrillContainer: {
    backgroundColor: '#f0f0f0',
  },
  activeDrillText: {
    color: 'black',
  },
  infoBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginTop: 8,
  },
  animationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  animation: {
    backgroundColor: 'transparent',
    flexGrow: 2,
    height: 100,
    marginTop: 10,
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
  },
  dragHandle: {
    padding: 8,
    justifyContent: 'center',
  },
  listContentContainer: {
    paddingBottom: 100, // Add padding to avoid content being hidden behind the button
  },
});

export default DrillsList;