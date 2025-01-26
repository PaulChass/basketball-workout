import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <View style={styles.container}>
      <Button title="English" onPress={() => changeLanguage('en')} />
      <Button title="Français" onPress={() => changeLanguage('fr')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 16,
  },
});

export default LanguageSwitcher;
