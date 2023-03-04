import webpack from "webpack";
const commonRules = [
    {
        test:/\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: "ts-loader"
            }
        ]
    },
    {
        test: /\.png|jpg|gif|jpeg|svg/,
        type: 'asset/resource',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            },
        },
        generator: {
            filename: 'images/[base]',
        },
    },
    {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[base]',
        },
    },
    {
        test: /\.css$/,
        use:[ // 由后向前加载
            {loader: 'css-loader'},
            {loader: "postcss-loader"}
        ]
    },
    {
        test: /\.less$/,
        use:[
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'less-loader'}
        ]
    },
    {                   // 处理sass/scss
        test: /\.s[ac]ss$/i,
        use: [
            // 将 CSS 转化成 CommonJS 模块
            'css-loader',
            // 将 Sass 编译成 CSS
            'sass-loader',
        ],
    },
    {
        //test: /\.styl$/,
        test: /\.styl(us)?$/,
        use: [
            {loader: 'css-loader'},
            {loader: "postcss-loader"},
            {loader: 'stylus-loader'}
        ]
    }
]
const commonPlugins = [
    new webpack.HotModuleReplacementPlugin(),
]
export { commonRules, commonPlugins };
