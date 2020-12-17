<template>
  <v-layout row wrap align-center>
    <v-flex xs12 sm10 md9 lg6 xlg6 offset-md2>
      <div>
        <v-card class="my-3" hover>
          <v-img height="350px" :src="image" alt="no image"></v-img>
          <v-container fill-height fluid>
            <v-layout>
              <v-flex xs12 align-end d-flex>
                <span class="headline"> {{ text }} </span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card-text> description </v-card-text>
          <v-card-actions>
            <v-row style="padding: 10px">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Commnet
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">comment</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="leave comment"
                            required
                            v-model="comment"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="
                        addComment({ comment: comment, postID: id });
                        dialog = false;
                      "
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
            <!--  -->
            <v-spacer></v-spacer>
            <v-btn icon class="red--text">
              <v-icon small>fa-reddit</v-icon>
            </v-btn>
            <v-btn icon class="light-blue--text">
              <v-icon small>fa-twitter</v-icon>
            </v-btn>
            <v-btn icon class="blue--text text--darken-4">
              <v-icon small>fa-facebook</v-icon>
            </v-btn>
            <v-btn icon class="red--text">
              <v-icon small>fa-google-plus</v-icon>
            </v-btn>
            <v-btn icon class="blue--text text--darken-4">
              <v-icon small>fa-linkedin</v-icon>
            </v-btn>
            <v-spacer></v-spacer>

            <v-btn small replace color="info" href="'image.url'" target="_blank"
              >Read More</v-btn
            >
          </v-card-actions>

          <v-row align="center">
            <v-col cols="12">
              <div id="root">
                <v-card @click="showPosts" class="mx-auto">
                  <v-toolbar color="cyan" dark>
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>Comments</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                      <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-list v-if="showHidePosts" three-line>
                    <template v-for="(item, index) in commentsArr">
                      <v-subheader
                        v-if="item.header"
                        :key="item.header"
                        v-text="item.header"
                      ></v-subheader>

                      <v-divider :key="index" :inset="item.inset"></v-divider>

                      <v-list-item :key="item.title">
                        <v-list-item-avatar>
                          <v-img
                            :src="
                              'http://localhost:3000/profile-image/' +
                              item.user +
                              '.PNG'"
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title
                            v-html="item.content"
                          ></v-list-item-title>
                         
                            {{item.date | date}}
                         
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                  </v-list>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
// import types from '../../store/types'
import io from "socket.io-client";

import * as Types from "../../store/types";
export default {
  props: {
    id: String,
    text: String,
    image: String,
    commentsArr: Array,
    items: [],
  },
  data() {
    return {
      dialog: false,
      comment: "",
      showHidePosts: false,
       socket: io("http://localhost:3000", {
        query: { token: localStorage.getItem("token") },
    }),
    };
  },

  computed: {
    ...mapGetters({
      // getCommentsGetter: Types.GET_COMMENTS,
    }),
  },
  methods: {
    ...mapActions({
      // addComment: Types.ADD_COMMENT,
      getCommets: Types.GET_COMMENTS,
     
    }),
     addComment(data) {
       this.socket.emit('new-comment', data)
          // console.log('App.vue addComment555', data)
      },
    showPosts() {
      this.showHidePosts = !this.showHidePosts;
      this.$store.getters.getPosts
    },
  },
 created() {
   
   this.socket.on('new-comment-posted',  data => {
     this.$store.commit('addComment', data)
   })

 }
};
</script>

<style scoped>
</style>