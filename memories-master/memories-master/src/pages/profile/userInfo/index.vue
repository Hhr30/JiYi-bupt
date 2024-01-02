<template>
  <el-container>
    <el-aside class="aside-wrapper" width="240px">
      <span class="aside-title aside-text">用户信息管理</span>

      <div class="aside-list">
        <el-row
          v-for="(item, index) in asideButtonList"
          :key="index"
          :class="{
            'aside-item': true,
            'aside-text': true,
            'active': item.key === asideActiveKey
          }"
        >
          <div @click="clickAsideButtonHandle(item)">{{item.text}}</div>
        </el-row>
      </div>

      <el-button class="aside-text exit-profile" type="text" @click="exitProfile">退出登录</el-button>
    </el-aside>
    <el-main :style="{ padding: '0px' }">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "userInfo",
  provide() {
    return {
      reload: (asideActiveKey) => {
        this.asideActiveKey = asideActiveKey
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const result = to.path.match(/(?<=userInfo\/)\w+/g)
      const asideActiveKey = result && result[0] || vm.asideActiveKey
      if (asideActiveKey !== vm.asideActiveKey) {
        vm.asideActiveKey = asideActiveKey
      }
    })
  },
  data() {
    return {
      asideActiveKey: '',
      asideButtonList: [
        {
          text: '基本信息',
          routePath: '',
          key: ''
        },
        {
          text: '实名认证',
          routePath: 'verified',
          key: 'verified'
        },
        {
          text: '作品管理',
          routePath: 'worksManager',
          key: 'worksManager'
        },
        {
          text: '我的藏品',
          routePath: 'userCollection',
          key: 'userCollection'
        },
      ]
    }
  },
  watch: {
    asideActiveKey:{
      handler(newValue, oldValue) {
        this.$router.push(`/userProfile/userInfo/${newValue}`)
      }
    }
  },
  created() {
    console.log(this.$router)
    console.log(this.$route)
    const route = this.$route
    const path = route.path
    this.asideButtonList.some(item => {
      if (path.indexOf(item.key) === 0) {
        this.asideActiveKey = ''
        return true
      } else if (path.indexOf(item.key) !== -1) {
        this.asideActiveKey = item.key
        return true
      }
    })
  },
  methods: {
    // 点击侧边栏选项，切换到不同的页面
    clickAsideButtonHandle({ key, routePath }) {
      this.asideActiveKey = key
    },
    // 退出登录
    exitProfile() {
      this.$cookies.remove('token')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
  ul,li {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

  .aside-wrapper {
    background: #FFFFFF;
    border-right: 1px solid #E1E1E1;

    .aside-text {
      padding-left: 40px;
      text-align: left;
    }

    .aside-title {
      display: block;
      margin: 50px 0;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      color: #121212;
    }

    .aside-list {
      .aside-item {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        color: #7E7E7E;
        height: 40px;

        &:hover {
          color: #326CC2;
          background: #f3f3f3;
          cursor: pointer;
        }

        & div {
          line-height: 40px;
        }

        &.active {
          background: #EAEAEA;
          color: #326CC2;
        }
      }
    }


    .exit-profile {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #EA5757;
      width: 100px;
      text-align: center;
      display: block;
      padding: 10px 0;
      margin: 0 auto;
      margin-top: 400px;

      &:hover {
          color: #e72d2d;
          background: #f3f3f3;
          cursor: pointer;
        }
    }
  }
</style>