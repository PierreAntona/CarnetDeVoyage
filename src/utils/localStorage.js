import * as SecureStore from 'expo-secure-store';

async function getValueFor(key, value) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      console.log("La valeur est en stock", result)
    } else {
        save(key, value);
    }
  }

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

export { getValueFor, save }