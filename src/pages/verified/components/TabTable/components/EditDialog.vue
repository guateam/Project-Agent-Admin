<template>
    <div :style="style.editDialog">
        <el-button @click="handleColumnClick(row)" type="primary" size="mini" round v-if="key === 'action'">查看详情
        </el-button>
        <el-dialog title="用户详情" :visible.sync="dialogFormVisible">
            <el-form :model="formRow" :rules="rules" ref="ruleForm">
                <el-form-item label="身份证" :label-width="formLabelWidth" prop="identity_card"
                              v-if="row['front_pic'] && row['back_pic']">
                    <img :src="'http://localhost:5000'+row['front_pic']" width="50%" height="270px">
                    <img :src="'http://localhost:5000'+row['back_pic']" width="50%" height="270px">
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="real_name">
                    <el-input v-model="formRow.real_name"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
                    <el-input v-model="formRow.gender"></el-input>
                </el-form-item>
                <el-form-item label="民族" :label-width="formLabelWidth" prop="nationality">
                    <el-input v-model="formRow.nationality"></el-input>
                </el-form-item>
                <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
                    <el-input v-model="formRow.birthday"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="formRow.address"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth" prop="number">
                    <el-input v-model="formRow.number"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('ruleForm')">审核通过</el-button>
                <el-button type="danger" @click="handleUnSubmit()">审核不通过</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import request from '@/plugin/axios'

    export default {
        data() {
            return {
                style: {
                    editDialog: {
                        display: 'inline-block',
                        marginRight: '5px',
                    },
                },
                dialogFormVisible: false,
                rules: {
                    real_name: [
                        {required: true, message: '必填选项', trigger: 'blur'},
                    ],
                    gender: [
                        {required: true, message: '必填选项', trigger: 'blur'}
                    ],
                    nationality: [
                        {required: true, message: '必填选项', trigger: 'blur'}
                    ],
                    birthday: [
                        {required: true, message: '必填选项', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '必填选项', trigger: 'blur'}
                    ],
                    number: [
                        {required: true, message: '必填选项', trigger: 'blur'}
                    ],
                },
                formLabelWidth: '80px',
            };
        },
        computed: {
            formRow() {
                return Object.assign({}, this.row);
            },
        },
        props: {
            row: {
                type: Object,
                default: {},
            },
            key: {
                type: String,
                default: '',
            },
            index: {
                type: Number,
                default: 0,
            },
            tabKey: {
                type: String,
                default: '',
            },
        },
        methods: {
            handleColumnClick(row) {
                this.dialogFormVisible = true;
            },
            handleSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    this.$emit('handleMod', this.formRow, this.index, this.tabKey);
                    let data=this.formRow;
                    request({
                        url: '/account/verify',
                        methods: 'post',
                        data: {
                            'user_id': data['userID'],
                            'real_name':data['real_name'],
                            'birthday':data['birthday'],
                            'nationality':data['nationality'],
                            'gender':data['gender'],
                            'address':data['address'],
                            'number':data['number']
                        },
                        transformRequest: [function (data) {
                            // Do whatever you want to transform the data
                            let ret = '';
                            for (let it in data) {
                                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                            }
                            return ret
                        }],
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then((data) => {

                    })
                });
            },
            handleUnSubmit() {
                let data = this.formRow;
                let that = this;
                request({
                    url: '/account/not_verify',
                    method: 'post',
                    data: {
                        'user_id': data['userID']
                    },
                    transformRequest: [function (data) {
                        // Do whatever you want to transform the data
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((data) => {
                    that.$emit('reloadData',this.formRow,this.index,this.tabKey);
                    this.dialogFormVisible = false;
                })
            }
        },
    };
</script>
