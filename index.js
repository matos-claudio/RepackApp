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
  // `scriptId` will be either 'student' or 'teacher'

  // In dev mode, resolve script location to dev server.

  //   if (!globalThis.__forceChunk__) {
  //     import(
  //       /* webpackChunkName: "remoteModule" */ './src/modules/RemoteModule/RemoteModule'
  //     )
  //       .then(() => console.log('[remoteModule] chunk forced to be generated'))
  //       .catch(() => {});
  //   }

  //   if (scriptId === 'remoteModule') {
  //     console.log(`AQUIIIIII `);
  //     return {
  //       url: `http://192.168.100.65:4002/home-module/${}`,
  //       cache: true,
  //     };
  //   }

  if (__DEV__) {
    console.log(
      `>>>> `,
      JSON.stringify(Script.getDevServerURL(scriptId).toString()),
    );
    return {
      url: Script.getDevServerURL(scriptId),
      //   url: Script.getRemoteURL(
      //     `http://192.168.100.65:4002/home-module/${scriptId}`,
      //   ),
      //   cache: false,
    };
  }

  //   if (__DEV__) {
  //     console.log(`Dev__ `, scriptId);
  //     console.log(`http://192.168.100.73:4002/home-module`);
  //     return {
  //       url: `http://192.168.100.73:4002/home-module/remoteModule.chunk.bundle`,
  //       //   url: Script.getDevServerURL(scriptId),
  //       cache: false,
  //     };

  //     // return {
  //     //   url: Script.getRemoteURL(`http://192.168.100.73:4002/home-module/${scriptId}`),
  //     // };
  //   }

  // For production we want to load local chunks from from the file system.
  //   if (localChunks.includes(scriptId)) {
  //     console.log(`localChunks `, scriptId);
  //     return {
  //       url: Script.getFileSystemURL(scriptId),
  //     };
  //   }

  // return {
  //     url: Script.getRemoteURL(
  //       `http://192.168.100.73:4002/home-module/${scriptId}`,
  //     ),
  //   };

  console.log(
    `ScripURL `,
    Script.getRemoteURL(`http://192.168.100.65:4002/home-module/${scriptId}`),
  );

  console.log(`scriptId `, scriptId);

  console.log(`ScripURL http://192.168.100.65:4002/home-module/${scriptId}`, );

  const scriptUrl = Platform.select({
    ios: `http://192.168.100.65:${remoteChunkPort}/build/output/ios/remote/${scriptId}`,
    android: `http://192.168.100.65:4002/home-module/${scriptId}`,
  });

  return {
    url: `http://192.168.100.65:4002/home-module/${scriptId}`,
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

AppRegistry.registerComponent(appName, () => App);
