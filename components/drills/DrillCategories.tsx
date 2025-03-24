import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { DrillDetailsScreenProps } from "@/types/navigationTypes";
import { ThemedView } from "@/components/ThemedView";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";




export default function DrillsCategories() {
  const { t } = useTranslation();
  const navigation = useNavigation<DrillDetailsScreenProps['navigation']>();

  const categories = [
    'Ball handling',
    'Shooting',
    'Finishing',
    'Workouts',
    'Masterclass',    
    'Learning moves',
    'Strength & conditionning',
  ];

  const categoriesBackground: { [key: string]: any } = {
    'Masterclass': require('@/assets/images/jordan.png'),
    'Workouts': require('@/assets/images/workouts.png'),
    'Learning moves': require('@/assets/images/kyrie.png'),
    'Ball handling': require('@/assets/images/fundamentals.png'),
    Shooting: require('@/assets/images/shooting-workout.png'),
    Finishing: require('@/assets/images/layups.png'),
    'Strength & conditionning': require('@/assets/images/stamina.png'),
  };

  return (
    <ScrollView>
      <ThemedView style={styles.tabContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => {
              console.log(`Navigating to AllDrillsList with category: ${category}`);
              navigation.navigate('AllDrillsList', { category });
            }}
          >
            <ImageBackground
              source={categoriesBackground[category]}
              style={styles.buttonBackground}
              imageStyle={styles.buttonImage}
            >
              <ThemedText style={styles.categoryButtonText}>{t(category)}</ThemedText>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
    );
  }

  
const styles = StyleSheet.create({
    tabContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0,
      minHeight: 500,
    },
    button: {
      marginBottom: 16,
    },
    tabNavigatorContainer: {
      flex: 1,
      marginTop: -320,
    },
    buttonBackground: {
      height: 200,
      width: 360,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 1,
    },
    buttonImage: {
      borderRadius: 20,
    },
    categoryButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      margin: 5,
    },
    categoryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
