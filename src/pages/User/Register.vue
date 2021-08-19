<template>
  <div class="container">
    <HeaderBar />
    <div class="w register">
      <header class="register-header">
        <el-steps :active="state" align-center>
          <el-step title="手机短信验证"></el-step>
          <el-step title="填写注册信息"></el-step>
          <el-step title="注册成功"></el-step>
        </el-steps>
        <hr class="divider" />
      </header>
      <main class="register-main">
        <div class="personal-information">
          <div class="personal-information-list">
            <h2>完善资料-获得您关注行业最新的信息</h2>
            <el-form
              :model="form"
              :rules="rules"
              ref="registerForm"
              label-width="100px"
              class="demo-registerForm"
            >
              <el-form-item label="姓名" prop="userName">
                <el-input v-model="form.userName" placeholder="请填写2-12位中文或英文名"></el-input>
              </el-form-item>
              <el-form-item label="公司名称" prop="corporationName">
                <el-input
                  v-model="form.corporationName"
                  placeholder="请填写您的公司名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="职位" prop="position">
                <el-select
                  v-model="form.position"
                  placeholder="请选择职位"
                  popper-class="select-option"
                >
                  <el-option
                    v-for="(position, index) in positionList"
                    :key="index"
                    :label="position.label"
                    :value="position.value"
                  ></el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item label="部门" prop="department">
                <el-input v-model="form.department" placeholder="请填写您的部门"></el-input>
              </el-form-item> -->
              <el-form-item label="企业类型" prop="corporationType">
                <el-select
                  v-model="form.corporationType"
                  placeholder="请选择企业类型"
                  popper-class="select-option"
                >
                  <el-option
                    v-for="(corporationType, index) in companyTypeList"
                    :key="index"
                    :label="corporationType.label"
                    :value="corporationType.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="公司地址" prop="companySite">
              <el-input v-model="form.companySite" placeholder="请填写您的公司地址" ></el-input>
            </el-form-item>
            <el-form-item label="公司网址" prop="companyWebsite">
              <el-input v-model="form.companyWebsite" placeholder="请填写您的公司网址" ></el-input>
            </el-form-item> -->
            </el-form>
          </div>
          <div class="personal-information-button">
            <el-button type="primary" @click="formsSubmit(1)">下次完善</el-button>
          </div>
        </div>
        <div class="industries">
          <h2>选择行业</h2>
          <div class="industries-content">
            <div class="parent">
              <div
                v-for="item in cateList"
                :key="item.parentId"
                :class="['item', item.parentId === parentId ? 'checked' : '']"
                @click="onChangeIndustriesParent(item.parentId)"
              >
                {{ item.categoryName }}
              </div>
            </div>
            <div class="children">
              <template v-for="item in cateList">
                <template v-if="item.parentId === parentId">
                  <div
                    v-for="p in item.categoryVos"
                    :key="p.categoryId"
                    class="item"
                    @click="onChangeIndustriesChildren(p.categoryId)"
                  >
                    <span class="square"><i class="el-icon-check" v-if="p.checked"></i></span
                    >{{ p.categoryName }}
                  </div>
                </template>
              </template>
            </div>
          </div>
          <!-- <div class="industries-first">
            <el-radio-group
              v-model="industryCheck"
              v-for="(list, index) in cateList"
              :key="index"
              @change="clearForm"
            >
              <el-radio-button
                :label="list.categoryName"
                
              ></el-radio-button>
            </el-radio-group>
          </div>
          <div class="industries-secend">
            <el-checkbox-group v-model="form.industryLists" @change="onChange">
              <el-checkbox
                v-for="item in categoryVos"
                :key="item.categoryId"
                :label="item.categoryName"
              ></el-checkbox>
            </el-checkbox-group>
          </div> -->
        </div>
      </main>
      <footer class="register-footer">
        <div class="web-terms">
          <el-checkbox v-model="checked" style="color:#999999">我接受并同意网站条款</el-checkbox>
          <router-link to="/webterms" target="_blank">（阅读详情）</router-link>
          <el-button type="primary" @click="submit" :disabled="checked == false"
            >提交注册信息</el-button
          >
        </div>
      </footer>
    </div>
    <FooterBar />
  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      state: 1,
      parentId: '',
      form: {
        isNext: 0, // 0:提交注册信息，1:下次完善
        userName: '',
        phone: '',
        position: '',
        corporationName: '',
        department: '',
        corporationType: '',
        industryLists: [],
        // companySite: '广东省深圳市福田区',
        // companyWebsite: 'www.baidu.com',
      },
      cateList: [],
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
          value: '主办方',
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
          {required: true, message: '请填写2-12位中文或英文名', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'},
        ],
        position: [{required: true, message: '请选择职位', trigger: 'change'}],
        corporationName: [{required: true, message: '请填写你的公司名称', trigger: 'change'}],
      },
      industryCheck: '',
      industry: '车/配件/汽摩/自行车',
      checked: false,
    };
  },
  watch: {
    industryCheck: {
      handler(val) {
        console.log(val);
        const checkedIndustry = this.cateList.filter((item) => item.categoryName == val);
        console.log(checkedIndustry);
        if (!Array.isEmpty(checkedIndustry) && !Array.isEmpty(checkedIndustry[0]?.categoryVos)) {
          this.categoryVos = checkedIndustry[0]?.categoryVos;
        }
      },
    },
  },

  methods: {
    pageLoad() {
      this.getAllCategory();
    },
    // 获取全部分类
    getAllCategory() {
      this.$api.exhibition.getAllCategory({isDomestic: 1}).then((res) => {
        this.cateList = res || [];
      });
    },
    clearForm(item) {
      console.log(item);
    },
    submit() {
      this.$refs['registerForm'].validate((valid) => {
        console.log(valid);
        if (!valid) return;
        this.formsSubmit(0);
      });
    },
    // 表单提交
    formsSubmit(isNext) {
      const phone = this.$store.getters.phone;
      const industryLists = this.checkIndustry();
      const params = {...this.form, phone, isNext, industryLists};
      this.$api.auth.webRegister(params).then((res) => {
        this.refreshPhone('');
        this.refreshToken(res);
        this.navigateTo('/');
      });
    },
    // 把选中的行业取出来
    checkIndustry() {
      const industryLists = [];
      this.cateList.forEach((item) => {
        const filterItem = item?.categoryVos.filter((Iitem) => Iitem.checked);
        if (!Array.isEmpty(filterItem)) {
          const childrenId = filterItem.map((fItem) => fItem.categoryId);
          industryLists.push({
            childrenId,
            parentId: item.parentId,
          });
        }
      });
      return industryLists;
    },
    // 选择父行业
    onChangeIndustriesParent(parentId) {
      this.parentId = parentId;
    },
    // 选择子行业
    onChangeIndustriesChildren(categoryId) {
      this.cateList.forEach((item) => {
        if (item.parentId === this.parentId) {
          item.categoryVos.forEach((Iitem) => {
            if (categoryId === Iitem.categoryId) {
              this.$set(Iitem, 'checked', !Iitem.checked);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
.container {
  height: 100%;
  .register {
    margin: 20px auto;
    background-color: #ffffff;
    box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
    &-header {
      width: 1240px;
      margin: 0 auto;
      padding-top: 40px;
      .el-steps {
        .el-step__icon {
          background: #e11321;
          &-inner {
            font-weight: 500;
          }
        }
        .el-step__head {
          color: #ffffff;
          border-color: #e11321;
        }
        .el-step__title.is-finish,
        .el-step__title.is-process {
          color: #666666;
          font-weight: 500;
        }
        .el-step__line {
          border-color: #e11321;
          background-color: #e11321;
          margin-top: 3px;
        }
        .el-step__head.is-process {
          .el-step__line {
            background: rgba(225, 19, 33, 0.3);
          }
        }
        .el-step__head.is-wait {
          .el-step__icon.is-text {
            background: #f58f98;
            border: rgba(225, 19, 33, 0.3);
          }
          .el-step__line {
            background: rgba(225, 19, 33, 0.3);
          }
        }
      }
      .divider {
        margin: 40px 0;
        border: 1px dashed #cccccc;
        border-bottom: none;
      }
    }
    &-main {
      width: 1240px;
      margin: 0 auto;
      .personal-information {
        &-list {
          float: left;
          margin-bottom: 40px;
          h2 {
            font: 16px SourceHanSansCN-Medium;
            height: 24px;
            font-weight: 500;
            line-height: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          .el-form-item__label {
            text-align: left;
          }
          .el-input__inner {
            width: 400px;
            &:focus {
              border-color: #e11321;
            }
          }
          .el-input.is-focus .el-input__inner {
            border-color: #e11321;
          }
        }
        &-button {
          float: right;
          .el-button--primary {
            font: 12px SourceHanSansCN;
            background-color: #e11321;
            border-color: #e11321;
            width: 100px;
            height: 32px;
            padding: 0;
            &:hover {
              background-color: #ff1321;
              border-color: #ff1321;
            }
            &:active {
              background-color: #e11321;
              border-color: #e11321;
            }
          }
        }
      }
      .industries {
        clear: both;
        margin-bottom: 60px;
        h2 {
          font: 16px SourceHanSansCN-Medium;
          height: 24px;
          font-weight: 500;
          line-height: 24px;
          color: #333333;
          margin-bottom: 20px;
        }
        &-content {
          .parent {
            display: flex;
            flex-wrap: wrap;
            .item {
              padding: 0 6px;
              margin-right: 48px;
              margin-bottom: 15px;
              font-size: 14px;
              color: #666;
              cursor: pointer;
              border: 1px solid #fff;
            }
            .checked {
              color: #e11321;
              border: 1px solid #e11321;
            }
          }
          .children {
            display: flex;
            flex-wrap: wrap;
            .item {
              padding: 0 6px;
              margin-right: 48px;
              margin-bottom: 15px;
              font-size: 12px;
              color: #666;
              cursor: pointer;
              .square {
                display: inline-block;
                vertical-align: middle;
                width: 14px;
                height: 14px;
                margin-right: 6px;
                background: #ffffff;
                border-radius: 2px;
                border: 1px solid #cccccc;
                line-height: 1;
              }
            }
          }
        }
        &-first {
          .el-radio-button__inner {
            padding:10px 0;
            margin:0 20px 10px 0;
            text-align:center;
            border: 1px solid transparent;
            border-radius: 2px;
            line-height: 10px;
            &:hover {
              color: #e11321;
            }
          }
          .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            color: #e11321;
            background-color: #ffffff;
            border: 1px solid #e11321;
            border-radius: 2px;
            box-shadow: 0 0 0 0 #e11321;
          }
          .el-radio-button:focus:not(.is-focus):not(:active):not(.is-disabled) {
            box-shadow: none;
          }
        }
        &-secend {
          margin-top: 10px;
          .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #666666;
          }
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #ffffff;
            border-color: #999999;
          }
          .el-checkbox__inner::after {
            border-color: #999999;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #cccccc;
          }
        }
      }
    }
    &-footer {
      width: 1240px;
      margin: 0 auto;
      text-align: center;
      height: 120px;
      .web-terms {
        display: block;
        font-size: 12px;
        a {
          text-decoration: none;
          color: #0077ff;
        }
        .el-checkbox__label {
          font-size: 12px;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #999999;
        }
        .el-button--primary {
          display: block;
          margin: 30px auto;
          font-size: 12px;
          background-color: #e11321;
          border: 0;
          width: 100px;
          height: 32px;
          padding: 0;
          &:hover {
            background-color: #ff1321;
            border-color: #ff1321;
          }
          &:active {
            background-color: #e11321;
            border-color: #e11321;
          }
        }
        .el-button--primary.is-disabled,
        .el-button--primary.is-disabled:active,
        .el-button--primary.is-disabled:focus,
        .el-button--primary.is-disabled:hover {
          background-color: #c8c9cc;
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
