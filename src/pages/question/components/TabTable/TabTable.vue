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
                                :width="item.key !== 'action' ? (item.width || 160) : item.width">
                            <template slot-scope="scope">
                                <span v-if="item.key === 'title'">{{scope.row[item.dataIndex]}}</span>
                                <span v-if="item.key !== 'action' && item.key!=='title'">{{scope.row[item.dataIndex]}}</span>
                                <!--<edit-dialog :row="scope.row" :key.sync="item.key" :index="scope.$index"-->
                                             <!--:tabKey="tabKey" @handleMod="handleMod"></edit-dialog>-->
                                <delete-balloon :row="scope.row" :key.sync="item.key" :index="scope.$index" :tabKey="tabKey"
                                                @handleRemove="handleRemove"></delete-balloon>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </basic-container>
    </div>
</template>

<script>
    import BasicContainer from '@vue-materials/basic-container';
    import DeleteBalloon from './components/DeleteBalloon';
    import EditDialog from './components/EditDialog';
    import response from './tab-table.json';
    import request from '@/plugin/axios'

    export default {
        components: {
            BasicContainer,
            DeleteBalloon,
            EditDialog,
        },
        name: 'TabTable',

        data() {
            return {
                tabKey: 'all',
                dataSource: [],
                tabs: [
                    {tab: '全部', key: 'all'},
                    {tab: '待审核', key: 'wait'},
                    {tab: '已清除', key: 'deleted'},
                ],
                columns: [
                    {
                        title: '问题',
                        dataIndex: 'title',
                        key: 'title',
                        width: 600
                    },
                    {
                        title: '提问者',
                        dataIndex: 'nickname',
                        key: 'author',
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                    },
                    {
                        title: '发布时间',
                        dataIndex: 'edittime',
                        key: 'date',
                    },
                    {
                        title: '操作',
                        key: 'action',
                    },
                ],
                visible: false,
            };
        },

        created() {
        },

        mounted() {
            this.get_list()
        },

        methods: {
            get_list() {
                request({
                    url: '/questions/back_get_questions',
                    methods: 'get'
                }).then(res => {
                    window.console.log(res);
                    // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
                    this.dataSource = res
                })
            },
            handleClick(tab) {
                console.log(tab);
            },
            handleRemove(row) {
                request({
                    url: '/questions/delete_question?question_id='+row['questionID'],
                    method: 'get',
                }).then(res => {
                    window.console.log(res);
                    // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
                    this.get_list()
                })
            },
            handleMod(row, index, tabKey) {
                this.$set(this.dataSource[tabKey], index, row);
            },
        },
    }

</script>

<style>
    .tab-table {

    }
</style>
