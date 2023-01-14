<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: 'App',
        components: {},
        created() {
            this.$nextTick(() => {
                // 1.禁用右键菜单
                document.oncontextmenu = new Function("event.returnValue=false");
                // 2.禁用鼠标选中
                document.onselectstart = new Function("event.returnValue=false");
                // 3.禁止键盘F12键
                // document.addEventListener("keydown", function (e) {
                //     if (e.key == "F12") {
                //         e.preventDefault(); // 如果按下键F12,阻止事件
                //     }
                // });
            });
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
        margin-top: 60px;
    }
</style>
