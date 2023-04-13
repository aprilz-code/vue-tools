<template>
  <div>
    <div class="pagebg mi"></div>
    <div class="container">
      <h2 style="text-align: center">Apirlz小米运动步数修改</h2>
      <el-button style="display:block;margin:0 auto" type="text" @click="dialogVisible = true">常见问题</el-button>

      <el-form class="form" ref="form" :model="form"  style="width: 80%;margin: 20px auto;"
               :rules="rules" :show-message="true">

        <el-row>
          <el-col :span="24">
            <el-form-item label="运行方式">
              <el-switch
                  v-model="form.model"
                  active-color="#13ce66"
                  active-text="自动模式"
                  :disabled="zdClose"
                  inactive-color="#ff4949" inactive-text="手动模式"
                  @change="changeModel($event)">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row>
          <el-col :span="24">
            <el-form-item label="手机号/邮箱" prop="uin">
              <el-input v-model="form.uin" placeholder="请输入手机号或邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="form.pwd" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row v-show="!zdShow" :gutter="10">
          <el-col :md="{span:12}" :sm="{span:16}" :xs="{span:24}">
            <el-form-item :rules="!form.model? rules.minStep : []" label="最小步数" prop="minStep">
              <el-input-number v-model="form.minStep" :min="1" :step="1" size="small"
                               step-strictly @blur="checknum('minStep')"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :md="{span:12}" :sm="{span:16}" :xs="{span:24}">
            <el-form-item :rules="!form.model? rules.maxStep : []" label="最大步数" prop="maxStep">
              <el-input-number v-model="form.maxStep" :min="1" :step="1" size="small"
                               step-strictly @blur="checknum('maxStep')"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>


        <!--自动打卡内容-->
        <div v-show="zdShow" class="zdDiv">
          <el-row :gutter="10">
            <el-col :md="{span:12}" :sm="{span:16}" :xs="{span:24}">
              <el-form-item :rules="form.model? rules.cardNo : []" label="卡密" prop="cardNo">
                <el-input v-model="form.cardNo" placeholder="请输入卡密" @blur="checkCardNo($event)"/>
              </el-form-item>
            </el-col>

            <el-button class="addZd" size="mini" type="primary" @click="addZd()">新增计划</el-button>

          </el-row>


          <div v-for="(item, index) in form.zdList" :key="index" class="zdStep">
            <el-button class="delButton" round size="small" type="danger" @click.prevent="removeZd(item)">删除行
            </el-button>

            <el-row :gutter="20" style="padding-top: 40px">
              <el-col :md="{span:12}" :sm="{span:16}" :xs="{span:24}">
                <el-form-item
                    :prop="`zdList.${index}.time`"
                    :rules='form.model? rules.time : []' label="选择时间"
                    style="height: 50px; width: 100%"
                >
                  <el-time-select
                      v-model="item.time"
                      :editable="false" :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '24:00'}"
                      placeholder="选择时间"
                      size="mini" style="width: 80%"
                      @blur="checkTime($event)">
                  </el-time-select>
                </el-form-item>
              </el-col>


            </el-row>


            <el-row :gutter="20">
              <el-col :md="{span:12}" :sm="{span:16}" :xs="{span:24}">
                <el-form-item
                    :prop="`zdList.${index}.zdMinStep`"
                    :rules='form.model? rules.zdMinStep : [] ' label="最小步数"
                >
                  <el-input-number
                      v-model="item.zdMinStep"
                      :min="1" :step="1" placeholder="请输入"
                      size="small" step-strictly
                      @blur="checkZdMinStep($event)"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="{span:12}" :sm="{span:16}" :xs="{span:24}">
                <el-form-item
                    :prop="`zdList.${index}.zdMaxStep`"
                    :rules='form.model? rules.zdMaxStep : []' label="最大步数"
                >
                  <el-input-number
                      v-model="item.zdMaxStep"
                      :min="1" :step="1" placeholder="请输入"
                      size="small" step-strictly
                      @blur="checkZdMaxStep($event)"
                  />
                </el-form-item>
              </el-col>
            </el-row>

          </div>
        </div>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">打卡</el-button>
          <el-button @click="resetForm('form')">取消</el-button>
        </el-form-item>

        <div style="border:solid;border-radius: 10px;padding: 10px">
          <p>1.先下载小米运动APP。使用手机号码注册，在APP中，在设置里找到第三方接入，绑定微信和支付宝，需要使用哪个就绑定哪个)</p>
          <p>2.在本站提交手机号码和密码，以及步数，点击打卡按钮即可提交步数</p>
          <p>3.更多问题请点击网站上方的&quot;常见问题&quot;</p>
          <p>需要每天定时代刷以及其他问题可以咨询qq:1981196280 vx:aprilz___ (三个_)</p>
          <p style="text-decoration:line-through">服务器资源有限，这里就不提供在线自动模式了</p>


        </div>
      </el-form>


      <el-dialog
          title="常见问题"
          :visible.sync="dialogVisible"
          width="90%"
      >
        <div>
          <br/> Q:我的账号安全吗？
          <br/> A:本站不保存任何形式的密码。(除开自动模式)
          <br/> Q:这个程序是干嘛的？
          <br/> A:用来给你的支付宝或者微信刷步数的。
          <br/> Q:使用这个会影响我的账号安全吗？
          <br/> A:有影响，只要你刷的步数不过分（尽量别超过20000）那么绝对安全，超过太多后越多越容易触发封号，不过封号也只是小米运动部分封7天,7天之后又可以重新修改。(ps:
          本人有时候修改30000+也没啥问题,但不推荐)
          <br/> Q:不起作用该怎么办？
          <br/> A:安装APP并登录账号后点击-我的-第三方接入-重新绑定至相关需要同步的第三方。
          <br/> Q:步数可以修改更小么？
          <br/> A:可以,但是不推荐多次,否则也有几率封号7天。
          <br/> ------------------------------------------------------------------
          <br/> 需要每天定时代刷以及其他问题可以咨询qq:1981196280 vx:aprilz___ (三个_)
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import {phoneOrEmail} from '@/utils/formRules'
import {updateMi} from '@/api/mi'

