<template>
    <div id="app">
<!--        <avue-affix>-->
<!--            固定在最顶部-->
<!--        </avue-affix>-->
            <router-view/>

    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        mounted() {
            var that = this;
            window.addEventListener("resize", that.handleSize);
            that.handleSize();
        },
        methods: {
            handleSize() {
                if (this._isMobile()) {
                    this.$store.dispatch('app/toggleDevice', 'Mobile')
                } else {
                    this.$store.dispatch('app/toggleDevice', 'Desktop')
                }
            },
            _isMobile() {
                let flag = navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                );
                return flag;
            },
        },
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
    }

    html,body {
        margin: 0;
        height: 100%;
    }

    .el-menu{
        height:100%
    }

    .container{
        height: 100%;
        min-height: 500px;
    }


</style>
