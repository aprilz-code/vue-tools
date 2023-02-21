<template  >
    <div>
        <div style="float:right;"  class="userInfoAvatar">
                <span  v-show="nickname ==undefined || nickname == ''">
                    <el-button type="text" @click="userLogin">登录</el-button>
                    <el-button type="text" @click="userRegister">免费注册</el-button>
                </span>

        </div>

        <el-dropdown @command="handleCommand" class="userInfoAvatar" v-show="nickname !=undefined && nickname !=''">

           <el-avatar :size="50" fit="cover" :src="avatar" @error="errorHandler">
                <img :src="require('@assets/images/profile.jpg')"/>
            </el-avatar>
            <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="goUserInfo" >个人中心</el-dropdown-item>
                <el-dropdown-item command="logout" >退出登录</el-dropdown-item>
            </el-dropdown-menu>

        </el-dropdown>

<!--        <LoginBox v-if="showLoginBox" @closeLoginBox="closeLoginBox"></LoginBox>-->

      <el-dialog
          title="欢迎登录"
          :visible.sync="showLoginBox"
          width="30%"
          center>
        <el-divider></el-divider>

        <el-form :label-position="labelPosition" :rules="loginRules" :model="loginForm" ref="loginForm">

          <div class="passwordLogin" v-if="loginType=='pwd'">
            <el-form-item label="用户名" prop="userName">
              <el-input type="text"  v-model.trim="loginForm.userName" placeholder="请输入用户名" auto-complete="off" :disabled="loginType.password"></el-input>
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
                <span class="iconfont">&#xe602;</span>
              </el-button>
            </el-tooltip>

            <el-tooltip content="Github" placement="bottom">
              <el-button type="info" circle @click="goAuth('github')" :disabled="loginTypes.github">
                <span class="iconfont">&#xe64a;</span>
              </el-button>
            </el-tooltip>

            <el-tooltip content="QQ" placement="bottom">
              <el-button type="primary" circle @click="goAuth('qq')" :disabled="loginTypes.qq">
                <span class="iconfont">&#xe601;</span>
              </el-button>
            </el-tooltip>

            <el-tooltip content="微信" placement="bottom">
              <el-button type="success" circle @click="goAuth('wechat')" :disabled="loginTypes.wechat">
                <span class="iconfont">&#xe66f;</span>
              </el-button>
            </el-tooltip>

          </el-row>
          <div class="loginTip">目前登录方式支持
            <span v-if="!loginType.password"> 账号密码 </span>
            <span v-if="!loginType.gitee"> 码云 </span>
            <span v-if="!loginType.github"> Github </span>
            <span v-if="!loginType.qq"> QQ </span>
            <span v-if="!loginType.wechat"> 微信 </span>
          </div>
        </el-form>

        <span slot="footer" class="dialog-footer">
    <el-button @click="closeLoginBox">取 消</el-button>
    <el-button type="primary" @click="startLogin">确 定</el-button>
  </span>
      </el-dialog>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import {getPath} from "@/utils/ruoyi";
    import LoginBox from "@/components/LoginBox";
    import {Loading} from "element-ui";

    export default {
        name: 'MyHeader',
        components:{
            LoginBox
        },
        data() {
            return {
                showLoginBox: false, //显示登录框
                showRegisterBox: false, //显示登录框
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
                // mobile: [
                //     {required: true, message: '请输入手机号', trigger: 'blur'},
                // ],
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
          startLogin: function () {
            this.$refs.loginForm.validate((valid) => {
              console.log("开始校验", valid)
              if (!valid) {
                console.log('校验失败')
                return;
              } else {
                this.$store.dispatch( "Login", this.loginForm).then(() => {
                  this.$store.dispatch( "GetInfo").then(() => {
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
              if (response.code == this.$ECode.SUCCESS) {
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
            errorHandler(){
                return true
            },
            async logout() {
                this.$confirm('确定注销并退出系统吗？', '提示').then(() => {
                    this.$store.dispatch('LogOut').then(() => {
                        location.href = getPath('/index');
                    })
                }).catch(() => {});
            },
            userLogin: function () {
                this.showLoginBox = true;
            },
            closeLoginBox: function () {
                this.showLoginBox = false;
            },
          userRegister(){
            this.showRegisterBox = true;
          },
            // 点击头像触发的动作
            handleCommand(command) {
                switch (command) {
                    case "logout" : {
                        this.logout();
                    };break;
                    case "login" : {
                        this.userLogin();
                    };break;
                    case "goUserInfo" : {
                        // 打开抽屉
                        this.drawer = true;
                        // // 获取评论列表
                        // this.getCommentList();
                        // // 获取点赞列表
                        // this.getPraiseList()
                        // // 获取反馈列表
                        // this.getFeedback()
                    } break;
                }
            },
        }
    }
</script>

<style scoped>

    .userInfoAvatar {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 30px;
        top: 10px;
    }


</style>
