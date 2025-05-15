import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {Button} from './src/components/Button';

import LocalModule from './src/modules/LocalModule';
import RemoteModule from './src/modules/RemoteModule';
import PromoBanner from './src/remote-promo/src';
import {ScriptManager} from '@callstack/repack/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [showLocalModule, setShowLocalModule] = React.useState<boolean>(false);
  const [showRemoteModule, setShowRemoteModule] =
    React.useState<boolean>(false);
  const [RemoteComponent, setRemoteComponent] = React.useState<any>(null);

  // {showRemoteModule ? (
  //   <PromoBanner />
  // ) : (
  //   <Button
  //     title="Show Remote Module"
  //     onPress={() => setShowRemoteModule(true)}
  //   />
  // )}

  async function listarBundlesInstalados() {
    const scriptId = 'remotePromo';
    const cacheKey = 'Repack.ScriptManager.Cache.v4.release';
    const raw = await AsyncStorage.getItem(cacheKey);
    const cache = raw ? JSON.parse(raw) : {};
    const existe = !!cache[scriptId];
    console.log(`Raw `, raw);
    console.log(`cache `, cache);
    console.log(`existe `, existe);
  }

  async function removeMiniApp() {
    const scriptId = 'remotePromo';
    const cacheKey = 'Repack.ScriptManager.Cache.v4.release';
  
    try {
      // Remove o script da memória/ciclo atual
      await ScriptManager.shared.invalidateScripts([scriptId]);
  
      // Remove do AsyncStorage
      const raw = await AsyncStorage.getItem(cacheKey);
      const cache = raw ? JSON.parse(raw) : {};
      delete cache[scriptId];
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));
  
      // Opcional: força re-render para sumir visualmente
      setShowRemoteModule(false);
      setRemoteComponent(null); // se você for usar componente via state no futuro
      console.log(`[Repack] Script "${scriptId}" removido com sucesso.`);
    } catch (err) {
      console.error('Erro ao remover MiniApp:', err);
    }
  }

  const handleLoadRemoteModule = async () => {
    try {
      const scriptId = 'remotePromo';
      ScriptManager.shared
        .loadScript(scriptId)
        .then(() => {
          setShowRemoteModule(true);
        })
        .catch(error => {
          console.error('Erro ao carregar módulo remoto:', error);
        });
    } catch (err) {
      console.error('Erro ao carregar módulo remoto:', err);
    }
  };

  useEffect(() => {
    handleLoadRemoteModule();
  }, []);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView />
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Olá, Cláudio</Text>
        </View>
        <View style={styles.deliveryInfo}>
          {showRemoteModule ? (
            <PromoBanner />
          ) : (
            <Button
              title="Baixar MiniApp"
              onPress={() => handleLoadRemoteModule()}
            />
          )}
        </View>
        <Button
          title="Listar Bundles"
          onPress={() => listarBundlesInstalados()}
        />
        <Button title="Remover MiniApp" onPress={() => removeMiniApp()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#09424D',
    height: 140,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryInfo: {
    paddingHorizontal: 20,
  },
});

export default App;
