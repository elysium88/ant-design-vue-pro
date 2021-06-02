<template>
  <div style="width: 256px">
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" type="pie-chart" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
import { check } from "../utils/auth";
export default {
  props: {
    theme: {
      default: "dark",
      type: String,
    },
  },
  components: {
    "sub-menu": SubMenu,
  },
  watch: {
    "$route.path": function (val) {
      //根据点击的路由信息，获取选中的菜单项和打开的菜单项
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
      this.$emit("openKeysChange", this.openKeys);
    },
  },
  data() {
    //保存路由表的选择的路由信息键值对
    this.selectedKeysMap = {};
    //保存路由表的打开的路由信息键值对
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path], //当前选中的菜单项 key 数组
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path], //当前展开的 SubMenu 菜单项 key 数组
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },

    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let item of routes) {
        //没有权限不生成路由
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }

        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hideChildrenMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else {
            //hideChildrenMenu为true时，隐藏子菜单，如果子菜单打开时，菜单栏也要对应显示父节点的菜单项
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
      }

      return menuData;
    },
  },
};
</script>

<style scoped></style>
