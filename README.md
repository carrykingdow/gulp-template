# gulp template

#### 项目介绍
基于gulp 3.0 构建的前端脚手架工具，可用于快速生成前端项目。适合包含多入口文件的项目。如 pc官网等。支持`es6`语法，`scss`预处理，也可以根据需求自定义插件。

#### 使用
1. npm/cnpm install 
2. npm run dev  //开发环境
3. npm run build //生产环境

#### 一些说明
1. 在开发环境中，支持hotReload热加载（不用刷新浏览器，只要保存文件，浏览器就能自动刷新）
2. 开发环境预览的默认地址是`localhost:9527/dist/`
3. 再生产环境中,对`src`下的`img`文件下的图片进行了压缩，减小图片的体积
4. 使用了`file-include`进行模板编辑。可以支持`html`魔板输出。[file-include](https://www.npmjs.com/package/gulp-file-include)
5. 取消文件合并，减少文件大小。按需引用。也可以安装 `gulp-contact`进行文件合并。
6. `_include`文件夹用于存放模板文件，只会将对应的`html`打包到目标文件，不会生成额外文件夹。
7. 生产环境资源名做了转义处理，每次打包都会生成最新的资源文件(`css`,`js`),避免缓存。
8. 生产环境`html`做了压缩处理，减少页面体积。
9. 为了方便调试，加入了代理模式，防止跨域请求影响心情
  设置代理demo
  ```
  //假设请求域名为这个
  let baseUrl = "https://www.google.com/";
  //代理域名应该设置成这样 才可以正常使用
  let devBaseUrl = "http://localhost:8080/proxy/www.google.com/";
  ```

**happy coding !**

