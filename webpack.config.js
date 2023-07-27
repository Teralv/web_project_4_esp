const path = require('path'); // conecta la ruta a la configuración de webpack
const HtmlWebpackPlugin = require('html-webpack-plugin'); // plugin de conexión
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // plugin de conexión
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'inline-source-map',

  entry: {
    main: './src/page/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },

  target: ['web', 'es5'],

  stats: { children: true }, //solo sale cuando se producen errores

  mode: 'development', // añade el modo de desarrollo

  devServer: {
    static: path.resolve(__dirname, './dist'), // especifica una carpeta desde donde servir la aplicación y su contenido
    compress: true, // esto acelerará la carga de archivos en el modo de desarrollo
    port: 8080, // abrirá tu página en localhost:8080
    open: true, // se abrirá automáticamente en el navegador después de ejecutar npm run dev
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
};

// module.exports es la sintaxis necesaria para exportar en Node.js