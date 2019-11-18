<template>
  <footer class="footer">
    <div class="footer-meta">
      <div class="footer-container">
        <div class="meta-item meta-copyright">
          <div class="meta-copyright-info">
            <a href="/" class="info-logo"> IUO. </a>
            <div class="info-text">
              <p>
                Theme is Pinghsu by Chakhsu,
              </p>
              <p>Powered by
                <IconNuxt></IconNuxt>
                <IconKoa></IconKoa>
                <IconMysql></IconMysql>
                <IconQiniu></IconQiniu>
              </p>

              <p>© 2018 - 2019 <a href="https://asyncc.com/">asyncc.com</a></p>
            </div>
          </div>
        </div>
        <div class="meta-item meta-posts">
          <h3 class="meta-title">最近文章</h3>
            <li v-for="post in posts" :key="post.id">
              <nuxt-link :to="`/content/${post.category.slug}/${post.slug}`">
                {{ post.title }}
              </nuxt-link>
            </li>
        </div>
        <div  class="meta-item meta-comments">
          <h3 class="meta-title">最近评论</h3>
            <li v-for="comment in comments" :key="comment.id">
              <!-- 文章 文章的categroy对应meta表，链接使用category/slug进行组合，指定一篇文章的链接-->
              <nuxt-link :to="`/content/${comment.category}/${comment.slug}#comment-${comment.id}`" v-if="comment.content_id && comment.category">
                {{comment.author}} : {{comment.text}}
              </nuxt-link>

              <!-- page post 页面的category为0，type则为page，链接使用page-->
              <nuxt-link :to="`/content/page/${comment.slug}#comment-${comment.id}`" v-if="comment.content_id && !comment.category">
                {{comment.author}} : {{comment.text}}
              </nuxt-link>
            </li>
        </div>
      </div>
      <div v-show="gotopBtn" class="fixed-tool">
          <a href="https://github.com/luoshilu" target="_blank">
            <IconGithub></IconGithub>
          </a>
          <IconRocket></IconRocket>
      </div>
    </div>
  </footer>
</template>

<script>

import { post } from '@/api'
import { comment } from '@/api'
import IconRocket from '@/components/svgicon/animatedicons/IconRocket.vue'
import IconGithub from '@/components/svgicon/animatedicons/IconGithub.vue'

import IconQiniu from '@/static/svg/qiniu.svg'
import IconKoa from '@/static/svg/koa.svg'
import IconNuxt from '@/static/svg/nuxt.svg'
import IconMysql from '@/static/svg/mysql.svg'

export default {
  components: {
    IconRocket,
    IconGithub,
    IconQiniu,
    IconKoa,
    IconNuxt,
    IconMysql,
  },
  data () {
    return {
      posts: [],
      comments: [],
      gotopBtn: false,
    }
  },
  mounted() {
    if(process.client) {
      let resPost = post.getList({type: 'recent'})
      let resComment = comment.getList({type: 'recent'})
      resPost.then(res => {
        this.posts = res.data.data
      })
      resComment.then(res => {
        this.comments = res.data
      })
      document.addEventListener('scroll', () => {
        let docTop = document.documentElementscrollTop || window.pageYOffset || document.body.scrollTop
        if (docTop < 300) {
          this.gotopBtn = false
          return
        }
        this.gotopBtn = true
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .footer-container {
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
</style>
