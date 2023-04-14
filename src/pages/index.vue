<template>

    <el-container >
        <el-header>
            <my-header/>
        </el-header>
        <el-container class="container">
            <el-aside  width="150px">
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
    export default {
        name: 'Index',
        components:{
            MyAside
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
                            imgsrc: 'https://s1.locimg.com/2023/03/10/1e1161ea37fd4.jpg',
                            headimg: [
                                // {
                                //     src:'https://s1.locimg.com/2023/03/10/7df9c650583ca.png,
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
                            imgsrc: 'https://s1.locimg.com/2023/03/10/2f9c16c0b88ae.jpg',
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
                            imgsrc: 'https://s1.locimg.com/2023/03/10/b71bf374e06e4.jpg',
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
                            imgsrc: 'https://s1.locimg.com/2023/03/10/5bbbb2c573e6e.jpg',
                            headimg: [],
                            content: 'jd 口令解析以及链接生成口令',
                            href:'/tools/jdTool',
                            target:'_blank',
                            time:'2023-01-18'
                        },
                        {
                            click: function (item) {
                            },
                            title: '聊天室',
                            imgsrc: 'https://s1.locimg.com/2023/03/10/7df9c650583ca.png',
                            headimg: [],
                            content: '聊天室',
                            href:'/tools/talk',
                           // target:'_blank',
                            time:'2023-04-10'
                        },
                        // {
                        //     click: function (item) {
                        //     },
                        //     title: '桐人',
                        //     imgsrc: 'https://s1.locimg.com/2023/03/10/7df9c650583ca.png,
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
                        //     imgsrc: 'https://s1.locimg.com/2023/03/10/7df9c650583ca.png,
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
                        //     imgsrc: 'https://s1.locimg.com/2023/03/10/7df9c650583ca.png,
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
