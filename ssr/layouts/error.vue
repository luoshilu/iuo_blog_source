<template>
  <div class="error-page">
    <div v-if="error.statusCode === 404">
        <div class="body404">
        <div class="info404">
            <header id="header404" class="clearfix">
                <div class="site-name404">404</div>
            </header>
            <section>
                <div class="title404">
                </div><nuxt-link to="/" class="index404">Back Home</nuxt-link>
            </section>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="body500">
          <div class="info500">
              <header id="header500" class="clearfix">
                  <div class="site-name500">500</div>
              </header>
              <section>
                  <div class="title500">
                  </div><nuxt-link to="/" class="index500">Back Home</nuxt-link>
              </section>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blank' // 你可以为错误页面指定自定义的布局
}
</script>


<style lang="scss">
  .error-page {
    font-family: PingFang SC,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    a, button.submit {
        color:#6E7173;
        text-decoration:none;
        transition:all .1s ease-in;
    }
    a:hover, a:active {
        color:#6E7173;
    }
    .body404{
        position: absolute;
        height: 100%;
        width: 100%;
        background:#fff;
        background-size: auto 100%;
    }
    .body-about .body404{
        background:#fff;
    }
    .site-name404 {
        margin: 0 auto;
        text-align: center;
        letter-spacing: 2px;
        font-size: 150px;
        line-height: 1;
        font-weight: 100;
        color: #f35626;
        background-image: linear-gradient(92deg,#f35626,#feab3a);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: hue 60s infinite linear;
    }
    .site-name404 h1{
        margin: 0 0 10px;
        font-size:50px;
        line-height:1.2;
    }
    .title404 span{
        font-size: 15px;
        width: 2px;
    }
    .title404 p{
        font-size: 20px;
        line-height:1.5;
        margin:0;
        color:#7b8993;
    }
    .info404{
        position: absolute;
        top: 50%;
        text-align: center;
        width: 100%;
        margin-top: -160px;
    }
    .body-about .info404{
        margin-top: -180px;
    }
    #footer404{
        margin-top:30px;
        font-size:10px;
    }
    .index404 {
        margin-top: 24px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        letter-spacing: 1px;
        font-size: 14px;
        user-select: none;
        user-select: none;
        text-shadow: none;
        border: 2px solid #7b8993;
        line-height: 36px;
        text-align: center;
        height: 36px;
        padding: 0 25px;
        border-radius: 25px;
        background-color: #fff;
        color: #7b8993;
    }
    .body500{
        position: absolute;
        height: 100%;
        width: 100%;
        background:#fff;
        background-size: auto 100%;
    }
    .body-about .body500{
        background:#fff;
    }
    .site-name500 {
        margin: 0 auto;
        text-align: center;
        letter-spacing: 2px;
        font-size: 150px;
        line-height: 1;
        font-weight: 100;
        color: #f35626;
        background-image: linear-gradient(92deg,#f35626,#feab3a);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: hue 60s infinite linear;
    }
    .site-name500 h1{
        margin: 0 0 10px;
        font-size:50px;
        line-height:1.2;
    }
    .title500 span{
        font-size: 15px;
        width: 2px;
    }
    .title500 p{
        font-size: 20px;
        line-height:1.5;
        margin:0;
        color:#7b8993;
    }
    .info500{
        position: absolute;
        top: 50%;
        text-align: center;
        width: 100%;
        margin-top: -160px;
    }
    .body-about .info500{
        margin-top: -180px;
    }
    #footer500{
        margin-top:30px;
        font-size:10px;
    }
    .index500 {
        margin-top: 24px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        letter-spacing: 1px;
        font-size: 14px;
        user-select: none;
        text-shadow: none;
        border: 2px solid #7b8993;
        line-height: 36px;
        text-align: center;
        height: 36px;
        padding: 0 25px;
        border-radius: 25px;
        background-color: #fff;
        color: #7b8993;
    }
    .icon-about{
        padding: 10px 0 25px;
    }
    .icon-about a{
        font-size: 20px;
        margin: 5px;
        color: #fff;
        background-color: #000;
        border-radius: 100%;
        padding: 6px;
    }
    @keyframes hue {
      from {
        filter: hue-rotate(0deg);
      }

      to {
        filter: hue-rotate(-360deg);
      }
    }
  }
</style>
