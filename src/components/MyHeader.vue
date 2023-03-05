<template>
  <div>

    <div style="float:right;" class="userInfoAvatar">
                <span v-show="nickname ==undefined || nickname == ''">
                    <el-button style="display: inline-block;" type="text" @click="userLogin">登录</el-button>
                    <el-button style="display: inline-block;" type="text" @click="userRegister">免费注册</el-button>
                </span>

    </div>

    <el-dropdown @command="handleCommand" class="userInfoAvatar" v-show="nickname !=undefined && nickname !=''">

      <el-avatar :size="50" fit="cover" :src="avatar" @error="errorHandler">
        <img :src="require('@assets/images/profile.jpg')"/>
      </el-avatar>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="goUserInfo">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>

    </el-dropdown>

    <!--        <LoginBox v-if="showLoginBox" @closeLoginBox="closeLoginBox"></LoginBox>-->

    <el-dialog
        title="欢迎登录"
        :visible.sync="showLoginBox"
        :width="dialogWidth"
        center>
      <el-divider></el-divider>

      <el-form :rules="loginRules" :model="loginForm" ref="loginForm">

        <div class="passwordLogin" v-if="loginType=='pwd'">
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model.trim="loginForm.userName" placeholder="请输入用户名" auto-complete="off"
                      :disabled="loginTypes.password"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="请输入密码">
            </el-input>
          </el-form-item>
        </div>

        <!--          <div v-if="loginType!='pwd'" style="text-align: center" class="block">-->
        <!--            <el-image :src="wechatOrCode" style="width: 250px;">-->
        <!--              <div slot="error" class="image-slot" @click="refreshWechatCode">-->
        <!--                <i class="el-icon-refresh"-->
        <!--                   style="height: 250px; line-height: 250px; cursor: pointer">点击刷新</i>-->
        <!--              </div>-->
        <!--            </el-image>-->
        <!--          </div>-->


        <el-row class="elRow">
          <el-tooltip content="码云" placement="bottom">
            <el-button type="danger" circle @click="goAuth('gitee')" :disabled="loginTypes.gitee">
              <span class="iconfont icon-gitee"></span>
            </el-button>
          </el-tooltip>

          <el-tooltip content="Github" placement="bottom">
            <el-button type="info" circle @click="goAuth('github')" :disabled="loginTypes.github">
              <span class="iconfont icon-github"></span>
            </el-button>
          </el-tooltip>

          <el-tooltip content="QQ" placement="bottom">
            <el-button type="primary" circle @click="goAuth('qq')" :disabled="loginTypes.qq">
              <span class="iconfont icon-qq"></span>
            </el-button>
          </el-tooltip>

          <el-tooltip content="微信" placement="bottom">
            <el-button type="success" circle @click="goAuth('wechat')" :disabled="loginTypes.wechat">
              <span class="iconfont icon-wxtb"></span>
            </el-button>
          </el-tooltip>

        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer" :disabled="loginTypes.password">
        <el-button type="primary" @click="startLogin">登 录</el-button>
        <el-button @click="closeLoginBox">取 消</el-button>
  </span>
    </el-dialog>


    <el-dialog
        title="欢迎注册"
        :visible.sync="showRegisterBox"
        :width="dialogWidth"
        center>
      <el-divider></el-divider>

      <el-form :rules="registerRules" :model="registerForm" ref="registerForm">

        <div class="passwordLogin" v-if="loginType=='pwd'">
          <el-form-item label="用户名" prop="userName">
            <el-input type="text" v-model.trim="registerForm.userName" placeholder="请输入用户名" auto-complete="off"
                      :disabled="loginTypes.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="registerForm.nickName" placeholder="昵称长度在1~20之间"
                      :disabled="loginTypes.password"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="registerForm.password" type="password" auto-complete="off" placeholder="请输入密码">
            </el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="registerForm.password2" type="password" auto-complete="off" placeholder="请输入确认密码">
            </el-input>
          </el-form-item>
        </div>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="startRegister()" :disabled="loginTypes.password">注 册</el-button>
        <el-button @click="closeRegister()">取 消</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

import {getUserLoginStatus, getWechatOrCodeTicket} from "@/api/login";
import {mapGetters} from "vuex";
import {getPath} from "@/utils/ruoyi";
//import LoginBox from "@/components/LoginBox";
import {Loading} from "element-ui";

