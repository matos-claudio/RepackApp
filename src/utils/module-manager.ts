import {ScriptManager} from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REGISTRY_KEY = 'MiniAppRegistry';
const STORAGE_KEY = 'Repack.ScriptManager.Cache.v4.release';

type MiniAppRegistry = Record<string, string>;

export class MiniAppManager {
  static async addMiniApp(id: string, url: string) {
    const raw = await AsyncStorage.getItem(REGISTRY_KEY);
    const registry: MiniAppRegistry = raw ? JSON.parse(raw) : {};
    registry[id] = url;
    await AsyncStorage.setItem(REGISTRY_KEY, JSON.stringify(registry));
  }

  static async getRegistry(): Promise<MiniAppRegistry> {
    const raw = await AsyncStorage.getItem(REGISTRY_KEY);
    return raw ? JSON.parse(raw) : {};
  }

  static async isInstalled(id: string): Promise<boolean> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const cache = raw ? JSON.parse(raw) : {};
    return !!cache[id];
  }

  static async install(id: string): Promise<void> {
    await ScriptManager.shared.loadScript(id);
  }

  static async uninstall(id: string): Promise<void> {
    await ScriptManager.shared.invalidateScripts([id]);
  }
}
