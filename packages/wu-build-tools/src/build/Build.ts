import path from "path";
import { copySync, ensureDirSync, pathExists } from "fs-extra";
import fs, { Stats } from "fs";
import { BuildProps, BuildResult, DeclarationResult, StartBuildResult } from "./type";
import { build } from "./utils";
import rimraf from "rimraf";

class Build {
    private config: BuildProps;
    constructor(options: BuildProps) {
        this.config = options;
    }
    /**
     * 开始打包
     * @returns
     */
    public start(): Promise<StartBuildResult> {
        return new Promise(async (resolve) => {
            try {
                await this.preBuild();
                const buildResult: BuildResult = await this.buildEs();
                const buildResult1: BuildResult = await this.buildUmd();
                if (buildResult.state && buildResult1.state) {
                    await this.declaration();
                    const lis: string[] = fs.readdirSync(this.config.pathConfig.outputPath) || [];
                    const outList = lis.filter(item => item.indexOf('d.ts') <= -1).map(item1 => path.join(this.config.pathConfig.outputPath, item1))
                    resolve({ state: true, fileList: outList })
                } else {
                    resolve({ state: false, ...buildResult, fileList: [] });
                }

            }catch(e) {
                console.log(e);
                resolve({ state: true, error: e, fileList: [] })
            }
        })
    }

    private buildEs(): Promise<BuildResult> {
        return  build(this.config.rollupOptions[0], this.config);
    }

    private buildUmd(): Promise<BuildResult> {
        return  build(this.config.rollupOptions[1], this.config);
    }

    /**
     * 预构建检查
     * @returns
     */
    private preBuild() {
        return new Promise(async (resolve) => {
            const inputeEists = await pathExists(this.config.pathConfig.inputPath);
            const tsConfigEists = await pathExists(this.config.pathConfig.tsconfig);
            if (!inputeEists) {
                resolve({
                    state: false,
                    errMaeeage: `not found entry file, please check ${this.config.pathConfig.inputPath}`
                });
                return;
            }
            if (!tsConfigEists) {
                resolve({
                    state: false,
                    errMaeeage: 'not found tsconfig.build.json file, please create tsconfig.build.json file in root directory'
                });
                return;
            }
            ensureDirSync(this.config.pathConfig.outputPath);
            ensureDirSync(this.config.pathConfig.typePath);
            resolve(true);
        })
    }

    /**
     * 类型申明生成
     */
    private declaration(): Promise<DeclarationResult> {
        return new Promise((resolve) => {
            const filePath: string = this.config.pathConfig.outputPath;
            const rootPath: string = this.config.pathConfig.rootPath;
            fs.readdir(filePath, (err: Error, files: string[]) => {
                if (err) {
                    console.warn(err);
                    resolve({ state: true });
                } else {
                    //遍历读取到的文件列表
                    files.forEach((filename: string) =>  {
                        //获取当前文件的绝对路径
                        const filedir = path.join(filePath, filename);
                        //根据文件路径获取文件信息，返回一个fs.Stats对象
                        fs.stat(filedir, (eror: Error, stats: Stats) => {
                            if (eror) {
                                console.warn('获取文件stats失败');
                            } else {
                                const isFile = stats.isFile(); //是文件
                                const isDir = stats.isDirectory(); //是文件夹
                                if (isFile) {
                                    if (filedir.indexOf(".d.ts") > -1) {
                                        const targetPath = path.join(rootPath, `./types/${filename}`);
                                        fs.copyFileSync(filedir, targetPath);
                                        fs.unlinkSync(filedir);

                                    }
                                }
                                if (isDir) {
                                    if (filename === 'src') {
                                        fs.copyFileSync(`${filedir}/index.d.ts`,  path.join(rootPath, `./types/index.d.ts`));
                                        rimraf.sync(filedir);
                                    } else {
                                        const target = path.join(rootPath, `./types/${filename}`)
                                        copySync(filedir, target);
                                    }

                                }
                            }
                        })
                    });
                    resolve({ state: true });
                }
            });
        })
    }
}

export { Build }
