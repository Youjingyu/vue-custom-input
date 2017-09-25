var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './examples/main.js',
  output: {
    path: path.resolve(__dirname, './docs'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {

  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])

  if (process.env.BUILD == 'publish') {
    module.exports.entry = './src/index.js';
    module.exports.output = {
      path: path.resolve(__dirname, './dist'),
      filename: 'vue-custom-input.js',
      library: 'customInput',
      libraryTarget: 'umd',
      umdNamedDefine: true
    };

    module.exports.externals = {
          vue: {
              root: 'Vue',
              commonjs: 'vue',
              commonjs2: 'vue',
              amd: 'vue'
          }
      }

    module.exports.resolve = {
      alias: {
        'vue$': 'vue/dist/vue.common.js'
      }
    };

    // Banner
    var moment = require('moment');
    var pkg = require('./package.json');
    var banner = 'Vue custom input \nversion: ' + pkg.version + ' \nrepo: https://github.com/Youjingyu/vue-custom-input \nbuild: ' + moment().format('YYYY-MM-DD HH:mm:ss')
    module.exports.plugins.push(
      new webpack.BannerPlugin({ 
        banner: banner,
        entryOnly: true 
      })
    );
  }
}
