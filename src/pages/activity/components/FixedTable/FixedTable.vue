<template>
    <div className="fixed-table">
        <basic-container>
            <el-table
                    :data="tableData3"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="create_time"
                        label="日期"
                >
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="活动名"
                >
                </el-table-column>
                <el-table-column
                        prop="url"
                        label="活动目标"
                >
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类型"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.type_type"
                                close-transition>{{scope.row.type_name}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cover"
                        label="封面"
                >
                    <template slot-scope="scope">
                        <img :src="scope.row.cover" style="width: 100%;height: auto;">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="nickname"
                        label="发布人"
                >
                </el-table-column>
                <el-table-column
                        prop="state"
                        label="状态"

                >
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.state===0?'success':'error'"
                                close-transition>{{scope.row.state===0?'正常':'已清除'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
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
        <el-dialog title="修改标签" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="目标地址">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-input v-model="form.cover"></el-input>
                    <el-upload
                            class="upload-demo"
                            action="https://hanerx.tk:5000/api/upload/upload_picture"
                            :on-success="set_cover"
                            :on-remove="remove"
                            :file-list="upload_files"
                            :multiple="false"
                            name="picture"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-select :value="form.type" placeholder="请选择">
                        <el-option
                                key="2"
                                label="文章活动"
                                :value="2">
                        </el-option>
                        <el-option
                                key="3"
                                label="创作活动"
                                :value="3">
                        </el-option>
                        <el-option
                                key="4"
                                label="企业活动"
                                :value="4">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clear">取 消</el-button>
                <el-button type="primary" @click="edit_activity">修改</el-button>
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
                form: {
                    id:undefined,
                    title: undefined,
                    url: undefined,
                    cover: undefined,
                    type: undefined
                },
                dialogFormVisible: false,
                upload_files: [],
            }
        },
        methods: {
            handleEdit(index, row) {
                this.dialogFormVisible = true;
                this.form = {
                    id: row.activityID,
                    title: row.title,
                    url: row.url,
                    cover: row.cover,
                    type: row.type
                }
            },
            handleDelete(index, row) {
                request({
                    url: '/activities/delete_activity',
                    method: 'get',
                    params: {
                        id: row.activityID
                    }
                }).then(res => {
                    this.get_all_activities()
                })
            },
            get_all_activities() {
                request({
                    url: '/activities/get_all_activities',
                    method: 'get',
                }).then(res => {
                    res.forEach(value => {
                        switch (value['type']) {
                            case 2:
                                value['type_name'] = '文章活动';
                                value['type_type'] = 'success';
                                break;
                            case 3:
                                value['type_name'] = '创作活动';
                                value['type_type'] = 'warning';
                                break;
                            case 4:
                                value['type_name'] = '企业活动';
                                value['type_type'] = 'primary';
                                break;
                        }
                    });
                    this.tableData3 = res
                })
            },
            set_cover(response, file, fileList) {
                if (response.code === 1) {
                    this.form.cover = response.data;
                }
            },
            remove() {
                this.form.cover = ''
            },
            edit_activity() {
                let data = {
                    id: this.form.id,
                    title: this.form.title,
                    url: this.form.url,
                    cover: this.form.cover,
                    type: this.form.type
                };
                data = qs.stringify(data);
                request({
                    url: '/activities/edit_activity',
                    method: 'post',
                    data
                }).then(res => {
                    this.dialogFormVisible = false;
                    this.form = {
                        id:undefined,
                        title: undefined,
                        url: undefined,
                        cover: undefined,
                        type: undefined
                    };
                    this.get_all_activities();
                })
            },
            clear() {
                this.dialogFormVisible = false;
                this.form = {
                    id:undefined,
                    title: undefined,
                    url: undefined,
                    cover: undefined,
                    type: undefined
                };
            }
        }, mounted() {
            this.get_all_activities();
        }
    }
</script>

<style>
    .fixed-table {

    }
</style>
