import {rollup, RollupOptions} from "rollup";
import { BuildProps, BuildResult } from "./type";

/**
 *
 * @param rollupOptions
 * @param _options
 * @returns
 */
function build(rollupOptions: RollupOptions, _options: BuildProps): Promise<BuildResult> {
    return new Promise(async (resolve) => {
      let bundle;
      let buildFailed = false;
      let buildError = null;
      try {
        bundle = await rollup(rollupOptions);
        // console.log(bundle.watchFiles);
        await generateOutputs(bundle, rollupOptions.output);
      } catch (error) {
        buildFailed = true;
        buildError = error;
        console.error(error);
      }
      if (bundle) {
        await bundle.close();
      }
      if (buildFailed) {
        resolve({ state: false, bundle: bundle || null, error: buildError});
      } else {
        resolve({ state: true, bundle});
      }
    })

}

/**
 *
 * @param bundle 文件写入
 * @param output
 */
async function generateOutputs(bundle, output) {
    for (const outputOptions of output) {
      const { output } = await bundle.write(outputOptions);
      for (const chunkOrAsset of output) {
        if (chunkOrAsset.type === 'asset') {
          // console.log('Asset', chunkOrAsset);
        } else {
          // console.log('Chunk', chunkOrAsset.modules);
        }
      }
    }
}

export { build }
