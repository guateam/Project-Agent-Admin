<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-user">
    <template slot="header">从业者管理</template>
    <tab-table/>
    <template slot="footer">自动生成 1 个组件</template>
  </d2-container>
</template>

<script>
// 组件
import TabTable from './components/TabTable/index'
// 请删除下面代码中你不需要的部分
export default {
  name: 'user',
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
@import './User.scss';
</style>
