<template>
  <div>
    <div v-for="post in posts" :key="post._id" @click="inPostClick(post)">
      <my-post
        :image="'http://localhost:3000/static/' + post._id + '.PNG'"
        :text="post.text"
        :id="post._id"
        :commentsArr="post.comments"
      >
      </my-post>
    </div>
  </div>
</template>

<script>
import Post from "./post";
// import { mapActions } from "vuex";
import * as types from "../../store/types";
// import axios from "axios";
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

export default {
  data: () => ({
    index: 0,
    // posts: [],
  }),
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },

    comments() {
      return ["aa", "bb"];
    },
  },
  created() {
    this.$store.dispatch(types.GET_FRIEND_POSTS, 0);
  },

  methods: {
    inPostClick(post) {
      console.log("Posts.vue inPostClick", post);
    },

    scroll() {
      let t = this;
      $(window).scroll(function () {
        if (
          $(window).scrollTop() + $(window).height() >
          $(document).height() - 100
        ) {
          console.log(" bottom!");
          t.index += 2;
          t.$store.dispatch(types.GET_FRIEND_POSTS, t.index);
        }
      });
    },
  },
  mounted() {
    this.scroll();
  },
  components: {
    "my-post": Post,
  },
beforeDestroy () {
 this.$router.go()
},
};
</script>

<style>
</style>
