<template>
    <el-container>

        <el-main class="el-main">
            <div class="el-card " style="">
                <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
                    <el-tab-pane label="口令生成" name="jx">
                        <span slot="label"><i class="el-icon-date"></i> 口令解析</span>
                    </el-tab-pane>
                    <el-tab-pane label="口令生成" name="sc">
                        <span slot="label"><i class="el-icon-date"></i> 口令生成</span>
                    </el-tab-pane>
                </el-tabs>

                <el-form ref="jxForm" :model="jxForm" v-if="activeName =='jx'" label-width="auto"
                         :rules="activeName =='jx' ? jxRules : {}">
                    <el-form-item label="口令" prop="code">
                        <el-input v-model="jxForm.code" placeholder="请输入口令"/>
                    </el-form-item>

                </el-form>

                <el-form ref="scForm" :model="scForm" v-if="activeName =='sc'" label-width="auto"
                         :rules="activeName =='sc' ? scRules : {}">
                    <el-form-item label="活动地址" prop="url">
                        <el-input v-model="scForm.url" placeholder="例如https://xxx.com"/>
                    </el-form-item>
                    <el-form-item label="活动标题" prop="title">
                        <el-input v-model="scForm.title" placeholder="请输入活动标题"/>
                    </el-form-item>
                    <el-form-item label="活动图片" prop="img" placeholder="活动图片(选填)">
                        <el-input v-model="scForm.img"/>
                    </el-form-item>
                </el-form>

                <div>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="resetForm()">取消</el-button>
                </div>
            </div>

            <div v-show="resultDis">
                <h3>{{ result.title }}</h3>
                <h4>分享人:{{ result.userName }}
                    <avue-avatar :src="result.headImg"></avue-avatar>
                </h4>
                <p>
                    跳转链接: <a :href="result.jumpUrl" target="_blank">{{ result.jumpUrl }}</a>
                </p>

                <el-button class="copy_btn" :data-clipboard-text="result.jumpUrl" @click="handleCopy">复制链接</el-button>
                <el-button @click="resetForm()">关闭</el-button>
            </div>

            <div v-show="resultSCDis">
                <h4>{{ resultSC.code }}</h4>
                <el-button class="copy_code" :data-clipboard-text="resultSC.code" @click="handleSCCopy">复制口令</el-button>
                <el-button @click="resetForm()">关闭</el-button>
            </div>


        </el-main>
    </el-container>
</template>

<script>
    import {jx, sc} from '@/api/tools'

    export default {
        name: "JdTool",
        data() {
            return {
                activeName: 'jx',
                result: {
                    img: '',
                    headImg: '',
                    title: '',
                    userName: '',
                    jumpUrl: ''
                },
                resultSC: {
                    code: ''
                },
                jxForm: {
                    code: ''
                },
                scForm: {
                    img: '',
                    title: '',
                    url: ''
                },
                resultDis: false,
                resultSCDis: false,
                jxRules: {
                    code: [
                        {
                            required: true,
                            message: '请输入解析口令',
                            trigger: 'blur'
                        }
                    ]
                },
                scRules: {
                    url: [
                        {
                            required: true,
                            message: '请输入活动地址',
                            trigger: 'blur'
                        }
                    ],
                    title: [
                        {
                            required: true,
                            message: '请输入活动标题',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        created() {

        },
        methods: {
            handleClick(tab, event) {
                //his.$nextTick()方法主要是用在随数据改变而改变的dom应用场景中, vue中数据和dom渲染由于是异步的,
                // 所以,要让dom结构随数据改变这样的操作都应该放进this.$nextTick()的回调函数中

                this.$nextTick(() => {
                    this.resetForm()
                    // if (this.$refs.jxForm) {
                    //     this.$refs.jxForm.clearValidate();
                    //
                    // }
                    // if (this.$refs.scForm) {
                    //     this.$refs.scForm.clearValidate();
                    //
                    // }
                });
                //console.log(tab, event);
            },
            getData() {
                // getTbShow().then(res => {
                //     // if(!res && res.status !== 200){
                //     //     this.$message.error(JSON.stringify(res))
                //     // }
                //     // this.title= res.data.title
                //     // this.picUrl= res.data.pic
                //
                // })
            },
            resetForm() {
                if (this.$refs.jxForm) {
                    this.$refs.jxForm.resetFields();

                }
                if (this.$refs.scForm) {
                    this.$refs.scForm.resetFields();

                }
                this.result = {
                    img: '',
                    headImg: '',
                    title: '',
                    userName: '',
                    jumpUrl: ''
                }
                this.resultSC = {
                    code: ''
                }
                this.resultDis = false
                this.resultSCDis = false

            },
            handleCopy() {
                let clipboard = new this.$clipboard('.copy_btn')
                clipboard.on('success', (e) => {
                    this.$message.success('复制成功')
                    clipboard.destroy() // 释放内存
                })
                clipboard.on('error', (e) => {
                    this.$message.error('不支持复制')
                    clipboard.destroy() // 释放内存
                })
            },
            handleSCCopy() {
                let clipboard = new this.$clipboard('.copy_code')
                clipboard.on('success', (e) => {
                    this.$message.success('复制成功')
                    clipboard.destroy() // 释放内存
                })
                clipboard.on('error', (e) => {
                    this.$message.error('不支持复制')
                    clipboard.destroy() // 释放内存
                })
            },
            onSubmit() {
                if (this.activeName == 'jx') {
                    this.$refs['jxForm'].validate((valid) => {
                        if (valid) {
                            jx(this.jxForm).then(response => {
                                if (response.code === 0) {
                                    this.$refs.jxForm.resetFields()
                                    this.result = response.data
                                    this.resultDis = true
                                } else {
                                    this.$notify.error({
                                        title: '错误',
                                        message: response.msg,
                                        type: 'success',
                                        offset: 100
                                    })
                                }
                            }).catch((err) => {
                                this.$notify.error({
                                    title: '错误',
                                    message: err.msg,
                                    type: 'success',
                                    offset: 100
                                })
                            });
                        } else {
                            //console.log("error submit!!");
                            return false
                        }
                    })
                } else {
                    this.$refs['scForm'].validate((valid) => {
                        if (valid) {
                            sc(this.scForm).then(response => {
                                if (response.code === 0) {
                                    this.$refs.scForm.resetFields()
                                    this.resultSC.code = response.data
                                    this.resultSCDis = true
                                } else {
                                    this.$notify.error({
                                        title: '错误',
                                        message: response.msg,
                                        type: 'success',
                                        offset: 100
                                    })
                                }
                            }).catch((err) => {
                                this.$notify.error({
                                    title: '错误',
                                    message: err.msg,
                                    type: 'success',
                                    offset: 100
                                })
                            });
                        } else {
                            //console.log("error submit!!");
                            return false
                        }
                    })
                }

            }
        }

    }
</script>

<style scoped>
    .el-main {
        max-width: 510px;
        box-sizing: border-box;
        margin: auto;
        word-break: break-all; /*文本自动换行*/
    }

    .el-card {

        border-radius: 4px;
        padding: 10px;
        border: 1px solid #ebeef5;
        background-color: #fff;
    }


</style>
