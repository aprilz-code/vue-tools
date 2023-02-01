<template>
    <el-container>
        <el-aside width="100px">
            <my-aside/>
        </el-aside>
        <el-main style="min-height: 300px;">
            聊天室加班中....
        </el-main>

    </el-container>

</template>

<script>
    import MyAside from "@/components/MyAside";

    export default {
        name: "Talk",
        components: {
            MyAside,
        },
        data() {
            return {
                data: {

                },

            }
        }
    }
</script>

<style scoped>

</style>
