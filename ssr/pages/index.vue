<template>
  <div class="container">
    <PostList v-bind:posts="posts"></PostList>
  </div>
</template>

<script>
import { post } from '@/api'
import PostList from '@/components/post/List.vue'

export default {
  components: {
    PostList
  },
  transition: 'page',
  head: {
    title: '首页',
    meta: [
      { hid: 'description', name: 'description', content: `IUO的博客首页，IUO，关于前端、web、node.js。` }
    ]
  },
  async asyncData () {
    let res = await post.getList({page: 1, pageSize: 10})
    let initdata = {
      posts: {
        data: []
      },
    }
    if(!res.data) return initdata
    initdata = {initdata, ...{posts: res.data}}
    return initdata
  },
  methods: {
    getPosts (map) {
      post.getList(map).then(res => {
        this.posts = res.data;
      });
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>
