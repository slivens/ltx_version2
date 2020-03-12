# 老干部App

****==目录结构骨架==****
```
├── app                 // 应用App入口
|  ├── components       // 全局公用组件
|  ├── config           // 配置文件
|  ├── index.js         // 路由入口文件
|  ├── less             // 全局样式
|  ├── pages            // 各个功能页面
|  └── redux            // redux逻辑目录
├── assets              // 静态资源文件
|  ├── data         
|  ├── iconfot
|  └── images
├── dist                // 打包后生成的文件 
|  ├── assets
|  ├── images
|  ├── index.html
|  ├── js
|  └── vendors~main.70af83f0.chunk.js
├── index.html          // main入口html
├── index.js            // main入口文件
├── package-lock.json
├── package.json
├── README.md
├── webpack.dev.config.js   // 开发配置
└── webpack.pro.config.js   // 生成配置
```
****==打包流程步骤==****
1. 进入webpack.dev.config.js将output.publicPath="./" (发布完要改回"/"，不然资源文件访问不到)
2. 进入config文件修改commonUrl = 'http://192.168.111.132:8080'(打包后修改为commonUrl = '/api';)
3. 根目录下执行 npm run hb