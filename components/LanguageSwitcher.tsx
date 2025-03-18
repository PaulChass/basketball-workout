import React, { Children } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng).catch((error) => {
      console.error('Failed to change language:', error);
    });
  };

  return (
    <View style={styles.container}>
     <View style={styles.buttonContainer}>
        <Button title="English" onPress={() => changeLanguage('en')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Français" onPress={() => changeLanguage('fr')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Español" onPress={() => changeLanguage('es')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',   
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  buttonContainer: { 
    borderRadius: 2,
   }
});

export default LanguageSwitcher;