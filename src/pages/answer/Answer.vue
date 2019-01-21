
<!--回答审核暂时不考虑对回答下的评论进行审核，对评论的处理留在举报处理里面-->
<!--对评论的处理逻辑为：
    回答者有权对自己回答下面的评论进行产出处理
    同时所有人都可以对评论进行举报
    所有被举报的评论都会汇总在举报审核页面下的“评论”的tag下面
    ------ wh 2019/01/21
-->

<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-answer">
    <template slot="header">回答审核</template>
    <tab-table/>
    <template slot="footer">联系我们 © 吃瓜小队</template>
  </d2-container>
</template>

<script>
// 组件
import TabTable from './components/TabTable/index'
// 请删除下面代码中你不需要的部分
export default {
  name: 'answer',
  components: {
    TabTable
  },
  // 数据
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 事件处理方法
  methods: {}
}
</script>

<style lang="scss" scoped>
@import './Answer.scss';
</style>
