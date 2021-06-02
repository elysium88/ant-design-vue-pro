<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
        width="256"
      >
        <div class="logo">Ant Design Vue Pro</div>
        <SiderMenu
          ref="siderMenu"
          :theme="navTheme"
          :collapsed="collapsed"
          @openKeysChange="openKeysChange"
        />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <!--          v-auth 指令式权限控制-->
          <a-icon
            v-auth="['admin']"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggleCollapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>

    <!--函数式组件 权限控制-->
    <Authorized :authority="['admin']">
      <SettingDrawer />
    </Authorized>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer";

export default {
  name: "BasicLayout",
  components: { Header, Footer, SiderMenu, SettingDrawer },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  data() {
    return {
      collapsed: false,
      tempOpenKeys: [],
    };
  },
  methods: {
    toggleCollapsed() {
      if (!this.collapsed) {
        this.tempOpenKeys = this.$refs.siderMenu.openKeys;
        this.$refs.siderMenu.openKeys = [];
      } else {
        this.$refs.siderMenu.openKeys = this.tempOpenKeys;
      }
      this.collapsed = !this.collapsed;
    },
    //监听openKeys变化 便于菜单栏收起展开时 还能继续显示打开的状态
    openKeysChange(openkeys) {
      this.tempOpenKeys = openkeys;
    },
  },
};
</script>

<style scoped lang="less">
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;

  &:hover {
    background-color: #eeeeee;
  }
}

.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}

.nav-theme-dark /deep/ .logo {
  color: #fff;
}
</style>
