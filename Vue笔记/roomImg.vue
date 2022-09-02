<template>
  <div class="roomImg">
    <div class="drag">
      <transition-group class="transition-wrapper" name="sort">
        <div
          class="box sort-item"
          v-for="item in dataList"
          :key="item.id"
          :draggable="true"
          @dragstart="dragstart(item)"
          @dragenter="dragenter(item, $event)"
          @dragend="dragend(item, $event)"
          @dragover="dragover($event)"
        >
          <!-- :key="item.roomTypeNoId" -->
          <!-- <img :src="require(item.roomPicPth)" alt="" /> -->
          {{ item.label }}
        </div>
      </transition-group>
    </div>
    <!-- <div>oldData:{{ oldData }}</div>
    <div>newData:{{ newData }}</div>
    <div>dataList:{{ dataList }}</div> -->
  </div>
</template>
<script>
export default {
  props: {
    roomTypeId: {
      // type: Number,
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      oldData: null, // 开始排序时按住的旧数据
      newData: null, // 拖拽过程的数据
      dataList: [
        { id: 1, label: "测试一号" },
        { id: 2, label: "测试二号" },
        { id: 3, label: "测试三号" },
        { id: 4, label: "测试四号" },
        { id: 5, label: "测试五号" },
        { id: 6, label: "测试六号" },
        { id: 7, label: "测试七号" },
      ],
    };
  },
  methods: {
    dragstart(value) {
      this.oldData = value;
    },

    // 记录移动过程中信息
    dragenter(value, e) {
      this.newData = value;
      e.preventDefault();
    },

    // 拖拽最终操作
    dragend(value, e) {
      if (this.oldData !== this.newData) {
        let oldIndex = this.dataList.indexOf(this.oldData);
        let newIndex = this.dataList.indexOf(this.newData);
        let newItems = [...this.dataList];
        // 删除老的节点
        newItems.splice(oldIndex, 1);
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, this.oldData);
        this.dataList = [...newItems];
      }
    },

    // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
    dragover(e) {
      e.preventDefault();
    },
  },
};
</script>
<style lang="scss" scoped>
.roomImg {
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #575757;
  font-weight: 400;
  .drag {
    padding-left: 5%;
    .transition-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .box {
      width: 20%;
      height: 200px;
      // display: inline-block;
      // background-color: chartreuse;
      border:1px solid #b6b3b3;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 4%;
      margin-top: 10px;
      transition: all 0.8s;
      border-radius: 15px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
//
</style>
