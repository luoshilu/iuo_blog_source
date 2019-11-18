<template>
  <div class="container">
    <div class="main-content demo-page clearfix">
      <div class="demos-item">
        <div v-for="(demos, date) in list" :key="date">
          <div class="demos-title">
            {{ date }}
          </div>
          <div class="demo-lists">
              <div class="demo-lists-body">
                <div v-for="demo in demos" :key="demo.slug" class="demo-list-item">
                    <div class="demo-list-item-container">
                        <div class="item-label">
                            <div class="item-title">
                                <a target="_blank" :href="`${demo.direct_url? demoFileDir + demo.slug + '.html' : viewDemo}`">
                                  {{ demo.title }}
                                </a>
                            </div>
                            <div class="item-thumb">
                                <a target="_blank" :href="`${demo.direct_url? demoFileDir + demo.slug + '.html' : viewDemo}`">
                                    <img :src="demo.thumb">
                                </a>
                            </div>
                            <div class="item-meta clearfix">
                                <div class="item-meta-date">
                                  {{ demo.create_time | moment('YYYY.MM.DD') }}
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
import { demo } from '@/api'
export default {
  transition: 'page',
  async asyncData() {
    let initData = {
      demoFileDir: '',
      viewDemo: '',
      list: {},
    }
    let res = await demo.getList()
    initData = {initData, ...(res.data)}
    return initData
  },
  head () {
    return {
      title: `demo | 实例`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `html css js 实例`
        }
      ]
    }
  },
  methods: {
    async demos() {
      return demo.getList().then(res => {
        this.list = res.data.list
        this.demoFileDir = res.data.demoFileDir
        this.viewDemo = res.data.viewDemo
      })
    }
  },
}
</script>
