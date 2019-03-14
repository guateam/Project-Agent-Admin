<template>
    <div class="tag-message-list">
        <basic-container>
            <el-tabs  @tab-click="handleClick">
                <el-tab-pane label="待审核文章" name="message">
                    <div class="message-item" v-for="message in checking_list" :key="message.title" v-show="message.display == true">
                        <a href="##" @click="open(message)" class="title">
                            {{message.title}}
                        </a>
                        <div class="date">{{message.edittime}}</div>
                        <el-button type="success" @click="open(message)">查看内容</el-button>
                        <el-button type="primary" @click="pass(message)">通过审核</el-button>
                        <el-button type="danger" @click="unpass(message)">不通过审核</el-button>
                    </div>
                    <!--<el-button type="text" class="show-more"> 查看全部文章</el-button>-->
                </el-tab-pane>
                <el-tab-pane label="已审核通过" name="todo">
                    <div class="message-item" v-for="message in done_list" :key="message.title" v-show="message.display == true">
                        <a href="##"  @click="open(message)" class="title">
                            {{message.title}}
                        </a>
                        <div class="date">{{message.edittime}}</div>
                        <el-button type="success" @click="open(message)">查看内容</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </basic-container>
    </div>
</template>

<script>
import BasicContainer from '@vue-materials/basic-container';
import request from '@/plugin/axios'
import util from '@/libs/util'

export default {
    components: { BasicContainer },
    name: 'TagMessageList',
    data() {
        return {
            activeTab: 'message',
            checking_list: [],
            done_list:[]
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab.name);
        },
        get_list() {
            request({
                url: '/article/back_get_articles',
                methods: 'get',
                params:{
                    token:util.cookies.get('token')
                }
            }).then(res => {
                window.console.log(res);
                // 下面一行是替换表格内容为后台数据，接口确认无误后应取消注释
                this.checking_list = res['checking']
                this.done_list = res['normal']
            })
        },
        open(msg){
            this.$alert(msg.content, msg.title, {
                confirmButtonText: '确定',
                callback: action => {
                }
            });
        },
        pass(it){
            let id = it.articleID;
            this.$confirm('确认通过审核吗?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request({
                    url: '/article/pass_article',
                    methods: 'get',
                    params:{
                        id:id
                    }
                }).then(res => {
                    window.console.log(res);
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    it.display = false;
                })

                
            }).catch(() => {
        
            });
        },
        unpass(it){
            let id = it.articleID;
            this.$confirm('确认不通过审核吗?', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request({
                    url: '/article/unpass_article',
                    methods: 'get',
                    params:{
                        id:id
                    }
                }).then(res => {
                    window.console.log(res);
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    it.display = false;
                })

            }).catch(() => {
        
            });
        }
    },
    mounted(){
        this.get_list()
    },
};
</script>
<style scoped lang="scss">
@import '~normalize.css/normalize.css';
.tag-message-list {
  .el-tabs__content {
    color: #666;
    font-size: 14px;
  }

  .message-item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid rgb(244, 244, 244);

    a.title {
      color: #666;
      text-decoration: none;
    }
    .date {
      font-size: 12px;
    }
  }
  .show-more {
    display: block;
    margin: 20px auto 0;
    padding: 0;
  }
}
</style>
