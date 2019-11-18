<template>
  <div>
    <div class="demo-editor">
      <Input type="textarea" v-model="demo_html" :rows="6" placeholder="html..."></Input>
      <i></i>
      <Input type="textarea" v-model="demo_css" :rows="6" placeholder="css..."></Input>
      <i></i>
      <Input type="textarea" v-model="demo_js" :rows="6" placeholder="js..."></Input>
    </div>
    <iframe id="ifm" style="height:600px" frameborder="0"></iframe>
  </div>
</template>
<style>
iframe {
  width: 100%;
}
.demo-editor {
  display: flex;
  font-size: 0;
  margin-bottom: 12px;
}
.demo-editor i {
  position: relative;
  width: 12px;
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