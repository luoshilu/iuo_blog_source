<template>
  <div class="main-content index-page clearfix onelist-page">
    <div class="post-lists">
      <div class="post-lists-body">
        <div v-for="post in posts.data" :key="post.slug" class="post-onelist-item">
          <div class="post-onelist-item-container">
            <nuxt-link v-if="post.thumb" :to="`/content/${post.category.slug}/${post.slug}`">
              <div class="onelist-item-thumb bg-deepgrey" v-lazy:background-image="{src: post.thumb}"></div>
            </nuxt-link>
            <div class="onelist-item-info">
                <div class="item-title">
                  <nuxt-link :to="`/content/${post.category.slug}/${post.slug}`">
                    {{post.title}}
                    <ContentTop v-if="post.status == TOP"></ContentTop>
                  </nuxt-link>
                </div>
                <div class="item-meta">
                  <time :datetime="post.create_time*1000 | moment('YYYY.MM.DD')" itemprop="datePublished">&nbsp;&nbsp;Published&nbsp;&nbsp;on&nbsp;&nbsp;
                    {{ post.create_time*1000 | moment('YYYY.MM.DD') }}
                  </time> in
                  <nuxt-link :to="`/muster/category/${post.category.slug}`">
                    {{post.category.slug}}
                  </nuxt-link>
                </div>
                <div class="item-meta-hr bg-deepgrey"></div>
                <div class="item-content" v-html="post.description">
                </div>
                <div class="item-readmore"><nuxt-link :to="`/content/${post.category.slug}/${post.slug}`"> 阅读全文 →</nuxt-link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="lists-navigator clearfix">
        <ol class="page-navigator">
          <li class="prev" v-if="posts.currentPage > 1">
              <nuxt-link :to="`/posts/${ posts.currentPage - 1 }`" title="上一页">
                <span class="dir-normal">
                  <Left></Left>
                </span>
                <span class="dir-mini">
                  ←
                </span>
              </nuxt-link>
          </li>

          <li class="current">
              <a href="javascript:">
                  {{ posts.currentPage }} /
                  {{ posts.totalPages }}
              </a>
          </li>

          <li class="next" v-if="posts.currentPage < posts.totalPages">
              <nuxt-link :to="`/posts/${ posts.currentPage + 1 }`" title="下一页">
                <span class="dir-normal">
                  <Right></Right>
                </span>
                <span class="dir-mini">
                  →
                </span>
              </nuxt-link>
          </li>

        </ol>
    </div>
  </div>
</template>

<script>
import Left from '@/static/svg/left.svg'
import Right from '@/static/svg/right.svg'
import ContentTop from '@/static/svg/content_top.svg'
import CONST from 'iuo_blog_constant'

export default {
  components: {
    Right,
    Left,
    ContentTop
  },
  props: {
    posts: Object
  },
  data() {
    return {
      TOP: CONST.S_BS_TOP.v
    }
  },
}
</script>

<style lang="scss" scoped>

  @media (min-width: 700px) {
    .dir-mini {
      display: none;
    }
    .dir-normal {
      display: inline-block;
    }
    .lists-navigator ol {
      user-select: none;
      li.prev, li.next {
        position: fixed;
        top: 50vh;
        a {
          display: inline-block;
        }
      }
      li.next {
        right: 2vw;
        a {
          &:hover {
            color: #6fa3ef;
            animation: next 0.8s ease-out infinite alternate;
          }
        }
      }
      li.prev {
        left: 2vw;
        a {
          &:hover {
            color: #6fa3ef;
            animation: prev 0.8s ease-out infinite alternate;
          }
        }
      }
    }
  }
  @keyframes next {
    0% {
      margin-right: 0;
    }
    100% {
      margin-right: -16px;
    }
  }
  @keyframes prev {
    0% {
      margin-left: 0;
    }
    100% {
      margin-left: -16px;
    }
  }
  @media (max-width: 700px) {
    .dir-normal {
      display: none;
    }
    .dir-mini {
      display: inline-block;
    }
  }
</style>

