<template>
    <el-container>
        <el-container >
            <el-header>Header</el-header>
            <el-container class="container">
                <el-aside width="150px">
                    <my-aside/>
                </el-aside>
                <el-main>
                    聊天室加班中....
                </el-main>
            </el-container>
        </el-container>

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
