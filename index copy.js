/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import {ScriptManager, Script} from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from './App';
import {
  name as appName,
  localChunks,
  remoteChunkUrl,
  remoteChunkPort,
} from './app.json';

ScriptManager.shared.setStorage(AsyncStorage);

ScriptManager.shared.addResolver(async scriptId => {
  console.log(`SCRIPT ID `, scriptId);
  if (__DEV__) {
    const url = `http://192.168.100.65:4002/home-module/${scriptId}`;
    console.log(`>>>> url`, url);

    return {
      // url: Script.getDevServerURL(scriptId),
      url: Script.getDevServerURL(scriptId),
      //   url: Script.getRemoteURL(
      //     `http://192.168.100.65:4002/home-module/${scriptId}`,
      //   ),
      //   cache: false,
    };
  }

  console.log(`URL: `, `http://192.168.100.65:4002/promo-module/${scriptId}`);

  return {
    url: `http://192.168.100.65:4002/promo-module/${scriptId}`,
    cache: false,
    // url: `http://192.168.100.65:4002/home-module/${scriptId}`,
  };

  //   const scriptUrl = Platform.select({
  //     ios: `http://192.168.100.65:${remoteChunkPort}/build/output/ios/remote/${scriptId}`,
  //     android: `http://192.168.100.65:4002/home-module/${scriptId}`,
  //   });

  //   console.log(`ScripURL `, scriptUrl);

  //   return {
  //     url: Script.getRemoteURL(scriptUrl),
  //   };

  //   return {
  //     url: Script.getRemoteURL(
  //       `http://somewhere-on-the-internet.com/${scriptId}`,
  //     ),
  //   };
});

ScriptManager.shared.on('resolving', (...args) => {
  console.log('DEBUG/resolving', ...args);
});

ScriptManager.shared.on('resolved', (...args) => {
  console.log('DEBUG/resolved', ...args);
});

ScriptManager.shared.on('prefetching', (...args) => {
  console.log('DEBUG/prefetching', ...args);
});

ScriptManager.shared.on('loading', (...args) => {
  console.log('DEBUG/loading', ...args);
});

ScriptManager.shared.on('loaded', (...args) => {
  console.log('DEBUG/loaded', ...args);
});

ScriptManager.shared.on('error', (...args) => {
  console.log('DEBUG/error', ...args);
});

ScriptManager.shared.on('invalidated', scriptIds => {
  console.log('DEBUG/invalidated', scriptIds);
});

AppRegistry.registerComponent(appName, () => App);
