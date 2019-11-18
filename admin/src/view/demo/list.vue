<template>
  <div>
    <Form ref="formInline" :model="map" inline>
      <FormItem>
        <Button type="primary" icon="plus" @click="add">添加demo</Button>
      </FormItem>
    </Form>
    <Table border :loading="loading" :columns="columns" :data="data.data"></Table>
    <Page class="page" :total="data.count" :page-size="data.pagesize" show-total  @on-change="changePage"></Page>
  </div>
</template>
<script>
import { demo } from "@/api";
import { Button, Page, Table, Form, FormItem } from "iview";
export default {
  components: {
    Button,
    Table,
    Form,
    Page,
    FormItem
  },
  data() {
    return {
      loading: true,
      columns: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "浏览量",
          width: 100,
          align: "center",
          key: "view"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "edit"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: "/demo/save",
                      query: {
                        slug: params.row.slug
                      }
                    });
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "error",
                  size: "small",
                  icon: "trash-a"
                },
                on: {
                  click: () => {
                    if (confirm("确定要删除吗？")) {
                      this.delete(params.row.id, params.index);
                    }
                  }
                }
              })
            ]);
          }
        }
      ],
      data: {},
      map:{
        page:1,
        key:"",
        all:1,
        pageSize:10,
      }
    };
  },
  methods: {
    getList() {
      this.loading=true;
      demo.getList(this.map).then(res => {
        this.data = res.data;
        this.loading = false;
      });
    },
    delete(id) {
      demo.delete(id).then(res => {
        this.data.splice(index, 1);
      });
    },
    changePage(index){
      this.map.page=index;
      this.getList();
    },
    add() {
      this.$router.push("/demo/save");
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
