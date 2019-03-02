
<template>
  <div className="basic-form">
    <basic-container>
      
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="name" style="width:500px;">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="link" style="width:500px;">
          <el-input v-model="ruleForm.link"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <!-- 我也不是很确定要哪些类型，需要再加！ -->
            <el-option label="付费课程" value="lesson"></el-option>
            <el-option label="文章" value="article"></el-option>
            <el-option label="活动" value="activities"></el-option>
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

export default {
  components: { BasicContainer },
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
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请选择推荐内容类型', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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
