<template>
  <header id="header" class="header bg-white">
    <div class="navbar-container">
      <nuxt-link to="/" class="navbar-logo">
        <img v-if="site.logo" class="logo" ref="logo" :src="site.logo" alt="logo">
      </nuxt-link>
      <div class="navbar-search">
        <span class="icon-search"></span>
        <form v-on:submit.prevent="onSubmit" role="search">
          <span class="search-box">
            <input
              ref="inputBox"
              type="text"
              v-model="search"
              class="input"
              name="s"
              required="true"
              placeholder="Search..."
              maxlength="30"
              autocomplete="off"
            />
          </span>
        </form>
      </div>
      <div class="navbar-menu">
        <nuxt-link v-for="(path, name) in nav" :key="name" :to="path">
          {{ name }}
        </nuxt-link>
      </div>
      <div class="navbar-mobile-menu">
        <span class="icon-menu cross"><span class="middle"></span></span>
        <ul>
          <li v-for="(val, name) in nav" :key="name">
            <nuxt-link :to="val">{{ name }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </header>

</template>


<script>
import HeadroomModule from '@/assets/js/headroom.min.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      search: '',
      nav: {
        Archive: "/archive",
        Demos: "/demo",
        About: "/content/page/about",
        Links: "/content/page/links",
      },
    }
  },
  computed: mapState({
    site: state => state.site
  }),
  mounted() {
    setTimeout(()=>{
      if(process.client) {
        let Headroom = HeadroomModule()
        let header = new Headroom(document.getElementById("header"), {
          tolerance: 0,
          offset: 60,
          classes: { initial: "animated", pinned: "slideDown", unpinned: "slideUp" }
        });
        header.init()
      }
    },100)
  },
  methods: {
    onSubmit() {
      if (this.search.trim() === '') {
        return
      }
      this.$refs.inputBox.blur()
      this.$router.replace(`/muster/search/${this.search}`)
    },
  },
}
</script>

<style lang="scss">
  .navbar-menu a:hover, .router-link-active {
    color: #6fa3ef;
  }
</style>
