1. uni-app使用echarts图表给图表添加点击事件/uni-app 解决echarts在h5中 tooltips及部分功能失效问题:
   1. 问题
      1. echarts图可以加载，tooltips提示框不显示，部分功能不生效。
   2. 原因
      1. echarts 引入的时候，会优先判断当前的环境
      2. 由于uni app 中有一个 ‘wx’ 全局变量污染了echarts中的 wx 变量，导致这里的判断直接走第一个，echarts 部分功能无法生效
   3. 解决办法
      1. 在main.js中加入这行代码，将全局变量重新赋值 ，成功解决
        ```
          window.wx = {}
        ```
2. 