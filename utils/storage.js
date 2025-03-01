import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveProgress = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    alert('Failed to save progress.', e);
  }
};

export const getProgress = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to fetch progress.', e);
  }
};