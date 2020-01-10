<template>
  <div class="error-page">
    <div v-if="error.statusCode === 404">
        <div class="body404">
        <div class="info404">
          <header id="header404" class="clearfix">
              <div class="site-name404">404</div>
          </header>
          <section>
            <nuxt-link to="/" class="index404">Back Home</nuxt-link>
          </section>
        </div>
      </div>
    </div>
    <div v-else-if="error.statusCode === 401">
      <div class="body401">
        <div class="info401">
          <header id="header401" class="clearfix">
            <div class="site-name401">401</div>
          </header>
          <section>
            <nuxt-link to="/" class="index401">Back Home</nuxt-link>
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
            <nuxt-link to="/" class="index500">Back Home</nuxt-link>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blank', // 你可以为错误页面指定自定义的布局
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
    .body404,.body500,.body401{
        position: absolute;
        height: 100%;
        width: 100%;
        background:#fff;
        background-size: auto 100%;
    }
    .site-name404, .site-name500, .site-name401 {
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
        h1{
          margin: 0 0 10px;
          font-size:50px;
          line-height:1.2;
        }
        span{
          font-size: 15px;
          width: 2px;
        }
        p{
          font-size: 20px;
          line-height:1.5;
          margin:0;
          color:#7b8993;
        }
    }
    .info404,.info500,.info401{
        position: absolute;
        top: 50%;
        text-align: center;
        width: 100%;
        margin-top: -160px;
    }
    #footer404, #footer500,#footer401{
        margin-top:30px;
        font-size:10px;
    }
    .index404,.index500,.index401 {
        margin-top: 24px;
        display: inline-block;
        min-width: 90px;
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
