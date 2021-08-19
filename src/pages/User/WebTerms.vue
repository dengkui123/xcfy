<template>
  <div class="container">
    <HeaderBar />
    <div class="w terms">
      <h1>用户协议</h1>
      <hr class="divider"/>
      <section 
        class="terms-section" 
        v-for="paragraph in paragraphs" 
        :key="paragraph.id"
      >
        <h2>{{ paragraph.title }}</h2>
        <p> {{ paragraph.content}}</p>
      </section>
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
      paragraphs: [
        {
          id:'1',
          title:'这是段落的小标题',
          content:'这是段落的内容'
        },
        {
          id:'2',
          title:'这是段落的小标题',
          content:'这是段落的内容'
        },
      ],
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},

}
</script>

<style lang="less" scoped>
.container{
  height: 100%;
  .terms{
    padding:40px 50px 40px 100px;
    margin:20px auto;
    background:#ffffff; 
    box-shadow: 0px 0px 5px 0px rgba(152, 152, 152, 0.4);
    h1{
      color: #333333;
      font:16px SourceHanSansCN-Medium;
    }
    .divider{
      border:1px dashed #CCCCCC; 
      margin:20px 0; 
      border-bottom:none;
    }
    &-section{
      color: #666666;
      h2{
        font-size: 14px;
        font-weight:400;
      }
      p{
        font-size: 14px;
        margin-bottom:20px;
      }
    }
  }
}
</style>