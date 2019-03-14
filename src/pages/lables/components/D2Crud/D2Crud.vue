<template>
  <div class="d2-crud">
    <!-- 使用方法请参考文档和示例 -->
    <!-- 文档： https://d2-projects.github.io/d2-admin-doc/zh/ecosystem-d2-crud/ -->
    <!-- 示例： https://d2-projects.github.io/d2-admin/#/demo/d2-crud/index -->
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="data"
      title="D2 CRUD"
      selection-row
      index-row
      add-mode
      :add-button="addButton"
      :rowHandle="rowHandle"
      :form-template="formTemplate"
      :form-rules="formRules"
      :form-options="formOptions"
      @row-add="handleRowAdd"
      @row-edit="handleRowEdit"
      @row-remove="handleRowRemove"
      @dialog-cancel="handleDialogCancel"
      @selection-change="handleSelectionChange"/>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'

Vue.use(D2Crud)

export default {
  data() {
    return {
      columns: [
        {
          title: '标签',
          key: 'lable',
          width: '300'
        },
      ],
      data: [
        {
          lable: '互联网',
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true
        },
        {
          lable: '生物',
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true
        },
        {
          lable: '设计',
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true
        },
        {
          lable: '管理',
          forbidEdit: false,
          showEditButton: true,
          forbidRemove: false,
          showRemoveButton: true
        }
      ],
      addButton: {
        icon: 'el-icon-plus',
        size: 'small'
      },
      rowHandle: {
        columnHeader: '操作',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small',
          show (index, row) {
            if (row.showEditButton) {
              return true
            }
            return false
          },
          disabled (index, row) {
            if (row.forbidEdit) {
              return true
            }
            return false
          }
        },
        remove: {
          icon: 'el-icon-delete',
          size: 'small',
          fixed: 'right',
          confirm: true,
          show (index, row) {
            if (row.showRemoveButton) {
              return true
            }
            return false
          },
          disabled (index, row) {
            if (row.forbidRemove) {
              return true
            }
            return false
          }
        }
      },
      formTemplate: {
        lable: {
          title: '标签',
          value: '',
          component: {
            span: 20
          }
        },
      },
      formRules: {
        lable: [ { required: true, message: '请输入标签名', trigger: 'blur' } ]
      },
      formOptions: {
        labelWidth: '200px',
        labelPosition: 'left',
        saveLoading: false,
        gutter: 25
      }
    }
  },
  methods: {
    handleRowAdd (row, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(row)
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        done()
        this.formOptions.saveLoading = false
      }, 300);
    },
    handleRowEdit ({index, row}, done) {
      this.formOptions.saveLoading = true
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleRowRemove ({index, row}, done) {
      setTimeout(() => {
        console.log(index)
        console.log(row)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        done()
      }, 300)
    },
    handleDialogCancel (done) {
      this.$message({
        message: '取消保存',
        type: 'warning'
      });
      done()
    },
    handleSelectionChange (selection) {
      console.log(selection)
    }
  }
}

</script>
