<template>
  <div id="uesrtext">
    <div>
      <el-popover placement="top-start" width="400" trigger="click" class="emoBox">
        <div class="emotionList">
          <a href="javascript:void(0);" @click="getEmo(index)" v-for="(item,index) in faceList" :key="index"
             class="emotionItem">{{ item }}</a>
        </div>
        <el-button id="emojiBtn" class="emotionSelect" slot="reference">
          <i class="fa fa-smile-o" aria-hidden="true"></i>
        </el-button>
      </el-popover>
      <el-upload
          class="upload-btn"
          action="/ossFileUpload?module=group-chat"
          :before-upload="beforeAvatarUpload"
          :on-success="imgSuccess"
          :on-error="imgError"
          :show-file-list="false"
          accept=".jpg,.jpeg,.png,.JPG,JPEG,.PNG,.gif,.GIF"
      >
        <el-button id="uploadImgBtn" icon="el-icon-picture-outline"></el-button>
      </el-upload>
    </div>
    <textarea id="textarea" placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage">
    </textarea>
    <el-button id="sendBtn" type="primary" size="mini" @click="addMessageByClick">发送(S)</el-button>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {getAccessToken} from "@/utils/auth";

const appData = require("@assets/json/emoji.json")//引入存放emoji表情的json文件

export default {
  name: 'UserText',
  data() {
    return {
      faceList: [],//表情包数据
      content: ''
    }
  },
  mounted() {
    for (let i in appData) {//读取json文件保存数据给数组
      this.faceList.push(appData[i].char);
    }
  },
  computed: {
    ...mapState({
      sessions: state => state.chat.sessions,
      currentSession: state => state.chat.currentSession,
    })
  },
  methods: {
    addMessageByClick() {
      if (!this.content || this.content.match(/^[ ]*$/)) {
        this.$message({
          showClose: true,
          message: '不能发送空白信息'
        });
        return;
      }
      let msgObj = new Object();
      msgObj.content = this.content;
      //TODO
      msgObj.groupId = 1;
      msgObj.messageType = 'text';
      //发送群聊消息
      if (this.currentSession.nickname == "群聊") {
        console.log(this.content);
        this.$store.state.chat.stomp.send("/ws/groupChat", {Authorization: getAccessToken()}, JSON.stringify(msgObj));
      }
      //给机器人发送消息
      if (this.currentSession.nickname == "机器人") {
        msgObj.fromNickname = this.$store.state.user.nickname;
        msgObj.to = '机器人';
        this.$store.state.chat.stomp.send("/ws/robotChat", {}, JSON.stringify(msgObj));
        //保存该条记录到session
        this.$store.commit('addMessage', msgObj);
      } else {
        //发送私聊消息
        msgObj.fromId = this.$store.state.chat.id;
        msgObj.fromName = this.$store.state.user.nickname;
        msgObj.fromProfile = this.$store.state.user.avatar;
        msgObj.toName = this.currentSession.nickname;
        msgObj.toId = this.currentSession.id;
        msgObj.privateChatId = msgObj.fromId + "#" + msgObj.toId;
        this.$store.state.chat.stomp.send("/ws/privateChat", {Authorization: getAccessToken()}, JSON.stringify(msgObj));
        //提交私聊消息记录
        this.$store.commit('addMessage', msgObj);
      }
      //清空输入框
      this.content = '';
    },
    addMessage(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.addMessageByClick();
      }
    },
    /**
     *       图片上传的方法
     */
    //上传前
    beforeAvatarUpload(file) {
      //不给机器人发送图片
      if (this.currentSession.nickname == "机器人") {
        this.$message.error("瓦力拒绝接收你的图片！")
      }
      //判断图片大小
      let isLt1M = file.size / 1024 / 1024 < 1;
      console.log(file)
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      //判断图片的格式
      let imgType = file.name.substring(file.name.lastIndexOf(".") + 1);
      imgType = imgType.toLowerCase();
      let isImg = imgType === 'jpg' || imgType === 'png' || imgType === 'jpeg' || imgType === 'gif';
      if (!isImg) {
        this.$message.error('上传图片格式不符合要求！');
      }
      return isLt1M && isImg;
    },
    // 图片上传成功
    imgSuccess(response, file, fileList) {
      console.log("图片url为：" + response);
      let msgObj = new Object();
      msgObj.content = response;
      //设置消息类型为图片
      msgObj.messageType = 'img'
      if (this.currentSession.nickname == "群聊") {
        this.$store.state.chat.stomp.send("/ws/groupChat", {Authorization: getAccessToken()}, JSON.stringify(msgObj));
      } else {
        msgObj.fromId = this.$store.state.user.id;
        msgObj.fromName = this.$store.state.user.nickname;
        msgObj.toId = this.currentSession.nickname;
        this.$store.state.chat.stomp.send("/ws/privateChat", {Authorization: getAccessToken()}, JSON.stringify(msgObj));
        //提交私聊消息记录
        this.$store.commit('addMessage', msgObj);
      }
    },
    // 图片上传失败
    imgError(err, file, fileList) {
      this.$message.error("上传失败");
    },
    //获取Emoji
    getEmo(index) {
      var textArea = document.getElementById('textarea');

      //将选中的表情插入到输入文本的光标之后
      function changeSelectedText(obj, str) {
        if (window.getSelection) {
          // 非IE浏览器
          textArea.setRangeText(str);
          // 在未选中文本的情况下，重新设置光标位置
          textArea.selectionStart += str.length;
          textArea.focus()
        } else if (document.selection) {
          // IE浏览器
          obj.focus();
          var sel = document.selection.createRange();
          sel.text = str;
        }
      }

      changeSelectedText(textArea, this.faceList[index]);
      this.content = textArea.value;// 要同步data中的数据
      // console.log(this.faceList[index]);
      return;

    },
  }
}
</script>


<style lang="scss">
/* el-popover是和app同级的，所以scoped的局部属性设置无效 */
/* 需要设置全局style */
.el-popover {
  height: 200px;
  width: 450px;
  overflow: scroll;
  overflow-x: auto;
}
</style>

<style lang="scss" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  text-align: left;
  border: solid 1px #DDD;
  background-color: white;

  > textarea {
    padding: 10px;
    width: 95%;
    height: 58%;
    border: none;
    outline: none;
    resize: none; //禁止拉伸
  }

  #sendBtn {
    float: right;
    margin-right: 10px;
  }

  #uploadImgBtn {
    border: none;
    padding-bottom: 0px;
    margin-bottom: 0px;
    padding-left: 12px;
  }

  #uploadImgBtn:hover {
    background-color: white;
  }

  #emojiBtn {
    border: none;
    padding-right: 0px;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }

  #emojiBtn:hover {
    background-color: white;
  }

  .upload-btn {
    display: inline-block;
  }
}

.emotionList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
}

.emotionItem {
  width: 10%;
  font-size: 20px;
  text-align: center;
}

/*包含以下四种的链接*/
.emotionItem {
  text-decoration: none;
}

/*正常的未被访问过的链接*/
.emotionItem:link {
  text-decoration: none;
}

/*已经访问过的链接*/
.emotionItem:visited {
  text-decoration: none;
}

/*鼠标划过(停留)的链接*/
.emotionItem:hover {
  text-decoration: none;
}

/* 正在点击的链接*/
.emotionItem:active {
  text-decoration: none;
}
</style>
