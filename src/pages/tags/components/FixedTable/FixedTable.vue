<template>
    <div className="fixed-table">
        <basic-container>
            <el-table
                    :data="tableData3"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="ID"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="标签名"
                        width="400">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="种类"
                        width="500"
                >
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.tag === '家' ? 'primary' : 'success'"
                                close-transition>一级标签
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">

                        <el-button
                                size="mini"
                                type="primary"
                                @click="$router.push({path:'/secondtags',query:{id:scope.row.id}})">管理子标签
                        </el-button>
                        <el-button
                                size="mini"
                                type="success"
                                @click="handleCreate(scope.$index, scope.row)">新建
                        </el-button>
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </basic-container>
        <el-dialog title="修改标签" :visible.sync="dialogFormVisible1">
            <el-form :model="form">
                <el-form-item label="标签名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="edit_tag()">修改</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新建标签" :visible.sync="dialogFormVisible2">
            <el-form :model="form">
                <el-form-item label="标签名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="add_tag()">新建</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import BasicContainer from '@vue-materials/basic-container'
    import request from '@/plugin/axios'
    import qs from 'qs'

    export default {
        components: {BasicContainer},
        name: 'FixedTable',

        data() {
            return {
                tableData3: [],
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                form: {
                    id: undefined,
                    name: '',
                    type: 1,
                }
            }
        },
        methods: {
            get_first_tags() {
                request({
                    url: '/tags/get_first_tag',
                    method: 'get'
                }).then(res => {
                    window.console.log(res);
                    // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
                    this.tableData3 = res
                })
            },
            handleEdit(index, row) {
                this.dialogFormVisible1 = true;
                this.form = row;
            },
            handleDelete(index, row) {
                request({
                    url: '/tags/delete_tag',
                    method: 'get',
                    params: {
                        tag_id: row.id
                    }
                }).then(res => {
                    this.get_first_tags();
                })
            },
            handleCreate(index, row) {
                this.dialogFormVisible2 = true;
                this.form = {
                    id: undefined,
                    name: '',
                    type: 1,
                }
            },
            edit_tag() {
                let data = {
                    id: this.form.id,
                    name: this.form.name,
                    type: 1,
                };
                data = qs.stringify(data);
                request({
                    url: '/tags/edit_tag',
                    method: 'post',
                    data
                }).then(res => {
                    this.get_first_tags();
                    this.dialogFormVisible1 = false;
                    this.form = {
                        id: undefined,
                        name: '',
                        type: 1,
                    }
                })
            },
            add_tag() {
                let data = {
                    name: this.form.name,
                    tag_type: 1,
                };
                data = qs.stringify(data);
                request({
                    url: '/tags/back_add_tag',
                    method: 'post',
                    data
                }).then(res => {
                    this.get_first_tags();
                    this.dialogFormVisible2 = false;
                    this.form = {
                        id: undefined,
                        name: '',
                        type: 1,
                    }
                })
            }
        },
        mounted() {
            this.get_first_tags()
        }
    }
</script>

<style>
    .fixed-table {

    }
</style>
