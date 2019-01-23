<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-user-detail">
    <template slot="header">用户详情</template>
    <template slot="footer">联系我们 © 吃瓜小队</template>
  </d2-container>
</template>

<script>
// 组件
// 请删除下面代码中你不需要的部分
export default {
  name: 'user-detail',
  components: {
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
@import './UserDetail.scss';
</style>
