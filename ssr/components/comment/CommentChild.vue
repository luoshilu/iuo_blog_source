<template>
  <ul class="comment-list">
    <li v-for="(comment) in comments" :key="comment.id" :id="`li-comment-${comment.id}`" class="comment-body comment-parent comment-odd">
      <div :id="`comment-${comment.id}`">
        <div class="comment-view">
          <div class="comment-header">
            <img class="avatar" :src="comment.author | headImg" width="60" height="60" />
              <span v-if="comment.url" class="comment-author">
                <a target="_blank" :href="comment.url">{{ comment.author }}</a>
              </span>
              <span v-else class="comment-author">{{ comment.author }}</span>
          </div>
          <div class="comment-content">
            <p><span class="at-user" v-if="comment.parent_id && comment.parent">@ {{ comment.parent.author }}</span> {{ comment.text }} </p>
          </div>
          <div class="comment-meta">
            <time class="comment-time"> {{ comment.create_time * 1000 | moment('YYYY.MM.DD HH.MM') }} </time>
            <span class="comment-reply">
              <a @click="reply(comment)" rel="nofollow">reply</a>
            </span>
          </div>
        </div>
      </div>

      <!-- child -->
      <div class="comment-child">
        <comment-child v-if="comment.child && comment.child.length > 0" v-on:reply="replyChild" v-bind:commentList="comment.child"></comment-child>
      </div>
    </li>
  </ul>
</template>

<script>
import commentChild from '@/components/comment/CommentChild'

export default {
  name: 'comment-child',
  components: {
    commentChild
  },
  props: {
    commentList: Array
  },
  data() {
    return {
      comments: this.commentList
    }
  },
  methods: {
    reply(parent) {
      this.$emit('reply', parent)
    },
    replyChild(parent) {
      this.$emit('reply', parent)
    },
  },
  watch: {
    commentList (newval) {
      this.comments = newval
    }
  },
}
</script>

<style lang="scss">
  $gray: #aaa;
  $comment-fsz: 16px !default;

  .comment-list {
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    .comment-view {
      padding: 20px;
      cursor: pointer;
      &:hover {
        .comment-reply {
          display: inline-block!important;
        }
      }
    }
    .comment-parent {
      margin: 20px 0;
      border: 1px solid rgba(184, 197, 214, 0.2);
      border-radius: 3px;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
      &:last-child {
        margin: 20px 0 0;
      }
      &:first-child {
        margin: 0;
      }

      .comment-view {
        transition: all .3s ease-in;
        .comment-header {
          display: inline-block;
          width: auto;
          .avatar {
            float: left;
            width: 34px;
            height: 34px;
            margin: 3px 0 0 3px;
            border: 1px solid #eaeaea;
            border-radius: 50%;
          }
          .comment-author {
            float: left;
            font-size: 13px;
            line-height: 20px;
            margin: 0 20px;
          }
          .comment-by-author a {
            color: #6fa3ef !important;
          }
        }
      }
      .comment-content {
        margin: -10px 0 10px 58px;
        color: #313131;
        p {
          font-size: $comment-fsz;
          line-height: 1.4;
        }
        .at-user {
          color: $gray;
          cursor: pointer;
          font-size: 0.9em;
        }
      }
      .comment-meta {
        padding-left: 58px;
        font-size: 12px;
        .comment-time {
          color: $gray;
        }
        .comment-reply {
          display: none;
          font-size: 1.2em;
          float: right;
          a {
            color: $gray;
          }
        }
      }
      .comment-child {
        border: none;
        padding-left: 20px;
        .comment-author-at {
          float: left;
          margin-right: 5px;
        }
        li.comment-parent {
          margin: 0 10px 4px 0px;
        }
        .comment-child {
          padding-left: 0;
          li.comment-parent {
            margin: 0 0 0 0;
          }
        }
        .comment-view {
          background-color: #fafbfc;
          padding: 10px;
        }
        .comment-meta {
          margin: 0 3px;
        }
      }
      .show-it-and-parent {
        border-left: 2px solid #ffcb1a;
        background-color: #fafbfc;
        box-shadow: 1px 1px 1px 1px $gray;
        transform: scale(1.1);
        margin-top: 8px!important;
      }
    }
  }
</style>

