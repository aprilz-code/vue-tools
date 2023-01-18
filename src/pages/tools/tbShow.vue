<template>
    <el-container>
        <el-main class="p">
            <el-row :gutter="10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div style="">
                        <div class="desc" >
                            <img :src="picUrl" :alt="title"  >
                        </div>
                        <div class="desc title">{{title}}</div>
                    </div>
                    <div style="margin:0 auto;width:80%;">
                        <div class="desc"><el-button type="warning" icon="el-icon-picture" @click="getData">下一张</el-button></div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import {getTbShow} from '@/api/tools'

    export default {
        name: "TBShow",
        data(){
            return{
                title:'',
                picUrl:''
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData(){
                getTbShow().then(res=> {
                    if(!res && res.status !== 200){
                        this.$message.error(JSON.stringify(res))
                    }
                    this.title= res.data.title
                    this.picUrl= res.data.pic

                })
            }
        }

    }
</script>

<style scoped>
    .p{
        background-color: black;
        background-size:cover;
        width: 100%;
    }
    .desc{
        text-align: center;
        margin-top: 1vh;
    }
    .desc.title{
        color: #FFF;
        margin-top: 1em;
        margin-bottom: 8px;
        font-weight: 700;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    img{
        text-align: center;
        overflow:hidden;
        max-width:100%;
        max-height: 800px;
        box-shadow: 4px 4px 4px rgba(177, 174, 172, 0.6);
        border-radius: 4px;
    }
    button{
        color: #000;
        margin-top: 6px;
        background-color: #F90;
        font-size: 17px;
        font-family:'Times New Roman', Times, serif
    }
</style>
