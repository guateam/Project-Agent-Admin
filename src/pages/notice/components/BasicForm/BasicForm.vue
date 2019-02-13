<template>
    <div className="basic-form">
        <basic-container>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="通知名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="通知类型" prop="type">
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio label="全网通知" value="0"></el-radio>
                        <el-radio label="单点通知" value="1"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="通知目标" prop="target">
                    <el-input v-model="ruleForm.target"></el-input>
                </el-form-item>
                <el-form-item label="通知内容" prop="content">
                    <el-input type="textarea" v-model="ruleForm.content" :rows="13"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">发布通知</el-button>
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
                target: false,
                ruleForm: {
                    name: '',
                    type: 0,
                    target: '',
                    content: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入通知名称', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '请选择通知类型', trigger: 'change'}
                    ],
                    target: [
                        {required: false, message: '请填写通知目标', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请填写通知内容', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    let data = qs.stringify({
                        'type': this.ruleForm.type,
                        'content': this.ruleForm.content,
                        'target': this.ruleForm.target,
                        'name':this.ruleForm.name
                    });
                    request({
                        url: '/message/add_sys_notice',
                        method: 'post',
                        data
                    }).then(() => {
                        this.resetForm(formName)
                    })
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
