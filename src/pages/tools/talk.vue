<template>
  <el-container>
    <el-container>
      <el-header>Header</el-header>
      <el-container class="container">
        <el-aside width="150px">
          <my-aside/>
        </el-aside>
        <el-main>
          <div id="app">
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
  }
}
</script>

<style scoped>
#app {
  margin: 20px auto;
  width: 900px;
  height: 650px;
  overflow: hidden;
  border-radius: 10px;

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

}
</style>
