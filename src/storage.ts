import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  private readonly clickIdKey: string = 'dub:click_id';

  constructor() {}

  // Get clickId
  async getClickId(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.clickIdKey);
    } catch (error) {
      console.error('Error getting clickId:', error);
      return null;
    }
  }

  // Set clickId
  async setClickId(value: string | null | undefined): Promise<void> {
    try {
      if (value !== null && value !== undefined) {
        await AsyncStorage.setItem(this.clickIdKey, value);
      } else {
        await AsyncStorage.removeItem(this.clickIdKey);
      }
    } catch (error) {
      console.error('Error setting clickId:', error);
    }
  }

  // Clear clickId
  async clearClickId(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.clickIdKey);
    } catch (error) {
      console.error('Error clearing clickId:', error);
    }
  }
}

export default Storage;
