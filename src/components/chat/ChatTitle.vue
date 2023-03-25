<template>
  <div class="chatTitle">
    <span class="titleName">{{currentSession.nickname}}</span>
    <el-button class="moreBtn" size="small" icon="el-icon-more"></el-button>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "ChatTitle",
    computed: {
      ...mapGetters([
        //同名缩写
        "currentSession"
      ]),
    }
  }
</script>

<style scoped>
  .chatTitle{
    height: 50px;
    width: 100%;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.5px solid #c7d2db;
  }
  .moreBtn{
    background-color: #eee;
    border: 0;
    height: 40px;
  }
  .titleName{
    margin: 10px 20px;
  }

</style>
