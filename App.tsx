import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScriptManager} from '@callstack/repack/client';
import PromoBanner from './src/remote-promo/src';
import {Button} from './src/components/Button';
import { MiniAppManager } from './src/utils/module-manager';

const MINI_APPS = [
  {id: 'profile', name: 'Perfil', installed: true},
  {id: 'orders', name: 'Pedidos', installed: true},
  {id: 'wallet', name: 'Carteira', installed: true},
  {id: 'remotePromo', name: 'Promo Banner', installed: false},
];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    MiniAppManager.addMiniApp(
      'remotePromo',
      'http://10.190.0.86:4002/promo-module/remotePromo'
    );
  }, []);

  const checkIfInstalled = async () => {
    if (!__DEV__) {
      const raw = await AsyncStorage.getItem(
        'Repack.ScriptManager.Cache.v4.release',
      );
      const cache = raw ? JSON.parse(raw) : {};
      setInstalled(!!cache['remotePromo']);
    } else {
      setInstalled(true);
    }
  };

  const installMiniApp = async () => {
    await MiniAppManager.addMiniApp(
      'remotePromo',
      'http://10.190.0.86:4002/promo-module/remotePromo'
      // 'http://192.168.100.65:4002/promo-module/remotePromo'
    );
    await ScriptManager.shared.loadScript('remotePromo');
    await checkIfInstalled();
  };

  const removeMiniApp = async () => {
    await ScriptManager.shared.invalidateScripts(['remotePromo']);
    const raw = await AsyncStorage.getItem(
      'Repack.ScriptManager.Cache.v4.release',
    );
    const cache = raw ? JSON.parse(raw) : {};
    delete cache['remotePromo'];
    await AsyncStorage.setItem(
      'Repack.ScriptManager.Cache.v4.release',
      JSON.stringify(cache),
    );
    setInstalled(false);
  };

  useEffect(() => {
    checkIfInstalled();
  }, []);

  const renderItem = ({item}) => {
    const isRemote = item.id === 'remotePromo';
    const isInstalled = isRemote ? installed : item.installed;

    return (
      <View style={[styles.card, !isInstalled && styles.disabledCard]}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        {isRemote && !isInstalled && (
          <Button title="Instalar" onPress={installMiniApp} />
        )}
        {isRemote && isInstalled && (
          <>
            <PromoBanner />
            <Button title="Remover" onPress={removeMiniApp} />
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      <FlatList
        data={MINI_APPS}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
    marginTop: 60
  },
  list: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    height: 180,
    marginBottom: 16,
  },
  disabledCard: {
    backgroundColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default App;
