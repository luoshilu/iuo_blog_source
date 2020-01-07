<template>
  <div class="container">
    <div class="post-detail-module">
      <article class="main-content page-page" itemscope itemtype="http://schema.org/Article">
        <div class="post-header">
            <h1 class="post-title" itemprop="name headline">{{ post.title }}</h1>
            <div v-if="isPost" class="post-data">

              create on
              <time :datetime="post.create_time*1000 | moment('YYYY.MM.DD')" itemprop="datePublished">
                {{ post.create_time*1000 | moment('YYYY.MM.DD') }}
              </time>
              in
              <nuxt-link :to="`/muster/category/${post.category.slug}`">
                 {{ post.category.slug }}
              </nuxt-link>
              with
              <a href="#comments"> {{ post.comment.length }} comment </a>
              and
              <span> {{ post.view }} view </span>
            </div>
        </div>
        <div class="post-content" itemprop="articleBody">
          <p class="post-tags">
            <router-link v-for="tag in post.tag" :key="tag.slug" :to="`/muster/tag/${tag.slug}`">
              {{ tag.slug }}
            </router-link>
          </p>
          <div id="post-text" v-html="post.content"></div>
          <p v-if="isPost" class="post-info">本文由
              <a href="javascript:">
                  IUO
              </a>创作，采用<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="external nofollow">知识共享署名4.0</a>国际许可协议进行许可
              <br>本站文章除注明转载/出处外，均为本站原创或翻译，转载前请务必署名。
          </p>
        </div>
      </article>
      <div v-if="isPost" id="directory-content" class="directory-content">
          <div id="directory"></div>
      </div>
      <Comment :contentType="'post'" :contentSlug="post.slug" v-bind:commentList="post.comment"></Comment>
    </div>
  </div>
</template>

<script>
import { post } from "@/api"
import { setTimeout } from 'timers';

import Comment from '@/components/comment/Comment'

import PostDirect from '@/assets/js/postdirect'
import Zoom from '@/assets/js/zoom.min'
// import Timeline from '@/assets/js/timeline.min'

export default {
  components: {
    Comment,
  },
  transition: 'page',
  async asyncData({params, error}) {
    let initData = {
      post: {
        title: '',
        slug: '',
        category: {},
        comment: [],
      },
      tag: [],
      loading: false
    }

    let res = await post.getInfo(params.slug)
    if (res.data.id) {
      initData.post = res.data
    } else {
      error({ statusCode: 404 })
    }
    return initData
  },
  head () {
    return {
      title: `${this.post.title}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${(this.post.tag.map(tag => tag.name)).join()} ${this.post.description}`
        },{
          hid: 'keywords',
          name: 'keywords',
          content: `${(this.post.tag.map(tag => tag.name)).join()} ${this.post.title}`
        }
      ]
    }
  },
  computed: {
    isPost() {
      return (this.post.type === 'post')
    }
  },
  mounted () {
    if(process.client) {
      // 检测是post还是page
      if(this.isPost) {
        setTimeout(() => {
          PostDirect('#post-text', '#directory') // 文章目录
          Zoom('#post-text img') // 放大图片
        }, 1)
      }
      // if(this.post && this.post.slug === 'about') {
      //   setTimeout(() => {
      //     Timeline('.timeline-content') // timeline
      //   }, 1)
      // }
    }
  },
}
</script>

