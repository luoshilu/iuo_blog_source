<template>
<div :id="`respcommentsond-post-${slug}`" class="comment-container">
    <div id="comments" class="comments clearfix">
      <form method="post" id="comment-form" class="comment-form" role="form" v-on:submit.prevent="onSubmit">
        <input type="text" name="author" v-model="author" maxlength="12" class="form-control input-control clearfix" placeholder="*Name" required>
        <input type="email" name="email" v-model="email" class="form-control input-control clearfix" placeholder="*Email" required>
        <input type="url" name="url" v-model="url" class="form-control input-control clearfix" placeholder="Site (http://)">
        <textarea ref="textarea" @click="clickTextarea" name="text" v-model="text" class="form-control" :placeholder="textareahint" required></textarea>
        <button type="submit" class="submit">SUBMIT</button>
        <div ref="faces" @click="clickFace" class="face-list hide">
          <i v-for="num in 48" :key="num" v-html="`${String.fromCodePoint('0x1f'+(600+num))}`"></i>
        </div>
        <span class="btn face-btn" @click="clickFaceFrame">🙂</span>
      </form>
      <span v-if="comments.list.length > 0" class="response">评论列表 <a class="reply-status" v-if="parent" @click="cancelReply"> 正在回复 @{{ parent.author }} #取消</a></span>

      <div @click="clickChildComment">
        <comment-child :commentList="comments.list" v-on:reply="reply"></comment-child>
      </div>
    </div>
</div>
</template>

<script>
import commentChild from '@/components/comment/CommentChild'
import { comment } from '@/api'
import { mapState } from 'vuex'

export default {
  components: {
    commentChild,
  },
  props: {
    contentType: String,
    contentSlug: String,
    commentList: Array,
  },
  data({store}) {
    return {
      slug: this.contentSlug,
      type: this.contentType,
      text: '',
      parent: '',
      comments: {
        list: this.commentList || [],
      },
    }
  },
  computed: ({
    textareahint: function () {
      return this.parent && this.parent.id ? '@' + this.parent.author : '输入 email 可方便接收消息 ^.^'
    },
    author: {
      get() {
        return this.$store.state.visitor.author
      },
      set(v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit('UPDATE_AUTHOR', v)
      }
    },
    email: {
      get() {
        return this.$store.state.visitor.email
      },
      set(v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit('UPDATE_EMAIL', v)
      }
    },
    url: {
      get() {
        return this.$store.state.visitor.url
      },
      set(v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit('UPDATE_URL', v)
      }
    }
  }),
  methods: {
    clickFaceFrame() {
      this.$refs.faces.classList.toggle('hide')
    },
    clickFace(evt) {
      if(evt.target.nodeName === 'I') {
        this.text += evt.target.innerText
        this.$refs.textarea.focus()
        this.$refs.faces.classList.add('hide')
      }
    },
    clickTextarea() {
      this.$refs.faces.classList.add('hide')
    },
    clickChildComment(evt) { // 点击子评论时，添加样式，展现其父级评论
      const showEle = 'show-it-and-parent'
      const commentEle = 'comment-view'
      const commentChild = 'comment-child'
      let nowTarget = evt.target

      // 找到 类为 commentEle 的元素
      while( nowTarget !== evt.currentTarget && !nowTarget.classList.contains(commentEle)) {
        nowTarget = nowTarget.parentNode
      }

      if(nowTarget.classList.contains(commentEle)) {

        // 获取已展现状态的评论列表
        const showEles = evt.currentTarget.getElementsByClassName(showEle)
        // 复制这个列表
        const cloneShowEles = [...showEles]
        // 移除展现元素状态
        Array.prototype.forEach.call(
          cloneShowEles,
          ele => {
            ele.classList.remove(showEle)
          }
        )

        // 添加样式，展现当前评论 及其 父评论
        let commentChildEle = nowTarget.parentNode;
        // 查找 类commentChild的元素
        while( commentChildEle !== evt.currentTarget && !commentChildEle.classList.contains(commentChild) ) {
          commentChildEle = commentChildEle.parentNode
        }
        // 展现
        nowTarget.classList.add(showEle)
        if (commentChildEle.classList.contains(commentChild)) {
          const parentEle = commentChildEle.previousElementSibling.getElementsByClassName(commentEle)[0]
          parentEle.classList.add(showEle)
        }
      }
    },
    onSubmit() {
      let commentData = {
        slug: this.slug,
        type: this.type,
        parent: this.parent,
      }
      commentData = {...commentData, ...{author: this.author, email: this.email, url: this.url, text: this.text}}
      comment.add(commentData).then(res => {
        const comment = res.data
        comment.child = []
        if (this.parent) {
          this.parent.child.unshift(comment)
        } else {
          this.comments.list.unshift(comment)
        }
        this.parent = ''
        // remove text
        this.text = ''
      })
    },
    reply(parent) {
      this.parent = parent
      setTimeout(() => {
        this.$refs.textarea.focus()
      },0)
    },
    cancelReply() {
      this.parent = ''
    }
  },
  watch: {
    commentList (newval) {
      this.comments.list = newval
    },
    contentSlug (slug) {
      this.slug = slug
    }
  }
}
</script>

