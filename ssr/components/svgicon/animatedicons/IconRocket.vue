<template>
  <svg
    class="icon"
    ref="iconRocket"
    @click="goTop"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M 801.5 647.3 H 668.1 a 1256.4 1256.4 0 0 1 -22.5 89.1 H 378.3 a 1056.8 1056.8 0 0 1 -23.4 -89.1 H 222.4 a 22.3 22.3 0 0 1 -22.3 -22.3 V 513.6 A 178.2 178.2 0 0 1 344.8 338.7 C 373.6 168.8 453.2 45.9 511.9 45.9 s 138.3 122.9 167.1 292.8 a 178.2 178.2 0 0 1 144.7 174.9 v 111.3 a 22.3 22.3 0 0 1 -22.2 22.3 z m -467.7 -245 a 89.1 89.1 0 0 0 -89.1 89.1 v 89.1 a 22.3 22.3 0 0 0 22.3 22.3 h 66.8 z M 511.9 112.7 c -28.3 0 -63.5 44.4 -90.6 111.3 h 181.2 c -27 -67 -62.1 -111.4 -90.5 -111.4 z m 106.4 155.9 H 405.5 a 625.7 625.7 0 0 0 -27.2 180.3 a 1072.9 1072.9 0 0 0 33.4 242.8 h 200.5 a 1168.1 1168.1 0 0 0 33.4 -242.8 a 625.7 625.7 0 0 0 -27.2 -180.4 z M 779.2 491.3 a 89.1 89.1 0 0 0 -89.1 -89.1 V 602.7 h 66.8 a 22.3 22.3 0 0 0 22.3 -22.3 z m -267.3 44.6 a 89.1 89.1 0 1 1 89.1 -89.1 a 89.1 89.1 0 0 1 -89 89 z m 0 -133.6 a 44.5 44.5 0 1 0 44.5 44.5 a 44.5 44.5 0 0 0 -44.5 -44.6 z" fill="#333333"/>
    <g ref="fire" fill="#bb2222">
      <path d=" M 512 1003.5 s -89.1 -84.4 -89.1 -133.6 a 89.1 89.1 0 1 1 178.2 0 c 0 49.3 -89.1 133.6 -89.1 133.6 z m 0 -178.2 a 44.5 44.5 0 0 0 -44.5 44.5 c 0 24.6 44.5 89.1 44.5 89.1 s 44.5 -64.5 44.5 -89.1 a 44.5 44.5 0 0 0 -44.5 -44.4 z"></path>
    </g>
  </svg>
</template>

<script>
import { TweenMax, TimelineMax, Sine } from 'gsap'

export default {
  methods: {
    move(time) {
      const tl = new TimelineMax()
      tl.add('start')
      tl.to(
        this.$refs.iconRocket,
        time/200,
        {
          y: -800,
          width: 32,
          heigh: 32,
          opacity: 0.5
        }
      ).to(
        this.$refs.iconRocket,
        0,
        {
          y: 0,
          opacity: 1
        }
      )
    },
    goTop() {
      let time = 100;
      this.move(time)
      let topFun = this.scrolltop()
      let top = topFun()
      let OneTimeheight = Math.floor(top / time);
      let clearTime = setInterval(() => {
        let nowTop = topFun()
        if(nowTop === 0 || nowTop < 0) {
          clearInterval(clearTime);
        }
        topFun(topFun() - OneTimeheight)
      }, 1)
    },
    scrolltop: function() {
      const topMethods = {
        docEle(val) {
          if (val != null) {
            return document.documentElement.scrollTop = val
          }
          return document.documentElement.scrollTop
        },
        docBody(val) {
          if (val != null) {
            return document.body.scrollTop = val
          }
          return document.body.scrollTop
        },
        winOffset(val) {
          if (val != null) {
            return  window.pageYOffset = val
          }
          return  window.pageYOffset
        }
      }
      let top
      return function(val){
        if (!top){
          if(document.documentElement.scrollTop){
            top = function(val) {
              return topMethods.docEle(val)
            }
          }
          else if (document.body.scrollTop){
            top = function(val) {
              return topMethods.docBody(val)
            }
          }
          else {
            top = function(val) {
              return topMethods.winOffset(val)
            }
          }
        }
        return top(val)
      }
    }
  }
}
</script>
