/** webpack
 * 機能(モジュール)ごとに分かれた複数のファイルを1つに束ねる(bandleする)。
 * =>web読み込み向上につながる
 * https://pick-up-tech.com/blog/webpack-config-js-%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9%E3%82%92%E3%81%97%E3%81%A3%E3%81%8B%E3%82%8A%E7%90%86%E8%A7%A3%E3%81%97%E3%82%88%E3%81%86
 * https://qiita.com/one-kelvin/items/b810aafb6b5ef90789a3
 * https://reffect.co.jp/html/webpack-loader-setting-for-beginner
 * https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html
 */

/* eslint-disable*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/* eslint-enable*/

module.export = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: 'development',
  // エントリーポイント（webpackがbuildする際の開始点のJS）
  entry: './src/index.js',
  // どこにファイルを出力するか
  output: {
    filename: 'main.js',
    path: `${__dirname}/dist`,
  },
  // ソースマップとは、Babelなどトランスパイル後と前のコードの内容を紐付けしてデバッグしやするするもの。
  devtool: 'source-map',
  // webpack が特定の module をどう扱うか
  // webpack では module は JavaScript や CSS などのファイルを指す
  module: {
    // webpackはJSしか理解できないが、Loaderを使い変換することでJS以外も処理可能にする
    // rule: を設定すると、「条件」、「結果」、「ネスト」されたルール３つの部分に分けることができます
    rules: [
      // 拡張子.tsxをts-loaderとして読み込む
      {
        //処理するファイル種類の指定（正規表現）
        test: /\.tsx?$/,
        //変換するloaderを指定。（上記のoutput:に追加前に変換する）
        use: 'ts-loader',
      },
      // CSSを扱えるようにする（css-loaderとstyle-loaderが必要）
      {
        test: /\.css$/,
        // 後ろから順番に適用される。
        use: [
          //<head>内にインラインCSSで出力するためのローダー
          'style-loader',
          {
            //CSS記述を解釈するためのローダー
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
              },
            },
          },
          //Sass記述を解釈するためのローダー
          'sass-loader',
        ],
      },
    ],
  },
  target: ['web', 'es5'],
  // モジュールをimportする際に、指定されたモジュールを検索して該当するファイルを探す仕組み（モジュール解決）
  resolve: {
    // 指定されている拡張子のファイルは import の際に拡張子を省略することができる
    extensions: ['.ts', '.tsx', '.js', '.json'],
    // エイリアスを作成することで、特定のモジュールをより簡単にインポートすることができる
    alias: { '@': path.resolve(__dirname, 'src') },
    fallback: {
      util: false,
    },
  },
  // ローカル開発用環境を立ち上げる
  devServer: {
    //open: true, // 実行時にブラウザが自動的に localhost を開く
    hot: true,
    host: 'localhost',
    port: 8081,
    historyApiFallback: true,
    static: {
      directory: `${__dirname}/dist`,
    },
  },
  // Pluginはwebpackができることの幅を広げる
  // https://webpack.js.org/plugins/
  // require()をして、newでインスタンス生成する
  plugins: [
    new HtmlWebpackPlugin({ template: `${__dirname}/public/index.html` }), //Easily create HTML files to serve your bundles
    new webpack.HotModuleReplacementPlugin(), //Enable Hot Module Replacement (HMR)
  ],
}
