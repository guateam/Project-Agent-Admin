<template>
    <div class="select-table">
        <basic-container>
            <el-row v-show="selections.length > 0" :gutter="10">
                <el-col :span="2">
                    <el-button
                            :disabled="selections.length !== 2"
                            @click="handleView(selections[0])"
                            type="primary"
                            size="small">合并
                    </el-button>
                </el-col>
                <el-col :span="2">
                    <el-button
                            @click="handleDelete(selections.map(i => i.id))"
                            type="danger"
                            size="small">删除
                    </el-button>
                </el-col>
            </el-row>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="ID"
                        width="100">
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
                                type="primary"
                                close-transition>二级标签
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="500">
                    <template slot-scope="scope">
                        <el-button
                                @click="handleEdit(scope.row)"
                                type="primary"
                                size="small">修改
                        </el-button>
                        <el-button
                                @click="handleCreate(scope.row)"
                                type="success"
                                size="small">新建
                        </el-button>
                        <el-button
                                @click="handleDelete([scope.row].map(i => i.id))"
                                type="danger"
                                size="small">删除
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
    import BasicContainer from '@vue-materials/basic-container';
    import request from '@/plugin/axios'
    import qs from 'qs'

    export default {
        components: {BasicContainer},
        name: 'SelectTable',
        data() {
            return {
                tableData: [],
                selections: [],
                dialogFormVisible1: false,
                dialogFormVisible2: false,
                form: {
                    id: undefined,
                    name: '',
                    type: 2,
                }
            };
        },
        methods: {
            handleSelectionChange(val) {
                this.selections = val;
            },
            handleDelete(idArray) {
                this.tableData = this.tableData.filter(i => !idArray.includes(i.id));
            },
            handleView(row) {

            },
            handleEdit(row) {
                this.dialogFormVisible1 = true;
                this.form = {
                    id: row.id,
                    name: row.name,
                    type: row.type,
                    father: row.father
                }
            },
            handleCreate() {
                this.dialogFormVisible2 = true;
                this.form = {
                    id: undefined,
                    name: '',
                    type: 2,
                    father: this.$route.query.id
                }
            },
            get_second_tag() {
                request({
                    url: '/tags/get_child_tag',
                    method: 'get',
                    params: {
                        tag_id: this.$route.query.id
                    }
                }).then(res => {
                    window.console.log(res);
                    // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
                    this.tableData = res
                })
            },
            add_tag() {
                let data = {
                    name: this.form.name,
                    tag_type: 1,
                    father: this.$route.query.id
                };
                data = qs.stringify(data);
                request({
                    url: '/tags/back_add_tag',
                    method: 'post',
                    data
                }).then(res => {
                    this.get_second_tag();
                    this.dialogFormVisible2 = false;
                    this.form = {
                        id: undefined,
                        name: '',
                        type: 2,
                    }
                })
            },
            edit_tag() {
                let data = {
                    id: this.form.id,
                    name: this.form.name,
                    type: 2,
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
                        type: 2,
                    }
                })
            },
        },
        mounted() {
            this.get_second_tag()
        }
    };
</script>

<style>
    .select-table {
    }
</style>
