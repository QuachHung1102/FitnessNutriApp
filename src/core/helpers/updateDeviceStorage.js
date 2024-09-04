import AsyncStorage from "@react-native-async-storage/async-storage";

const setStoreData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.log(`saving error: ${e}`);
  }
};

const getStoreData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(`reading error: ${e}`);
  }
};

const updateDeviceStorage = {
  setStoreData,
  getStoreData,
};

export default updateDeviceStorage;