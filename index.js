import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {ScriptManager, Script} from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

ScriptManager.shared.setStorage(AsyncStorage);

ScriptManager.shared.addResolver(async scriptId => {
  console.log('📦 Resolver acionado para:', scriptId);

  // Ambiente de desenvolvimento: use dev server
  if (__DEV__) {
    console.log('⚙️  Modo DEV - usando DevServer: ',);

    return {
      url: Script.getDevServerURL(scriptId),
      cache: false, // evita cache para facilitar hot reload
    };
  }

  // Ambiente de produção: buscar no AsyncStorage
  try {
    const raw = await AsyncStorage.getItem('MiniAppRegistry');
    const registry = raw ? JSON.parse(raw) : {};
    const remoteUrl = registry[scriptId];

    if (!remoteUrl) {
      throw new Error(
        `❌ MiniApp "${scriptId}" não registrado no MiniAppRegistry.`,
      );
    }

    console.log(`✅ Resolvendo "${scriptId}" com URL`, remoteUrl);

    return {
      url: remoteUrl,
      cache: true,
    };
  } catch (error) {
    console.error(`🔥 Erro ao resolver o MiniApp "${scriptId}":`, error);
    throw error;
  }
});

AppRegistry.registerComponent(appName, () => App);
