<template>
  <div class="content">
    <FollowMenu />
    <div class="main">
      <div class="title">修改个人资料</div>
      <hr class="hr" />
      <div class="msg">
        <div class="pic flex">
          <img :src="infoForm.avatarUrl" alt="头像" style="width:54px;height:54px;" />
          <el-upload
            class="avatar-uploader quill-img"
            action
            :before-upload="avatarUpload"
            :show-file-list="false"
            accept=".jpg,.jpeg,.png,.gif"
          >
            <div class="caption">更改头像<i class="el-icon-arrow-right"></i></div>
          </el-upload>
        </div>
        <div class="msg-form-focus">
          <el-form ref="infoForm" :rules="rules" :model="infoForm" label-width="80px">
            <el-form-item label="姓名" prop="userName">
              <el-input
                v-model="infoForm.userName"
                placeholder="请输入姓名"
                style="width:220px"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" class="type" prop="sex">
              <el-select
                v-model="infoForm.sex"
                placeholder="请选择性别"
                style="width:168px"
                popper-class="select-option"
              >
                <el-option label="保密" value="0"></el-option>
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="公司名称" prop="corporationName">
              <el-input
                v-model="infoForm.corporationName"
                placeholder="请输入公司名称"
                style="width:459px"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="部门" class="type" prop="department">
              <el-input
                v-model="infoForm.department"
                placeholder="请填写您的部门"
                style="width:168px"
              ></el-input>
            </el-form-item> -->
            <el-form-item label="企业类型" class="type" prop="corporationType">
              <el-select
                v-model="infoForm.corporationType"
                placeholder="请选择企业类型"
                style="width: 168px"
                popper-class="select-option"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in companyTypeList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位" prop="position">
              <el-select
                v-model="infoForm.position"
                placeholder="请选择岗位"
                style="width: 168px;"
                popper-class="select-option"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="(item, index) in positionList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="公司地址" class="type" prop="companySite">
              <el-input
                v-model="infoForm.companySite"
                placeholder="请填写您的公司地址"
                style="width:459px"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司网址" class="type" prop="companyWebsite">
              <el-input
                v-model="infoForm.companyWebsite"
                placeholder="请填写您的公司网址"
                style="width:459px"
              ></el-input>
            </el-form-item> -->
          </el-form>
        </div>
        <button class="btn-save" @click="submit">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPersonal',
  components: {},
  props: {},
  data() {
    return {
      infoForm: {
        avatarUrl: '',
        userName: '',
        sex: '0',
        corporationId: '',
        corporationName: '',
        corporationType: '0',
        position: '',
      },
      positionList: [
        {
          label: '总经理',
          value: '总经理',
        },
        {
          label: '总监',
          value: '总监',
        },
        {
          label: '经理',
          value: '经理',
        },
        {
          label: '主管',
          value: '主管',
        },
        {
          label: '采购专员',
          value: '采购专员',
        },
        {
          label: '市场专员',
          value: '市场专员',
        },
        {
          label: '业务营销',
          value: '业务营销',
        },
      ],
      companyTypeList: [
        {
          label: '参展企业',
          value: '0',
        },
        {
          label: '代理商',
          value: '1',
        },
        {
          label: '主办方',
          value: '2',
        },
      ],
      rules: {
        userName: [
          {
            required: true,
            message: '请填写2-12位中文或英文名',
            trigger: 'blur',
          },
          {
            min: 2,
            max: 12,
            message: '长度在 2 到 12 个字符',
            trigger: 'blur',
          },
        ],
        position: [
          {
            required: true,
            message: '请选择职位',
            trigger: 'change',
          },
        ],
        corporationName: [
          {
            required: true,
            message: '请填写你的公司名称',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    pageLoad() {
      this.getPersonalData();
    },
    //获取用户资料
    getPersonalData() {
      this.$api.personalCenter.getPersonalData().then((res) => {
        this.infoForm = res;
      });
    },
    //修改个人资料
    updatePersonalData(infoForm) {
      this.$api.personalCenter.updatePersonalData(infoForm).then((msg) => {
        this.$dialog.toast(msg);
        window.location.reload();
      });
    },
    //上传图片
    avatarUpload(file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'avatar');
      if (file.size > 512000) {
        this.$dialog.warning('图片过大,请压缩后重新上传！');
        return false;
      }
      this.$api.upload.fileUpload(formData).then((res) => {
        this.infoForm.avatarUrl = res;
        console.log(res);
      });
    },
    //提交个人信息表单
    submit() {
      this.$refs['infoForm'].validate((valid) => {
        if (!valid) return;
        this.infoForm.token = this.$store.getters.token;
        this.updatePersonalData(this.infoForm);
      });
    },
  },
  mounted() {},
  created() {},
};
</script>

<style lang="less" scoped>
.content {
  padding: 47px 100px 90px 100px;
  font-size: 14px;
  .main {
    .title {
      font: 500 14px SourceHanSansCN-Medium;
      line-height: 14px;
      margin-bottom: 10px;
    }
    hr {
      border: 1px dashed #cccccc;
      border-bottom: none;
    }
    .msg {
      margin-top: 46px;
      .pic {
        align-items: center;
        margin: 0 0 30px 10px;
        img {
          border-radius: 50%;
          object-fit: cover;
        }
        .setting-right {
          display: flex;
          height: 37px;
          justify-content: flex-end;
          align-items: center;
        }
        .hiddenInput {
          display: none;
        }
        .caption {
          color: #333333;
          margin-left: 30px;
          cursor: pointer;
          &:hover {
            color: #e11321;
          }
        }
      }
      .btn-save {
        background: #e11321;
        border-radius: 2px;
        margin-left: 276px;
        color: #ffffff;
        width: 97px;
        height: 32px;
        font-size: 12px;
        cursor: pointer;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
        &:hover {
          opacity: 0.8;
        }
        &:active {
          opacity: 1;
        }
      }
    }
  }
}
.select-option {
  .el-select-dropdown__item.selected {
    color: #fff !important;
    background-color: #e11321 !important;
  }
  .el-select-dropdown__item {
    color: #333;
  }
}
</style>
<style lang="less">
.msg-form-focus {
  .el-input__inner:focus {
    border-color: #e11321 !important;
  }
  .el-input.is-focus .el-input__inner {
    border-color: #e11321 !important;
  }
  .el-form-item__label {
    text-align: left;
    margin-right: 10px;
  }
  .sex > .el-form-item__label,
  .type > .el-form-item__label,
  .department > .el-form-item__label {
    margin-left: 10px;
    margin-right: 0;
  }
}
</style>
