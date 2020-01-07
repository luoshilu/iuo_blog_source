<template>
  <div>
    <div class="demo-editor">
      <div class="input-content">
        <Input type="textarea" v-model="demo_html" :rows="8" placeholder="html..."></Input>
      </div>
      <div class="input-content">
        <Input type="textarea" v-model="demo_css" :rows="8" placeholder="css..."></Input>
      </div>
      <div class="input-content">
        <Input type="textarea" v-model="demo_js" :rows="8" placeholder="js..."></Input>
      </div>
    </div>
    <div class="demo-preview">
      <iframe id="ifm" style="height:600px" frameborder="0"></iframe>
    </div>
  </div>
</template>
<style>
iframe {
  width: 100%;
}
.demo-editor {
  width: 500px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0;
  margin-bottom: 12px;
}
.demo-editor i {
  position: relative;
  width: 12px;
}
.demo-preview {
  padding-left: 520px;
}
.input-content {
  margin-bottom: 20px;
}
#ifm {
  border: 1px solid #dddee1;
  border-radius: 4px;
}
</style>
<script>
import "iview/dist/styles/iview.css";
import { Input } from "iview";
export default {
  name: "demoEditor",
  props: ["html", "css", "js"],
  components: {
    Input
  },
  data() {
    return {
      demo_html: this.html,
      demo_css: this.css,
      demo_js: this.js
    };
  },
  methods: {
    codeToDemo() {
      return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>demo<\/title>
        <\/head>
        <style>
          ${this.demo_css}
        <\/style>
        <body>
          ${this.demo_html}
          <script>${this.demo_js}<\/script>
        <\/body>
        <\/html>
      `;
    },
    reader: function(e) {
      let content = this.codeToDemo();
      document.getElementById("ifm").srcdoc = content;
      return content;
    }
  },
  watch: {
    html(val) {
      this.demo_html = this.html;
    },
    css(val) {
      this.demo_css = this.css;
    },
    js(val) {
      this.demo_js = this.js;
    },
    demo_html(val) {
      let content = this.reader().trim();
      this.$emit("codeChange", { html: this.demo_html, content: content });
    },
    demo_css(val) {
      let content = this.reader().trim();
      this.$emit("codeChange", { css: this.demo_css, content: content });
    },
    demo_js(val) {
      let content = this.reader().trim();
      this.$emit("codeChange", { js: this.demo_js, content: content });
    }
  }
};
</script>
