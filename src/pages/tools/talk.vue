<template>
  <el-container>
    <el-container>
      <el-header>Header</el-header>
      <el-container class="container">
        <el-aside width="150px">
          <my-aside/>
        </el-aside>
        <el-main>
          <div id="talk">
              <div class="toolbar">
                <toolbar />
              </div>
              <div class="sidebar">
                <card />
                <list />
              </div>
              <div class="main">
                  <chat-title></chat-title>
                  <message></message>
                  <user-text></user-text>
              </div>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </el-container>

</template>

<script>
import MyAside from "@/components/MyAside";
//外形
import Toolbar from "@/components/chat/Toolbar";
//搜索框
import Card from "@/components/chat/Card";
//用户列表
import List from "@/components/chat/List";
//聊天标题，群聊名或者聊天对象名
import ChatTitle from "@/components/chat/ChatTitle";
//聊天记录信息
import Message from "@/components/chat/Message";
import UserText from "@/components/chat/UserText";


export default {
  name: "Talk",
  components: {
    MyAside,
    Toolbar,
    Card,
    List,
    ChatTitle,
    Message,
    UserText
  },
  data() {
    return {
      data: {},

    }
  },
  mounted:function() {
    //初始化数据
    this.$store.dispatch('initData');
    //连接WebSocket服务
    this.$store.dispatch('connect');
  },
  destroyed() {
    console.log("sessionStorage state clear")
    sessionStorage.setItem("state", {});
    this.$store.dispatch('disconnect');
  },
  created () {
    // //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("state") ) {
    //   this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    // }

    //在页面刷新时将vuex里的最新信息保存到sessionStorage里   TODO vuex刷新会丢失？？
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("state",JSON.stringify(this.$store.state.chat))
    })
  }
}
</script>

<style scoped>
#talk {
  margin: 20px auto;
  width: 900px;
  height: 650px;
  overflow: hidden;
  border-radius: 10px;
  text-align: left;
}

.sidebar, .main, .toolbar {
  height: 100%;
}

.toolbar {
  float: left;
  color: #f4f4f4;
  background-color: #2e3238;
  width: 60px;
}

.sidebar {
  float: left;
  color: #000000;
  background-color: #ECEAE8;
  width: 240px;
}

.main {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}


</style>
