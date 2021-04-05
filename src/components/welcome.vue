<template>
  <div>
    <el-menu
      :unique-opened="true"
      :default-active="$route.path"
      mode="horizontal"
      class="el-menu-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#1EAEFF" router>
      <el-submenu index="0">
        <template slot="title">操作中心</template>
        <el-menu-item v-for="(child) in $router.options.routes[0].children" :index="child.path" :key="child.path"
                      v-show="$store.state.username!=='admin'" class="nav_item">{{child.name}}
        </el-menu-item>
        <el-menu-item index="/ApproveConference" v-show="$store.state.username==='admin'" class="nav_item">会议审批</el-menu-item>
      </el-submenu>

      <el-submenu v-for="(item,index) in $router.options.routes" :key="index+''" :index="index+''"
                  v-if="index<3&&index>0" v-show="$store.state.username!=='admin'">
        <template slot="title">{{item.name}}</template>
        <el-menu-item v-for="(item2) in item.children" :index="item2.path" :key="item2.path" class="nav_item">{{item2.name}}
        </el-menu-item>
      </el-submenu>

      <el-submenu index="user" style="float:right">
        <template slot="title"><i class="el-icon-user" style="color: white"></i>{{$store.state.username}}</template>
        <p class="quit_nav"  @click="quit" >注销</p>
      </el-submenu>
    </el-menu>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
  export default {
    name: 'UserPage',
    data(){
      return{
      }
    },
    methods: {
      quit: function (path) {
        this.$confirm('真的要注销账户吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$message({
            showClose: true,
            type: 'success',
            message: '注销成功'
          });
          this.$store.commit('logout');
          this.$router.push("/");
        }).catch(() => {
          this.$message({
            showClose: true,
            type: 'info',
            message: '已取消注销'
          });

        });
      }

    },
  }
</script>

<style>
  .news_type{
    font-size: 14px;
    color:white;
    padding:0 10px 0 20px;
    cursor:default;
  }
  .quit_nav{
    color: white;
    font-size: 14px;
    padding:7px 10px 5px 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .quit_nav:hover{
    cursor: pointer;
    background: rgba(0,0,0,0.15);
  }
  .el-menu.el-menu--popup{
    min-width:115px;
  }
  .el-menu-item.nav_item{
    margin-left:10px;
    margin-right:10px;
  }
  .el-badge__content--undefined{
    margin-left:5px;
    margin-bottom:5px;
  }
  .el-badge__content.is-fixed{
    top: 12px !important;
  }
</style>
<style scoped>
  .router {
    color: white;
    text-decoration: none;
  }
  .more_news{
    text-align: center;
  }
</style>
