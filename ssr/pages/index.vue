<template>
  <div class="container">
    <PostList v-bind:posts="posts"></PostList>
  </div>
</template>

<script>
import { post } from '@/api'
import PostList from '@/components/post/List.vue'
// import { mapState } from 'vuex'

export default {
  components: {
    PostList
  },
  // computed: mapState({
  //   site: state => state.site
  // }),
  transition: 'page',
  head: {
    title: '首页',
    meta: [
      { hid: 'description', name: 'description', content: `首页` }
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
