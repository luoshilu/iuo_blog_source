<template>
  <div class="container">
    <div class="main-content common-page clearfix">
      <div class="common-item">
        <div v-if="meta" class="common-title">
          {{ meta.key }} : {{ meta.value }}
        </div>
        <div class="post-lists">
          <div class="post-lists-body">
            <div v-for="post in posts.data" :key="post.slug" class="post-list-item">
              <div class="post-list-item-container">
                <div class="item-label ">
                  <div class="item-title">
                    <nuxt-link :to="`/content/${post.category.slug}/${post.slug}`">
                      <h3>{{ post.title }}</h3>
                      <div class="find-content" v-html="post.content"></div>
                    </nuxt-link>
                  </div>
                  <div class="item-meta clearfix">
                    <div class="item-meta-date">
                        {{ post.create_time*1000 | moment('YYYY.MM.DD') }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { muster } from '@/api'
export default {
  transition: 'page',
  async asyncData ({params, error}) {
    let map = {
      [params.type]: params.content
    }
    let initData = {
      meta: '',
      posts: {
        data: []
      },
    }
    let res = await muster.getList(map)
    if(res.data) {
      initData.meta = res.data.meta
      initData.posts = res.data.contents
    }
    return initData
  },
  head () {
    return {
      title: `muster | ${this.meta.key}:${this.meta.value}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `搜索与 ${this.meta.key} ${this.meta.value} 相关的文章，search posts of about ${this.meta.key} ${this.meta.value}.`
        }
      ]
    }
  },
}
</script>
