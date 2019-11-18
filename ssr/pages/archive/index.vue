<template>
  <div class="container">
    <div class="main-content archive-page clearfix">
      <div class="categorys-item">
        <div v-for="(items, date) in list" :key="date">
          <div class="categorys-title">
            {{ date }}
          </div>
          <div class="post-lists">
            <div class="post-lists-body">
              <div v-for="post in items" :key="post.slug" class="post-list-item">
                  <div class="post-list-item-container">
                      <div class="item-label">
                          <div class="item-title">
                              <nuxt-link :to="`/content/${post.category.slug}/${post.slug}`">
                                {{post.title}}
                              </nuxt-link>
                          </div>
                          <div class="item-meta clearfix">
                              <div class="item-meta-date">
                                  {{ post.create_time | moment('YYYY.MM.DD') }}
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
  </div>
</template>

<script>
import { post } from '@/api'
export default {
  transition: 'page',
  async asyncData() {
    let initDate = {
      loading: false,
      list: {}
    }
    let res = await post.getList({type: 'archive'})
    initDate.list = res.data
    return initDate
  },
  head () {
    return {
      title: `archive | 归档`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `文章归档`
        }
      ]
    }
  },
}
</script>
