// import PromoBanner from './promo-banner';

// if (!globalThis.__chunk__) globalThis.__chunk__ = {};
// globalThis.__chunk__.promoBanner = { default: PromoBanner };

// export default PromoBanner;

import React from 'react';
import {Text} from 'react-native';

const Component = React.lazy(
  () => import(/* webpackChunkName: "remotePromo" */ './promo-banner'),
);

export default () => (
  <React.Suspense fallback={<Text>Loading Remote Module...</Text>}>
    <Component />
  </React.Suspense>
);

