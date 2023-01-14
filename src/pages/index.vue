<template>
    <div>

        <br/>
        <router-link to="/needAuth">to needAuth</router-link>

    </div>

</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                deviceType: 'Desktop'
            }
        },
        created() {
            let deviceType = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|SymbianOS/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
            // 绑定设备型号
            this.deviceType = deviceType;
            //查询内核，准备做自适应
            //console.log(deviceType + '--' + navigator.userAgent.toLocaleLowerCase())
        },
    }
</script>

<style scoped>

</style>
