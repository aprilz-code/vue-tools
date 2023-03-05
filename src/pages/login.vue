<template>
  <el-container>
    <el-main>
      <div class="loginContainer">
        <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="80px">
          <h3 class="loginTitle">LOGIN</h3>
          <el-form-item label="用户名:" prop="mobile">
            <el-input type="text" v-model="loginForm.mobile" auto-complete="off" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
          </el-form-item>
<!--          <el-form-item label="验证码:" prop="code">-->
<!--            <el-input type="text" @keydown.enter.native="submitLogin" v-model="loginForm.code" auto-complete="off"-->
<!--                      placeholder="请输入验证码" style="width:150px;"></el-input>-->
<!--            <img :src="verifyCode" title="点击切换验证码" @click="changeverifyCode"/>-->
<!--          </el-form-item>-->
<!--          <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>-->
<!--          <span> 记住我一周</span>-->
          <div>
            <el-button @click="showRegistryDialog" style="width:45% ;margin-right: 15px">注册</el-button>
            <el-button type="primary" style="width:45% ;" @click="handleLogin"
                       v-loading.fullscreen.lock="fullscreenLoading">登录
            </el-button>
          </div>
        </el-form>
      </div>
    </el-main>
    <el-dialog title="新用户注册" :before-close="closeRegisterDialog" :visible.sync="registerDialogVisible" width="30%">
      <el-form :model="registerForm" status-icon :rules="registerRules" ref="registerForm">
        <el-form-item label="用户昵称：" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model=" registerForm.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录用户名：" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="registerForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码：" :label-width="formLabelWidth" prop="password">
          <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" :label-width="formLabelWidth" prop="checkPass">
          <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="用户头像：" :label-width="formLabelWidth">-->
<!--          <el-upload-->
<!--              action="/ossFileUpload?module=group-chat"-->
<!--              ref="upload"-->
<!--              list-type="picture-card"-->
<!--              :class="{disabled:uploadDisabled}"-->
<!--              :before-upload="beforeAvatarUpload"-->
<!--              :file-list="fileList"-->
<!--              :on-progress="onProgress"-->
<!--              :on-success="imgSuccess"-->
<!--              :on-error="imgError"-->
<!--              :on-remove="imgRemove"-->
<!--          >-->
<!--            <i class="el-icon-plus"></i>-->
<!--            <div slot="tip" class="el-upload__tip">只能上传不超过4MB的图片(可使用默认头像！)</div>-->
<!--          </el-upload>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitRegisterForm('registerForm') " style="width: 100%">注册</el-button>
      </div>
    </el-dialog>
  </el-container>


</template>

<script>

export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        loginType: "",
        password: "",
        captchaVerification: "",
        mobile: "",
        mobileCode: "",
        rememberMe: false,
      },
      rules: {
        mobile:[{required:true,message:'请输入手机号',trigger:'blur'}],
        password:[{required:true,message: '请输入密码',trigger:'blur'}],
   //    code:[{required:true,message: '请输入验证码',trigger:'blur'}]
      },
      fullscreenLoading:false,
      //注册表单相关
      registerDialogVisible:false,
      formLabelWidth: '120px',
      registerForm:{
        nickname:'',
        username:'',
        password:'',
        checkPass:'',
        userProfile:'default_head.jpg',
      },
      registerRules: {
        nickname: [
          { required:true,message:'请输入昵称', trigger: 'blur' }
        ],
        mobile: [
          { required:true,message:'请输入手机号',  trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      //需要重定向的位置
      redirect: undefined
    }
  },
  created() {
    // 重定向地址 解密url
    this.redirect = this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : undefined;
  },
  methods: {
    handleLogin() {
      // 发起登陆
      // console.log("发起登录", this.loginForm);
      this.$store.dispatch(this.loginForm.loginType === "sms" ? "SmsLogin" : "Login", this.loginForm).then(() => {
        this.$router.push({path: this.redirect || "/"}).catch(() => {
        });
      }).catch(() => {
      });
    },
    showRegistryDialog(){
      this.registerDialogVisible=true;
    },
    closeRegisterDialog(){
      this.$refs["registerForm"].resetFields();
      this.registerDialogVisible=false;
    },
    //提交注册操作
    submitRegisterForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.postRequest("/user/register",this.registerForm).then(resp=>{
          //   if (resp){
          //     this.registerDialogVisible=false;
          //     location.reload();//刷新页面，清空注册界面的上传组件中的图片
          //   }
          // })
        } else {
          this.$message.error("请正确填写信息！");
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>
