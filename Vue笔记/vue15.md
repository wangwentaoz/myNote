1. Vue异步更新DOM及$nextTick执行机制浅析
   1. Vue异步更新DOM策略
      1. Vue实现响应式并不是数据发生变化之后DOM立即变化，而是按一定的策略进行DOM的更新
      2. 具体来讲，Vue在更新DOM时是异步执行的。只要侦听到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更
      3. 如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的
      4. 然后，在下一个的事件循环“tick"中，Vue刷新队列并执行实际（已去重的）工作。
   2. $nextTick执行机制
      1. $nextTick会在DOM更新之后被触发，以获取最新DOM节点
      2. 具体来讲，JavaScript原生DOM操作时会随着JavaScript代码执行同步进行DOM更新，而使用Vue会异步更新DOM
      3. 会在nextTick微任务中更新DOM，然后再执行$nextTick的回调函数
      4. 不过页面渲染始终是在微任务执行之后才进行的，所以$nextTick回调执行时页面还没有进行渲染，在页面上看不到更新后的结果
   3. 注：浏览器如果不兼容则有几种备选方案，其中setTimeout是最后的一种备选方案，它会将回调函数加入任务队列task中，等待执行。
   4. https://zhuanlan.zhihu.com/p/364479245
2. this.$refs
   1. 关于 ref 注册时间的重要说明：因为 ref 本身是作为渲染结果被创建的，在初始渲染的时候你不能访问它们 - 它们还不存在
      1. $refs 也不是响应式的，因此你不应该试图用它在模板中做数据绑定
   2. 所以如果是v-if的组件search-part
      1. 开始refs对象里面没有v-if为false的组件，所以后面虽然有search-part组件实例DOM但是通过refs也取不到
      ```
      <search-part v-if="searchPartFlag" ref="searchPart"></search-part>
      jumpSearchDetailPage(){
        this.searchPartFlag = true
        this.$nextTick(() =>{
          // 这时是有渲染search-part组件的
          console.log(Object.keys(this.$refs),'Object.keys(this.$refs)')  // undefined
          console.log(this.$refs.searchPart,'this.$refs.searchPart')  // undefined
        })
      },
      ```
3. 