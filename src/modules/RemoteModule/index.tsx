// /**
//  * path: src/modules/RemoteModule/index.tsx
//  * description:
//  *    This is a remote module that is loaded asynchronously.
//  *    This file encapsulate React.lazy and React.Suspense over the remote module.
//  */
import React from 'react';
import { Text } from '../../components/Text';
import { ScriptManager } from '@callstack/repack/client';
// import RemoteModule from './RemoteModule';

const Component = React.lazy(() => import(/* webpackChunkName: "remoteModule" */ './RemoteModule'));

// const Component = React.lazy(() =>
//   ScriptManager.shared.loadScript('remoteModule').then(() => {
//     console.log(`CHUNK `, globalThis)
//     const Comp = globalThis.__chunk__?.remoteModule?.default;
//     if (!Comp) throw new Error('❌ remoteModule.default not found in globalThis.__chunk__');
//     return { default: Comp };
//   })
// );

// const Component = React.lazy(() =>
//   ScriptManager.shared.loadScript('remoteModule').then(() => {
//     console.log(`######## `)
//     const Comp = globalThis.__chunk__?.remoteModule?.default;
//     if (!Comp) throw new Error('remoteModule.default not found');
//     return { default: Comp };
//   })
// );

export default () => (
  <React.Suspense fallback={<Text>Loading Remote Module...</Text>}>
    <Component />
  </React.Suspense>
);


// import React from 'react';
// import RemoteModule from './RemoteModule';

// // 👇 1. FORÇA A GERAÇÃO DO CHUNK COM webpackChunkName
// // ⚠️ MAS NÃO use esse componente para export ou globalThis!
// React.lazy(() =>
//   import(/* webpackChunkName: "remoteModule" */ './RemoteModule').then((mod) => {
//     console.log('[remoteModule] chunk identificado');
//     return mod;
//   })
// );

// // 👇 2. ESSENCIAL: registra no globalThis para o Host acessar
// if (!globalThis.__chunk__) globalThis.__chunk__ = {};
// globalThis.__chunk__.remoteModule = { default: RemoteModule };

// // 👇 3. Exporta algo para que o Webpack não elimine o bundle
// export default RemoteModule;