export default {
  data() {
    return {
      zdShow: false,
      //常见问题提示框
      dialogVisible: false,
      zdClose: true,
      form: {
        uin: '',
        pwd: '',
        minStep: undefined,
        maxStep: undefined,
        model: false,//false 手动 true自动
        cardNo: '',
        source: 'h5',
        zdList: [{
          time: '',
          zdMinStep: undefined,
          zdMaxStep: undefined,
        }]
      },
      rules: {
        uin: [
          {
            required: true,
            message: '请输入手机号或者邮箱',
            trigger: 'blur'
          },
          {validator: phoneOrEmail, trigger: 'blur'}
        ],

        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        minStep: [
          {
            required: true,
            message: '请输入最小步数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              const {maxStep, minStep} = this.form
              if (minStep > maxStep) {
                return callback(new Error('最小步数需小于最大步数'))
              } else {
                return callback()
              }

            }, trigger: 'blur'
          }
        ],
        maxStep: [
          {
            required: true,
            message: '请输入最大步数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              const {maxStep, minStep} = this.form
              if (minStep > maxStep) {
                return callback(new Error('最小步数需小于最大步数'))
              } else {
                return callback()
              }
            }, trigger: 'blur'
          }
        ],
        cardNo: [
          {
            required: true,
            message: '请输入卡密',
            trigger: 'blur'
          }
        ],
        time: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'blur'
          }
        ],
        zdMinStep: [
          {
            required: true,
            message: '请输入最小步数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              //这里取到里面的index
              let index = rule.field.replace(/[^0-9]/ig, '')
              let zdMaxStep = this.form.zdList[index].zdMaxStep
              if (value > zdMaxStep) {
                return callback(new Error('最小步数需小于最大步数'))
              } else {
                return callback()
              }

              return callback()
            }, trigger: 'blur'
          }
        ],
        zdMaxStep: [
          {
            required: true,
            message: '请输入最大步数',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              //这里取到里面的index
              let index = rule.field.replace(/[^0-9]/ig, '')
              let zdMinStep = this.form.zdList[index].zdMinStep
              if (zdMinStep > value) {
                return callback(new Error('最小步数需小于最大步数'))
              } else {
                return callback()
              }

              return callback()
            }, trigger: 'blur'
          }
        ],

      }

    }
  },
  watch: {},
  computed: {},
  components: {},
  created () {
  },
  mounted () {

  },
  methods: {
    //自动打卡新增一行
    addZd() {
      let length = this.form.zdList.length
      if (length >= 3) {
        this.$message({
          type: 'error',
          message: '目前最多三行执行计划哦~'
        })
        return
      }

      this.form.zdList.push(
          {
            time: '',
            zdMinStep: undefined,
            zdMaxStep: undefined,
          }
      )
    },
    removeZd(item) {
      let length = this.form.zdList.length
      let index = this.form.zdList.indexOf(item)
      if (length <= 1) {
        this.$message({
          type: 'error',
          message: '最少保留一条执行计划哦~'
        })
        return
      }
      this.form.zdList.splice(index, 1)

    },
    changeModel(e) {
      if (e) {
        this.zdShow = true
      } else {
        this.zdShow = false
      }
      this.form.maxStep = undefined
      this.form.minStep = undefined
      this.form.cardNo = undefined
      this.form.zdList = [{
        time: '',
        zdMinStep: undefined,
        zdMaxStep: undefined,
      }]
    },
    resetForm(searchForm) {
      //  this.$nextTick(()=>{
      this.$refs[searchForm].resetFields()
      //    })
    },
    checknum(type) {
      if (type === 'maxStep') {
        if (this.form.maxStep > this.form.minStep) {
          this.$refs.form.validateField('minStep')
        }
      } else {
        if (this.form.maxStep > this.form.minStep) {
          this.$refs.form.validateField('maxStep')
        }

      }
    },
    checkCardNo() {
      this.$refs.form.validateField('cardNo')
    },
    checkTime() {
      this.$refs.form.validateField('time')
    },
    checkZdMinStep() {
      this.$refs.form.validateField('zdMinStep')
    },
    checkZdMaxStep() {
      this.$refs.form.validateField('zdMaxStep')
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if(this.form.model){
            this.$notify.error({
              title: '错误',
              message: '抱歉，目前先不放开自动定时功能',
              type: 'success',
              offset: 100
            })
            return
          }
          updateMi(this.form).then(response => {
            if (response.code === 0) {
              this.$refs.form.resetFields()
              this.$notify({
                title: '成功',
                message: response.data,
                type: 'success',
                offset: 100
              })

            } else {
              this.$notify.error({
                title: '错误',
                message: response.message,
                type: 'success',
                offset: 100
              })
            }
          }).catch((err) => {
            this.$notify.error({
              title: '错误',
              message: err.message,
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
</script>
<style scoped>
.zdDiv {
  margin: 0px auto;
  position: relative;
}

.zdStep {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background: #d3dce6;
  margin: 40px auto;
  position: relative;
}

.delButton {
  display: block;
  position: absolute;
  border: 1px solid red;
  right: 0px;
  top: -10px;
  margin: 20px;
  z-index: 100;
}

.addZd {
  display: block;
  position: absolute;
  border: 1px solid red;
  right: 0px;
  top: 60px;

}

</style>
