import path from 'node:path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import { optimize } from '@rspack/core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadJSON = (_path) => JSON.parse(fs.readFileSync(new URL(_path, import.meta.url)));

const appJson = loadJSON('./app.json');

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default {
  context: __dirname,
  entry: './index.js',
  optimization: {
    /* ... */

    chunkIds: "named",
  },
  resolve: {
    ...Repack.getResolveOptions(),
    // extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      ...Repack.getJsTransformRules(),
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [new Repack.RepackPlugin({
    debug: true,
    extraChunks: [
      {
        include: appJson.localChunks,
        type: 'local',
      },
      {
        include: appJson.remoteChunks,
        test: /.*/,
        type: "remote",
        outputPath: path.join("build/output", "remotes/promo"), // Default path
      },
    ],
  })],
};
