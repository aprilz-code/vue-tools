<template  >

    <el-dropdown @command="handleCommand" class="userInfoAvatar">
        <div style="float:right;">
            <el-avatar :size="50" :fit="cover" :src="avatar" @error="errorHandler">
                <img :src="require('@assets/images/profile.jpg')"/>
            </el-avatar>
        </div>


        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="login" v-show="token ==undefined">登录</el-dropdown-item>
            <el-dropdown-item command="goUserInfo" v-show="token !=undefined">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout" v-show="token !=undefined ">退出登录</el-dropdown-item>
        </el-dropdown-menu>

    </el-dropdown>


<!--    <LoginBox v-if="showLogin" @closeLoginBox="closeLoginBox"></LoginBox>-->

</template>

<script>
    import { mapGetters } from "vuex";
    import {getPath} from "@/utils/ruoyi";

    export default {
        name: 'MyHeader',
        data() {
            return {
                showLogin: false, //显示登录框
                drawer: false
            }
        },

        computed: {
            ...mapGetters([
                //同名缩写
                "avatar",
                "nickname",
                'token'

            ]),
        },
        methods: {
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
                this.showLogin = true;
            },
            closeLoginBox: function () {
                this.showLogin = false;
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
