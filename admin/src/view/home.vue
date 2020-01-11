<template>
  <div class="home-main">
    <Row :gutter="10">
      <Col :md="24" :lg="24">
      <Row class-name="home-page-row1" :gutter="10">
        <Col :md="8" :lg="8" :style="{marginBottom: '10px',height:'300px'}">
        <Card style="height:100%;">
          <Row type="flex" class="user-infor">
            <Col span="8">
            <Row class-name="made-child-con-middle" type="flex" align="middle">
              <img class="avator-img" :src="userInfo.avator" />
            </Row>
            </Col>
            <Col span="16" style="padding-left:6px;">
            <Row class-name="made-child-con-middle" type="flex" align="middle">
              <div>
                <b class="card-user-infor-name">{{userInfo.username}}</b>
              </div>
            </Row>
            </Col>
          </Row>
          <div class="line-gray"></div>
          <Row class="margin-top-8">
            <Col span="8">
            <p class="notwrap">上次登录时间:</p>
            </Col>
            <Col span="16" class="padding-left-8">{{userInfo.last_login_time|date}}</Col>
          </Row>
        </Card>
        </Col>
        <Col :md="16" :lg="16" :style="{marginBottom: '10px',height:'300px'}">
        <Card style="height:100%;">
        <div id="archives" style="height:300px;">
        </div>
        </Card>
        </Col>
      </Row>
      </Col>
      <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
      <Card style="height:100%;">
          <div id="hot" style="height:300px;">
          </div>
      </Card>
      </Col>
    </Row>
    <Table border :loading="loading" :columns="columns" :data="data.data"></Table>
    <Page class="page" :total="data.count" :page-size="data.pagesize" show-total @on-change="changePage"></Page>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { content, visitor } from "@/api";
import { Row, Col, Card, Table, Page } from 'iview';
import echarts from 'echarts';
export default {
  components: {
    Row,
    Col,
    Table,
    Page,
    Card
  },
  data() {
    return {
      loading: true,
      columns: [
        {
          title: "访客IP",
          key: "ip"
        },
        {
          title: "访问界面",
          key: "url"
        },
        {
          title: "设备信息",
          key: "agent"
        },
        {
          title: "首次访问时间",
          key: "first_time",
          align: "center",
          render: (h, params) => {
            if (!params.row.first_time) return "";
            return h('span',new Date(params.row.first_time * 1000).toLocaleString());
          }
        },
        {
          title: "访问次数",
          key: "num",
          width: 100,
          align: "center"
        },
        {
          title: "最新访问时间",
          key: "update_time",
          width: 200,
          align: "center",
          render: (h, params) => {
            if (!params.row.update_time) return "";
            return h('span',new Date(params.row.update_time * 1000).toLocaleString());
          }
        }
      ],
      data: {},
      map:{
        page:1,
        key:"",
        all:1,
        pageSize:10,
        contentType:'post'
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.admin.user.info
    })
  },
  filters: {
    date: function(value) {
      if (!value) return "";
      return new Date(value * 1000).toLocaleString();
    }
  },
  mounted() {
    this.setHotMap();
    this.setArchivesMap();
    this.getVisitor();
  },
  methods: {
    setHotMap() {
      let myChart = echarts.init(document.getElementById('hot'));
      content.getList({ 'type': 'hot' }).then(res => {
        let xAxisData = [];
        let seriesData = [];
        for (let i in res.data.data) {
          xAxisData.push(res.data.data[i].title);
          seriesData.push(res.data.data[i].view);
        }
        myChart.setOption({
          title: { text: '热门文章' },
          tooltip: {},
          xAxis: { data: xAxisData, axisLine: { lineStyle: { color: '#495060' } } },
          yAxis: { axisLine: { lineStyle: { color: '#495060' } } },
          series: [{ name: '点击次数', type: 'bar', barWidth: 10, data: seriesData }]
        });
      });
    },
    setArchivesMap() {
      let myChart = echarts.init(document.getElementById('archives'));
      content.getList({ 'type': 'archives' }).then(res => {
        let monthsData = {};
        let xAxisData = [];
        let seriesData = [];
        let max = 10;
        for (let i in res.data.data) {
          let date = new Date(res.data.data[i].create_time * 1000);
          let key = date.getFullYear() + '-' + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
          monthsData[key] = monthsData[key] ? monthsData[key] + 1 : 1;
          if (monthsData[key] > max) {
            max = monthsData[key];
          }
        }
        let date = new Date();
        let nearThree = [];
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        for (let i = 11; i >= 0; i--) {
          let key;
          if (month - i > 0) {
            key = year + '-' + ((month - i) > 9 ? (month - i) : '0' + (month - i));
          } else {
            key = (year - 1) + '-' + ((month - i + 12) > 9 ? (month - i + 12) : '0' + (month - i + 12));
          }
          xAxisData.push(key);
          seriesData.push(monthsData[key] ? monthsData[key] : 0);
        }
        myChart.setOption({
          title: { text: '发布频率' },
          tooltip: { trigger: 'axis' },
          xAxis: { data: xAxisData, axisLine: { lineStyle: { color: '#495060' } } },
          yAxis: { max: max,axisLine: { lineStyle: { color: '#495060' } } },
          series: [{ name: '文章数量', type: 'line', data: seriesData }]
        });

      });
    },
    getVisitor() {
      visitor.getList(this.map).then(res => {
        this.data = res.data;
        console.log(this.data);

        this.loading = false
      })
    },
    changePage(index){
      this.map.page = index;
      this.getVisitor();
    },
  }
};
</script>
