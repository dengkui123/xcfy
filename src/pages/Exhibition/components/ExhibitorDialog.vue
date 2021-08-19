<template>
  <el-dialog :visible="visible" :show-close="false" width="700px">
    <div class="content">
      <div class="exhibition">
        <div class="cover">
          <el-image :src="detailData.exhibitionUrl" />
        </div>
        <div class="info">
          <div class="name">{{ detailData.exhibitionName }}</div>
          <div class="price" v-if="detailData.exhibitionPrice">
            ¥{{ detailData.exhibitionPrice.split('.')[0] }}.<span style="font-size: 13px"
              >{{ detailData.exhibitionPrice.split('.')[1] }}{{ detailData.unit }}</span
            >
          </div>
        </div>
      </div>
      <div class="form">
        <el-form
          :model="form"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="form.companyName"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linkMan">
            <el-input v-model="form.linkMan"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="linkMobile">
            <el-input v-model="form.linkMobile"></el-input>
          </el-form-item>
          <el-form-item label="面积" prop="area">
            <el-radio-group v-model="form.area">
              <el-radio
                v-for="(item, index) in detailData.exhibitionSpecifications"
                :key="index"
                :label="item.exhibitionArea + '平米'"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="button" @click="onSubmit('ruleForm')">提交</div>
            <div class="tips">
              温馨提示：提交参展需求后，我司工作人员将于<br />1个工作日内与您联系，请保持手机畅通。
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="close" @click="onClose">×</div>
  </el-dialog>
</template>

<script>
export default {
  name: 'loginDialog',
  props: {
    detailData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
      form: {
        companyName: '',
        linkMan: '',
        linkMobile: '',
        area: '',
        remark: '',
      },
      rules: {
        companyName: [
          {required: true, message: '请输入公司名称', trigger: 'blur'},
          {min: 2, max: 30, message: '长度在 2 到 30个字符', trigger: 'blur'},
        ],
        linkMan: [{required: true, message: '请输入联系人', trigger: 'change'}],
        linkMobile: [{required: true, message: '请输入联系电话', trigger: 'change'}],
        area: [{required: true, message: '请选择面积', trigger: 'change'}],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitForm();
        }
      });
    },
    // 提交参展信息
    submitForm() {
      this.$api.exhibition
        .exhibitor({
          ...this.form,
          exhibitionId: this.detailData.exhibitionId,
          specificationId: this.detailData.exhibitionSpecifications[0].id,
          token: window.$token,
        })
        .then(() => {
          this.$dialog.toast('订单提交成功');
          this.onClose();
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    show() {
      this.visible = true;
    },
    // 关闭
    onClose() {
      this.visible = false;
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  padding: 0 50px;
  .exhibition {
    display: flex;
    align-items: center;
    .cover {
      width: 210px;
      height: 120px;
      border-radius: 4px;
      border: 1px solid #eeeeee;
      overflow: hidden;
    }
    .info {
      padding-left: 31px;
      color: #333;
      .name {
        font-size: 20px;
      }
      .price {
        margin-top: 10px;
        margin-right: 50px;
        font-size: 16px;
        span {
          font-size: 16px;
        }
      }
    }
  }
  .form {
    margin-top: 20px;
    padding: 0 20px;
    .button {
      margin: 20px auto 0;
      width: 242px;
      height: 48px;
      background: #e11321;
      border-radius: 4px;
      text-align: center;
      line-height: 48px;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
    }
    .tips {
      margin-top: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: #999;
    }
  }
}
.close {
  position: absolute;
  top: -18px;
  right: -18px;
  width: 42px;
  height: 42px;
  background: #999999;
  text-align: center;
  line-height: 46px;
  color: #fff;
  font-size: 22px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
