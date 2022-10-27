// 解决报错 VueJS/Typescript - Cannot find module './components/Navigation' or its corresponding type declarations
// 放在src文件夹下
// https://stackoverflow.com/questions/64213461/vuejs-typescript-cannot-find-module-components-navigation-or-its-correspon
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
