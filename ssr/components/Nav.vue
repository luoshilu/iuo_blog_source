<template>
  <header id="header" class="header bg-white">
    <div class="navbar-container">
      <nuxt-link to="/" class="navbar-logo">
        <img class="logo" ref="logo" src="@/static/img/head.png" alt="logo">
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
import { TweenMax, TimelineMax, Sine, Power0 } from 'gsap'

export default {
  data () {
    return {
      search: '',
      rotateCD: '',
      pauseTween: false,
      audio: '',
      nav: {
        Archive: "/archive",
        Demos: "/demo",
        About: "/content/page/about",
        Links: "/content/page/links",
      },
    }
  },
  mounted() {
    if(process.client) {
      let Headroom = HeadroomModule()
      let header = new Headroom(document.getElementById("header"), {
        tolerance: 0,
        offset: 80,
        classes: { initial: "animated", pinned: "slideDown", unpinned: "slideUp" }
      });
      header.init()

      // audio
      // this.audio = document.createElement("audio")
      // this.audio.loop = true;
      // this.audio.src  = "https://upload.wikimedia.org/wikipedia/en/d/d8/You_Spin_Me_Round_by_Dead_or_Alive.ogg";
      // head rotate
      this.rotateCD = TweenMax.to(
        this.$refs.logo,
        0.3,
        {
        rotation: 360,
        ease: Power0.easeNone,
        repeat: -1,
        paused: true
      })
    }
  },
  methods: {
    rotateHead(play) {
      let rotateCD = this.rotateCD
      let pauseTween = this.pauseTween
      // let audio = this.audio
      if(play) {
        rotateCD.play()
        TweenMax.to(rotateCD, 2, { timeScale: 1 });

        pauseTween && pauseTween.kill();
        // if (audio.paused) TweenLite.set(audio, { volume: 0, playbackRate: 0.5 });
        // TweenLite.to(audio, 2, { volume: 1, playbackRate: 1 });
        // audio.play();
      } else {
        TweenMax.to(rotateCD, 2, {
          timeScale: 0,
          onComplete: rotateCD.pause(2),
          callbackScope: rotateCD
        });
        pauseTween && pauseTween.kill();
        // this.pauseTween = TweenLite.to(audio, 2, {
        //   volume: 0,
        //   playbackRate: 0.5,
        //   onComplete: audio.pause,
        //   callbackScope: audio
        // })
      }
    },
    onSubmit() {
      if (this.search.trim() === '') {
        return
      }
      // blur
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
