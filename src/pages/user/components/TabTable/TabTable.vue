<template>
  <div class="tab-table">
    <basic-container>
      <el-tabs v-model="tabKey" @tab-click="handleClick">
        <el-tab-pane
          v-for="tab in tabs"
          :label="tab.tab"
          :name="tab.key"
          :key="tab.key">
          <el-table
            :data="dataSource[tab.key]"
            style="width: 100%">
            <el-table-column
              v-for="item, index in columns"
              :label="item.title"
              :prop="item.dataIndex"
              :key="item.key"
              :width="item.key !== 'action' ? (item.width || 150) : item.width">
              <template slot-scope="scope">
                <span v-if="item.key !== 'action'">{{scope.row[item.dataIndex]}}</span>
                <edit-dialog :row="scope.row" :key.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleMod="handleMod"></edit-dialog>
                <delete-balloon :key.sync="item.key" :index="scope.$index" :tabKey="tabKey" @handleRemove="handleRemove"></delete-balloon>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container'
import DeleteBalloon from './components/DeleteBalloon'
import EditDialog from './components/EditDialog'
import response from './tab-table.json'
import request from '../../../../plugin/axios'
import qs from 'qs'

export default {
  components: {
    BasicContainer,
    DeleteBalloon,
    EditDialog
  },
  name: 'TabTable',

  data () {
    return {
      tabKey: 'all',
      dataSource: [],
      tabs: [
        { tab: '全部', key: 'all' },
        { tab: '已封禁', key: 'banned' },
        { tab: '审核中', key: 'un_identity' },
        { tab: '已拒绝', key: 'refuse' },
        { tab: '已确认', key: 'confirm' }
      ],
      columns: [
        {
          title: '用户名',
          dataIndex: 'title',
          key: 'nickname'
        },
        {
          title: '等级',
          dataIndex: 'author',
          key: 'level'
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status'
        },
        {
          title: '注册时间',
          dataIndex: 'date',
          key: 'date'
        },
        {
          title: '上次登录时间',
          dataIndex: 'date',
          key: 'date'
        },
        {
          title: '操作',
          key: 'action'
        }
      ],
      visible: false
    }
  },

  created () {},

  mounted () {
    this.dataSource = response.data
    // 获取普通从业者信息
    request({
      url: '/account/back_get_normal_users',
      methods: 'get'
    }).then(res => {
      window.console.log(res)
      // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
      // this.dataSource = res
    })

  },

  methods: {
    handleClick (tab) {
      console.log(tab)
    },
    handleRemove (index, tabKey) {
      this.dataSource[tabKey].splice(index, 1)
    },
    handleMod (row, index, tabKey) {
      this.$set(this.dataSource[tabKey], index, row)
    }
  }
}

</script>

<style>
  .tab-table {

  }
</style>
