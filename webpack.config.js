var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = process.env.NODE_ENV;

module.exports = {
    // Корневая папка.
    // __dirname - это константа, которая хранит абсолютный путь к файлу,
    // в котором она используется
    context: __dirname,

    entry: {
        // главный JS-файл для страницы index.html
        index: './js/index.js',
    },

    // куда и как сохранять результаты сборки
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'js/[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,

                // обработка css-файлов с помощью css-loader
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: `css-loader?${NODE_ENV === 'production' ? 'minimize' : ''}`,
                }),
            },
            {
                // обрабатывать ссылки на шрифты в css файлах и помещать их в папку fonts
                test: /\.(ttf|eot|woff2?)\??.*$/,
                loader: 'file-loader?name=fonts/[hash].[ext]',
            }, {
                // обрабатывать ссылки на svg файлы и помещать их в папку svg
                test: /\.svg\??.*$/,
                loader: 'file-loader?name=svg/[hash].svg',
            }, {
                // обрабатывать ссылки на картинки и помещать их в папку images
                test: /\.(jpe?g|png|gif)\??.*$/,
                loader: 'file-loader?name=images/[hash].[ext]',
            },
        ],
    },

    plugins: [
        // нужно, чтобы импортируемые стили сохранялись
        // в отдельных css-файлах, а не в js в виде строки
        new ExtractTextPlugin('css/[name].css'),
    ],
};

if (NODE_ENV === 'production') {
    // при выполнении npm run build js-файлы будут сжаты
    var uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
        },
    });

    module.exports.plugins.push(uglifyJsPlugin);
}
