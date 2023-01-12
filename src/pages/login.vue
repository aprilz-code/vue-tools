<template>
    <div>
        <el-form>
            <el-form-item prop="mobile">
                <el-input v-model="loginForm.mobile" type="text" auto-complete="off" placeholder="手机号">
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码">
                </el-input>
            </el-form-item>

            <!-- 下方的登录按钮 -->
            <el-form-item style="width:100%;">
                <el-button  size="medium" type="primary" style="width:100%;" @click="handleLogin">
                    <span>登 录</span>
                </el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<script>
    import {login} from "@/api/login";

    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    password: "",
                    captchaVerification: "",
                    mobile: "",
                    mobileCode: "",
                    rememberMe: false,
                },
            }
        },
        methods: {
            handleLogin() {
                // 发起登陆
                // console.log("发起登录", this.loginForm);
                login(this.loginForm).then(() => {
                    this.$router.push({path: this.redirect || "/"}).catch(() => {
                    });
                }).catch(() => {
                });
            },
        }
    }
</script>

<style scoped>

</style>
