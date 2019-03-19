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
                                <el-button type="warning" size="mini" round
                                           v-if="tab.tab==='审核中' && item.key === 'action'" style="margin-right: 0.5em"
                                           @click="verified(scope.row)">审核
                                </el-button>
                                <edit-dialog :row="scope.row" :key.sync="item.key" :index="scope.$index"
                                             :tabKey="tabKey" @handleMod="handleMod"></edit-dialog>
                                <delete-balloon :key.sync="item.key" :index="scope.$index" :tabKey="tabKey"
                                                @handleRemove="handleRemove"></delete-balloon>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            <el-dialog title="审核专家" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="认证资料">
                        <img :src="form.specialist_license" style="width: 100%;height: auto;">
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="danger" @click="refuse()">审核不通过</el-button>
                    <el-button type="primary" @click="confirm()">审核通过</el-button>
                </div>
            </el-dialog>
        </basic-container>
    </div>
</template>

<script>
    import BasicContainer from '@vue-materials/basic-container'
    import DeleteBalloon from './components/DeleteBalloon'
    import EditDialog from './components/EditDialog'
    import response from './tab-table.json'
    import request from '@/plugin/axios'
    import qs from 'qs'

    export default {
        components: {
            BasicContainer,
            DeleteBalloon,
            EditDialog
        },
        name: 'TabTable',

        data() {
            return {
                tabKey: 'all',
                dataSource: [],
                tabs: [
                    {tab: '全部', key: 'all'},
                    {tab: '已通过', key: 'confirm'},
                    {tab: '审核中', key: 'wait'},
                ],
                columns: [
                    {
                        title: '账号ID',
                        dataIndex: 'userID',
                        key: 'userID'
                    },
                    {
                        title: '用户名',
                        dataIndex: 'nickname',
                        key: 'nickname'
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status'
                    },
                    {
                        title: '注册时间',
                        dataIndex: 'create_time',
                        key: 'create_time'
                    },
                    {
                        title: '上次登录时间',
                        dataIndex: 'last_login',
                        key: 'last_login'
                    },
                    {
                        title: '操作',
                        key: 'action'
                    }
                ],
                visible: false,
                dialogFormVisible: false,
                form: {
                    specialist_license: '',
                    id: ''
                }
            }
        },

        created() {
        },

        mounted() {
            this.dataSource = response.data;
            // 获取专家列表
            request({
                url: '/account/back_get_specialist_users',
                methods: 'get'
            }).then(res => {
                window.console.log(res);
                // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
                this.dataSource = res
            })

        },

        methods: {
            handleClick(tab) {
                console.log(tab)
            },
            handleRemove(index, tabKey) {
                this.dataSource[tabKey].splice(index, 1)
            },
            handleMod(row, index, tabKey) {
                this.$set(this.dataSource[tabKey], index, row)
            },
            verified(row) {
                this.form.specialist_license = row.specialist_license;
                this.form.id = row.userID;
                this.dialogFormVisible = true;
            },
            confirm() {
                request({
                    url: '/account/confirm_specialist',
                    method: 'get',
                    params: {
                        user_id: this.form.id
                    }
                }).then(res => {
                    request({
                        url: '/account/back_get_specialist_users',
                        methods: 'get'
                    }).then(res => {
                        window.console.log(res);
                        // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
                        this.dataSource = res;
                        this.dialogFormVisible=false;
                        this.form={
                            specialist_license: '',
                            id: ''
                        }
                    })
                })
            },
            refuse() {
                request({
                    url: '/account/refuse_specialist',
                    method: 'get',
                    params: {
                        user_id: this.form.id
                    }
                }).then(res => {
                    request({
                        url: '/account/back_get_specialist_users',
                        methods: 'get'
                    }).then(res => {
                        window.console.log(res);
                        // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
                        this.dataSource = res;
                        this.dialogFormVisible=false;
                        this.form={
                            specialist_license: '',
                            id: ''
                        }
                    })
                })
            }
        }
    }

</script>

<style>
    .tab-table {

    }
</style>
