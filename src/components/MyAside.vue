<template  >
        <el-menu
                :default-active="$route.path" router
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"  >
            <el-menu-item :index="menu.url" v-for="(menu,index) in menus" :key="index">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
            </el-menu-item>

        </el-menu>

</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: 'MyAside',
        props: {
            deviceType:  String
        },
        data() {
            return {
                menus: [
                    {
                        icon: 'el-icon-s-tools',
                        url: '/',
                        name: '工具',
                    },
                    {
                        icon: 'el-icon-news',
                        url: '/news',
                        name: '热讯',
                    }
                ]
            }
        },
        computed: {
            // 1.直接从根实例获取
            // device() {
            //     return this.$store.getters.device;
            // }

            //2.使用mapGetters取值 需要配上上方  import { mapGetters } from "vuex";
            // ...mapGetters({
            //     // 把 `this.device` 映射为 `this.$store.getters.device`
            //     device: "device"
            //
            // }),
            ...mapGetters([
                //同名缩写
                "device"
            ]),
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>
