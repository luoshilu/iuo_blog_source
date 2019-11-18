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
  transition(to, from) {
    if(!from) return 'slide-left'
    let fromPage = from.params.page
    let toPage = to.params.page
    return +toPage < +fromPage ? 'slide-right' : 'slide-left'
  },
  async asyncData ({ params, error }) {

    params.pageSize = 10
    let res = await post.getList(params)
    let initdata = {
      posts: {
        data: []
      },
    }
    if (!res.data || res.data.data.length === 0) {
      error({ statusCode: 404 })
    }
    initdata = {initdata, ...{posts: res.data}}
    return initdata
  },
  head: {
    title: '文章列表',
    meta: [
      { hid: 'description', name: 'description', content: `最近文章列表` }
    ]
  },
  validate ({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.page)
  },
}
</script>
