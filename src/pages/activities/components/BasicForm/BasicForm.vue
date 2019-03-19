<template>
    <div className="basic-form">
        <basic-container>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="活动名称">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="目标地址">
                    <el-input v-model="ruleForm.url"></el-input>
                </el-form-item>
                <el-form-item label="封面">
                    <el-input v-model="ruleForm.cover"></el-input>
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
                    <el-select :value="ruleForm.type" placeholder="请选择">
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
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </basic-container>
    </div>
</template>

<script>
    import BasicContainer from '@vue-materials/basic-container'
    import request from '@/plugin/axios'
    import qs from 'qs'

    export default {
        components: {BasicContainer},
        name: 'BasicForm',

        data() {
            return {
                ruleForm: {
                    name: '',
                    link: '',
                    type: '',
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
                    ],
                    link: [
                        {required: true, message: '请输入地址', trigger: 'change'}
                    ],
                    type: [
                        {required: true, message: '请选择推荐内容类型', trigger: 'change'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = this.ruleForm;
                        request({
                            url: '/activities/add_activity',
                            method: 'post',
                            data
                        }).then(res => {

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }

</script>

<style>
    .basic-form {

    }
</style>