<style lang="scss">
  $comment-fsz: 16px !default;
  .comment-container {
    position: relative;
    z-index: 1;
    color: #5f5f5f;
    background-color: #f7f7f7;
    .comments {
      max-width: 700px;
      margin: 0 auto;
      padding: 0 20px;
      padding-bottom: 20px;
      .lists-navigator {
        margin: 20px 0;
        ol {
          margin: 20px 0;
          padding: 0 10px;
          list-style: none;
          text-align: center;
          li.current a {
            color: #6fa3ef;
          }
        }
      }
      .page-navigator {
        margin: 0;
      }
      .response {
        font-size: 14px;
        font-weight: 400;
        display: block;
        padding: 30px 0 30px 20px;
        color: #5f5f5f;
        a {
          color: #6fa3ef;
        }
      }
      .comment-form {
        position: relative;
        margin: 20px 0 10px 0;
        padding: 10px 20px;
        border-radius: 3px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        .face-list {
          position: absolute;
          width: 33em;
          left: 10px;
          bottom: 38px;
          border: 1px solid #f7f7f7;
          padding: 4px 0px 4px 10px;
          line-height: 1.4;
          border-radius: 4px;
          user-select: none;
          cursor: pointer;
          z-index: 0;
          box-shadow: 1px 1px 1px 1px #eee;
          background: #fff;
          i {
            font-style: normal;
            font-size: $comment-fsz;
            &:hover {
              background: #ccc;
              border-radius: 1px;
            }
          }
        }
        .face-btn {
          user-select: none;
          font-size: $comment-fsz;
          cursor: pointer;
        }
        .form-control {
          font-size: 13px;
          display: block;
          width: 100%;
          height: 34px;
          color: #313131;
          outline: 0;
          font-size: $comment-fsz;
          &:focus {
            border-color: #6fa3ef;
            outline: 0;
          }
        }
        textarea.form-control {
          overflow: hidden;
          height: 150px;
          padding: 10px 0;
          resize: none;
          border-radius: 0;
        }
        .input-control {
          float: left;
          width: 100%;
          max-width: 206px;
          border-bottom: 1px dashed #ddd;
          border-radius: 0;
        }
        .submit {
          font-size: 13px;
          position: absolute;
          right: 20px;
          bottom: 10px;
          display: block;
          height: 32px;
          margin: 0 auto;
          padding: 0 20px;
          transition-duration: 400ms;
          transition-duration: 400ms;
          text-align: center;
          color: #313131;
          border: 1px solid #f7f7f7;
          border-radius: 30px;
          background-color: #f7f7f7;
          cursor: pointer;
          &:hover {
            color: #6fa3ef;
            border: 1px solid #6fa3ef;
            outline-style: none;
            background-color: #fff;
          }
        }
      }

      .response {
        padding: 20px 0;
        .reply-status {
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: 700px) {
    .comment-container .comments .comment-form {
      .input-control {
        max-width: 100%;
      }
      .face-list {
        width: 18.6em;
      }
    }
  }
</style>
