<template>
  <Form :model="formItem" ref="formItem" :rules="ruleInline" :label-width="80">
    <FormItem label="状态" prop="status">
      <RadioGroup v-model="formItem.status">
        <Radio :label="0">草稿</Radio>
        <Radio :label="1">发布</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="demo标题" prop="title">
      <Input v-model="formItem.title" placeholder="demo标题" style="width: 300px"></Input>
    </FormItem>
    <FormItem label="demo标识" prop="slug">
      <Input v-model="formItem.slug" placeholder="demo唯一标识，并作为参数构造url" style="width: 300px"></Input>
    </FormItem>
    <!-- <FormItem label="跳转展现" prop="direct_url">
      <RadioGroup v-model="formItem.direct_url">
        <Radio :label="0">否</Radio>
        <Radio :label="1">是</Radio>
      </RadioGroup>
    </FormItem> -->
    <FormItem label="缩略图" prop="thumb">
      <Input v-model="formItem.thumb" placeholder="使用编辑器上传得到地址" style="width: 300px"></Input>
    </FormItem>
    <FormItem label="发布时间" prop="date">
      <Row>
        <Col span="3" style="width:200px;">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
          </FormItem>
        </Col>
        <Col span="3" style="width:200px;">
          <FormItem prop="time">
            <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
          </FormItem>
        </Col>
      </Row>
    </FormItem>
    <FormItem label="demo内容">
      <div id="demo-content">
        <demo-editor
          :html="formItem.html"
          :css="formItem.css"
          :js="formItem.js"
          v-on:codeChange="codeChange"
        ></demo-editor>
      </div>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="demo">提交</Button>
    </FormItem>
  </Form>
</template>
<script>
import demoEditor from "@/view/common/demoEditor.vue";
import {
  Form,
  FormItem,
  Button,
  Col,
  Row,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  DatePicker,
  TimePicker,
  Select,
  Option,
  Input
} from "iview";
import { demo, image } from "@/api";
export default {
  components: {
    demoEditor,
    Form,
    FormItem,
    Button,
    Col,
    Row,
    CheckboxGroup,
    Checkbox,
    RadioGroup,
    Radio,
    DatePicker,
    TimePicker,
    Select,
    Option,
    Input
  },
  data() {
    return {
      formItem: {
        id: "",
        title: "",
        date: new Date(),
        time: new Date(),
        create_time: [],
        markdown: "",
        description: "",
        html: "",
        direct_url: 1,
        status: 1,
        css: "",
        js: "",
        content: ""
      },
      ruleInline: {
        status: [{ required: true, message: "请选择状态" }],
        title: [{ required: true, message: "demo标题必须填写" }],
        date: [{ required: true, message: "发布日期必须选择" }],
        time: [{ required: true, message: "发布时间必须选择" }]
      }
    };
  },
  methods: {
    demo() {
      // this.formItem.description = this.$refs["md"].d_render;
      this.formItem.description = '';
      //处理发布时间
      let seperator1 = "-";
      let seperator2 = ":";
      let month = this.formItem.date.getMonth() + 1;
      let strDate = this.formItem.date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.formItem.create_time =
        this.formItem.date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        this.formItem.date.getHours() +
        seperator2 +
        this.formItem.date.getMinutes() +
        seperator2 +
        this.formItem.date.getSeconds();

      //表单验证
      this.$refs["formItem"].validate(valid => {
        if (valid) {
          if (this.formItem.id) {
            //更新数据
            demo.update(this.formItem.id, this.formItem).then(res => {
              if (res.errno == 0 && res.data.id) {
                this.$router.push("/demo/list");
              }
            });
          } else {
            //新增数据
            demo.create(this.formItem).then(res => {
              if (res.errno == 0 && res.data.id) {
                this.$router.push("/demo/list");
              }
            });
          }
        } else {
          this.$Message.error("请填写必要信息");
        }
      });
    },
    get(id) {
      demo.getInfo(id).then(res => {
        let tag = [];
        for (var i in res.data.tag) {
          tag.push(res.data.tag[i].id);
        }
        res.data.tag = tag;
        res.data.date = new Date(res.data.create_time * 1000);
        res.data.time = new Date(res.data.create_time * 1000);
        console.log(res.data);

        this.formItem = res.data;
      });
    },
    codeChange(data) {
      if (data) {
        Object.assign(this.formItem, data);
      }
    },
    imgAdd(pos, $file) {
      let formdata = new FormData();
      formdata.append("image", $file);
      image.upload(formdata).then(res => {
        if (res.errno == 0 && res.data.url) {
          this.$refs["md"].$img2Url(pos, res.data.url);
        }
      });
    }
  },
  mounted() {
    if (this.$route.query.slug) {
      this.get(this.$route.query.slug);
    }
  }
};
</script>
