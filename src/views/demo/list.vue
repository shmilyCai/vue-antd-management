<template>
  <div class="content-wrapper">
    <search-header :searchConfig="searchConfig" @search="getList">
    </search-header>
    <table-list
      @getList="getList"
      :columns="listColumns"
      :dataSource="dataSource"
      :pageInfo="pagination"
    >
      <template slot="handleBtn" slot-scope="props">
        <div class="table-label-row">
          <span>label</span>
          <div>
            <a-button
              v-for="(item, index) in handleList"
              class="m-r-10"
              :key="index"
              @click="handleFn(item, props)"
              :type="item.buttonType || ''"
              :icon="item.icon"
              >{{ item.name }}</a-button
            >
          </div>
        </div>
      </template>
      <template slot="opreation" slot-scope="props">
        <a @click="modifyFuc(props)">修改</a>
        <a @click="deleteFuc(props)">删除</a>
      </template>
    </table-list>
    <add-modal
      :formData="formData"
      :visible="formModalVisible"
      :formConfig="formConfig"
      @onClose="formModalVisible = false"
    />
  </div>
</template>

<script>
import { searchConfig, listColumns, formModalConfig } from "./formConfig";
import { listMixin } from "@mixins/listMixin";
import { listApi, listDeleteApi } from "@api";
export default {
  mixins: [listMixin],
  data() {
    return {
      handleList: [
        {
          name: "添加模板",
          buttonType: "primary",
          icon: "plus",
          handleFuc: "addFuc",
        },
        { name: "批量删除", handleFuc: "batchDeleteFuc" },
      ],
      searchConfig,
      listColumns,
      formConfig: formModalConfig(),
      api: {
        listApi,
        listDeleteApi,
      },
    };
  },
  created() {
    this.getBannerList();
    setTimeout(() => {
      this.searchConfig.id5.option = [
        { name: "张哥1", value: "haha1" },
        { name: "张哥2", value: "haha2" },
        { name: "张哥3", value: "haha3" },
      ];
      this.dataSource = [
        {
          id: "id1",
          priority: "",
          level: 1,
          content: "消息内容",
          user: "张哥",
          type: "模板1",
          verify_status: "待审核",
          use_status: "已使用",
        },
        {
          id: "id2",
          priority: "",
          level: 2,
          content: "消息内容",
          user: "张哥",
          type: "模板1",
          verify_status: "待审核",
          use_status: "已使用",
        },
      ];
    });
  },
  methods: {
    /**
     * search-header按钮事件
     */
    handleFn(item, props) {
      let { handleFuc } = item;
      this[handleFuc](item, props);
    },
  },
};
</script>

<style lang="scss" scoped></style>
