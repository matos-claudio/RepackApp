import React from 'react';
import { View, Text } from 'react-native';

const PromoBanner = () => (
  <View style={{ padding: 16, backgroundColor: 'gold' }}>
    <Text style={{ fontWeight: 'bold' }}>🎉 Promoção imperdível de Celulares!</Text>
    {/* <Text style={{ fontWeight: 'bold' }}>🎉 Promoção imperdível de TVS!</Text> */}
  </View>
);

if (!globalThis.__chunk__) globalThis.__chunk__ = {};
globalThis.__chunk__.remoteModule = { default: PromoBanner };

export default PromoBanner;