export default {
  name: 'MyHeader',
  components: {
    //  LoginBox
  },
  data() {
    return {
      dialogWidth: 0,
      showLoginBox: false, //显示登录框
      showRegisterBox: false, //显示注册框
      loginType: "pwd", // 默认账号密码登录
      wechatOrCode: "", // 微信公众号登录二维码
      // 登录类别 false为开启
      loginTypes: {
        password: false,
        gitee: false,
        github: false,
        qq: false,
        wechat: true
      },
      drawer: false,
      loginForm: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, message: "用户名长度大于等于 5 个字符", trigger: "blur"},
          {max: 20, message: "用户名长度不能大于 20 个字符", trigger: "blur"}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 1, message: "用户名长度大于等于 1 个字符", trigger: "blur"},
          {max: 20, message: "用户名长度不能大于 20 个字符", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 5, message: "密码长度需要大于等于 5 个字符", trigger: "blur"},
          {max: 20, message: "密码长度不能大于 20 个字符", trigger: "blur"}
        ]
      },
      registerForm: {
        userName: "",
        nickName: "",
        password: "",
        password2: "",
        //email: ""
      },
      registerRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 5, message: "用户名长度大于等于 5 个字符", trigger: "blur"},
          {max: 20, message: "用户名长度不能大于 20 个字符", trigger: "blur"}
        ],
        nickName: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 5, message: "密码长度需要大于等于 5 个字符", trigger: "blur"},
          {max: 20, message: "密码长度不能大于 20 个字符", trigger: "blur"}
        ],
        password2: [
          {required: true, message: "请再次输入密码", trigger: "blur"},
          {min: 5, message: "密码长度需要大于等于 5 个字符", trigger: "blur"},
          {max: 20, message: "密码长度不能大于 20 个字符", trigger: "blur"}
        ]
        // email: [
        //   {required: true, message: "邮箱不能为空", trigger: "blur"},
        //   {pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: '请输入正确的邮箱'},
        // ]
      }
    }
  },
  created() {
    //初始化调用
    this.setDialogWidth()
  },
  mounted() {
    //监听窗口宽度
    window.onresize = () => {
      return (() => {
        this.setDialogWidth()
      })()
    }
  },
  computed: {
    ...mapGetters([
      //同名缩写
      "avatar",
      "nickname",
    ]),

  },
  methods: {
    setDialogWidth() {
      //console.log(document.body.clientWidth)
      var val = document.body.clientWidth
      const def = 800 //宽度最小为800,可修改
      //窗口宽度小于默认宽度时，将弹框看度设置为30%,可修改
      if (val > def) {
        this.dialogWidth = '30%'
      } else {
        //窗口宽度大于默认宽度1200时，将弹框设置为400宽度,可修改
        this.dialogWidth =  '300px'
      }
    },
    startLogin: function () {
      this.$refs.loginForm.validate((valid) => {
        console.log("开始校验", valid)
        if (!valid) {
          console.log('校验失败')
          return;
        } else {
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$store.dispatch("GetInfo").then(() => {
              this.closeLogin()
            })
          })

        }
      })
    },
    goAuth: function (source) {
      // 判断是否点击公众号登录
      if (source == "wechat") {
        console.log("点击公众号登录")
        this.refreshWechatCode()
        return
      }
      this.loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var params = new URLSearchParams();
      params.append("source", source);
      login(params).then(response => {
        if (response.code == 200) {
          var token = response.data.token;
          window.location.href = response.data.url
        }
      });
    },
    // 刷新微信二维码
    refreshWechatCode: function () {
      let that = this
      getWechatOrCodeTicket().then(response => {
        if (response.code == this.$ECode.SUCCESS) {
          console.log("得到的响应", response)
          this.showPasswordLogin = false
          let data = response.data
          let ticket = data.ticket
          this.wechatOrCode = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket
          this.ticket = ticket
          let count = 0
          let interval = setInterval(() => {
            count++
            // 当检查5次未扫码的时候，将二维码失效，重试关闭接口请求
            if (count > 5) {
              this.wechatOrCode = ""
              clearInterval(interval)
            }
            let params = new URLSearchParams()
            params.append("ticket", ticket)
            getUserLoginStatus(params).then(response => {
              console.log("获取用户状态", response)
              if (response.code == that.$ECode.SUCCESS) {
                let token = ticket
                // 判断url中是否含有token
                if (token != undefined) {
                  // 设置token七天过期
                  setCookie("token", token, 7)
                }
                this.setUserInfo(response.data)
                this.setLoginState(true);
                location.reload();
              }
            });
          }, 3000);

        } else {
          this.$message.error(response.message)
        }
      });
    },
    errorHandler() {
      return true
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示').then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = getPath('/index');
        })
      }).catch(() => {
      });
    },
    userLogin: function () {
      this.showRegisterBox = false
      this.showLoginBox = true
    },
    closeLoginBox: function () {
      this.showLoginBox = false
    },
    closeRegister() {
      this.showRegisterBox = false
    },
    startRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (!valid) {
          console.log('校验失败')
          return;
        } else {
          let passWord = this.registerForm.password;
          let passWord2 = this.registerForm.password2;
          if (passWord != passWord2) {
            this.$message({
              type: "success",
              message: "两次密码不一致"
            })
            return;
          }
          this.$message({
            type: "success",
            message: "准备注册"
          })
          // var params = {};
          // params.userName = this.registerForm.userName;
          // params.passWord = this.registerForm.password;
          // params.email = this.registerForm.email;
          // params.nickName = this.registerForm.nickName
          // localRegister(params).then(response => {
          //   if (response.code == this.$ECode.SUCCESS) {
          //     this.$message({
          //       type: "success",
          //       message: response.data
          //     })
          //     // 打开登录页面
          //     this.goLogin();
          //   } else {
          //     this.$message({
          //       type: "error",
          //       message: response.data
          //     })
          //   }
          // });
        }
      })
    },
    userRegister() {
      this.showLoginBox = false
      this.showRegisterBox = true
    },
    // 点击头像触发的动作
    handleCommand(command) {
      switch (command) {
        case "logout" : {
          this.logout();
        }
          ;
          break;
        case "login" : {
          this.userLogin();
        }
          ;
          break;
        case "goUserInfo" : {
          // 打开抽屉
          this.drawer = true;
          // // 获取评论列表
          // this.getCommentList();
          // // 获取点赞列表
          // this.getPraiseList()
          // // 获取反馈列表
          // this.getFeedback()
        }
          break;
      }
    },
  }
}
</script>

<style scoped>

.userInfoAvatar {
  position: absolute;
  right: 30px;
  top: 10px;
}

.custWidth {
  width: 30%;
  min-width: 600px;
}


</style>
