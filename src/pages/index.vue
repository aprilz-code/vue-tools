<template>
    <el-container >
        <el-header>
            <my-header/>
        </el-header>
        <el-container class="container">
            <el-aside width="150px">
                <my-aside/>
            </el-aside>
            <el-main>
                <avue-data-imgtext :option="option"></avue-data-imgtext>
            </el-main>
        </el-container>

    </el-container>

</template>

<script>
    import MyAside from "@/components/MyAside";
    import MyHeader from "@/components/MyHeader";
    export default {
        name: 'Index',
        components:{
            MyAside,
            MyHeader
        },
        data() {
            return {
                option: {
                    span:6,
                    data: [
                        {
                            click: function (item) {
                            },
                            title: '京东挂机',
                            imgsrc: 'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                            headimg: [
                                // {
                                //     src:'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                                //     name:'张三'
                                // },

                            ],
                            content: '自动做任务以及兑换奖品，试用。。。',
                            href:'https://nps.losey.top',
                            target:'_blank',
                            time:'2023-01-17'
                        },
                        {
                            click: function (item) {
                            },
                            title: '小米运动',
                            imgsrc: 'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                            headimg: [],
                            content: '实时修改支付宝，微信，qq等运动步数',
                            //href:'https://mi.losey.top',
                            href:'/tools/mi',
                            target:'_blank',
                            time:'2023-01-17'
                        },
                        {
                            click: function (item) {
                            },
                            title: '淘宝买家秀',
                            imgsrc: 'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                            headimg: [],
                            content: '淘宝买家秀',
                            href:'/tools/tbShow',
                            target:'_blank',
                            time:'2023-01-17'
                        },
                        {
                            click: function (item) {
                            },
                            title: 'jd口令解析',
                            imgsrc: 'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                            headimg: [],
                            content: 'jd 口令解析以及链接生成口令',
                            href:'/tools/jdTool',
                            target:'_blank',
                            time:'2023-01-18'
                        },
                        // {
                        //     click: function (item) {
                        //     },
                        //     title: '桐人',
                        //     imgsrc: 'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                        //     headimg: [],
                        //     content: 'xxxxxxxx',
                        //     href:'https://avuejs.com',
                        //     target:'_blank',
                        //     time:'一小时前'
                        // },
                        // {
                        //     click: function (item) {
                        //     },
                        //     title: '桐人',
                        //     imgsrc: 'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                        //     headimg: [],
                        //     content: 'xxxxxxxx',
                        //     href:'https://avuejs.com',
                        //     target:'_blank',
                        //     time:'一小时前'
                        // },
                        // {
                        //     click: function (item) {
                        //     },
                        //     title: '桐人',
                        //     imgsrc: 'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                        //     headimg: [],
                        //     content: 'xxxxxxxx',
                        //     href:'https://avuejs.com',
                        //     target:'_blank',
                        //     time:'一小时前'
                        // },
                        // {
                        //     click: function (item) {
                        //     },
                        //     title: '桐人',
                        //     imgsrc: 'https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc&r=' + Math.floor((Math.random()*1000)+1),
                        //     headimg: [],
                        //     content: 'xxxxxxxx',
                        //     href:'https://avuejs.com',
                        //     target:'_blank',
                        //     time:'一小时前'
                        // },
                    ]
                }
            }
        },
        beforeCreate() {
            // let deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
            // // 绑定设备型号
            // this.deviceType = deviceType;
            //查询内核，准备做自适应 放到vuex
            //console.log(deviceType + '--' + navigator.userAgent.toLocaleLowerCase())
        },

    }
</script>

<style scoped>

</style>
