<template>
  <div>
    <Nav></Nav>
    <nuxt/>
    <Foot></Foot>
  </div>
</template>

<script>
import Nav from "~/components/nav.vue"
import Foot from "~/components/Foot.vue"

import { getData, setData } from 'nuxt-storage/local-storage'
// import faker from 'faker'
import { config } from "@/api"

export default {
  components: { Nav, Foot },
  methods: {
    getName: function(){
      let firstName = ['apple', 'apricot', 'banana', 'areca', 'mate', 'Tomato', 'Cauliflower', 'Cucumber', 'Mooli', 'Onion']
      let lastName = ['core', 'juice', 'skin', 'flesh', 'trees', 'smell', 'salad', 'platter', 'dish', 'bowl']

      firstName = firstName[Math.floor((Math.random()*firstName.length))]
      lastName = lastName[Math.floor((Math.random()*lastName.length))]

      return `${firstName} ${lastName}`
    }
  },
  beforeMount () {
    // get site config
    config.getList().then(res => {
      if (res.errno === 0) {
        let siteConfig = res.data.site
        this.$store.commit('INIT_SITE', siteConfig)

        // 设置 favicon
        if (process.client) {
          let headEle = document.getElementsByTagName('head')[0]
          let ico = document.createElement('link')
          ico.setAttribute('type', 'image/x-icon')
          ico.setAttribute('rel', 'icon')
          ico.setAttribute('href', siteConfig.ico)
          headEle.appendChild(ico)
        }
      }
    })
  },
  mounted () {
    if (process.client) {
      // get visitor info
      let visitor = getData('visitor')
      if (!visitor) {
        visitor = {author: this.getName(), email: 'your_email@xx.com'}
        setData('visitor', visitor)
      }
      // INIT VISITOR INFO
      this.$store.commit('INIT_VISITOR', visitor)
    }
  }
}
</script>
