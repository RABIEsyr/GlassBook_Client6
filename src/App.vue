<template>
  <v-app>
    <router-view v-if="!isAuth"></router-view>
    <div id="app" v-else>v-else
      <v-app id="inspire">
        <v-app id="inspire">
          <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
          >
            <v-list dense>
              <template>
                <v-row>
                  <v-col cols="6"> </v-col>
                  <v-col cols="6" class="text-center">
                    <!-- <a
                  href="#!"
                  class="body-2 black--text"
                >EDIT</a> -->
                  </v-col>
                </v-row>
                <!-- <v-list-group
              v-else-if="item.children"
              :key="item.text"
              v-model="item.model"
              :prepend-icon="item.model ? item.icon : item['icon-alt']"
              append-icon=""
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                link
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group> -->
                <router-link to="/chat">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon>mdi-message</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title> Messenger </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </router-link>
                <router-link to="/get-friends">
                  <v-list-item>
                    <v-list-item-action>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title> Friends </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </router-link>
              </template>
            </v-list>
          </v-navigation-drawer>

          <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="blue darken-3"
            dark
          >
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
              <span
                @click="goHome()"
                style="cursor: pointer"
                v-if="windowWidth > 330"
                >Glass Book {{ userId }}</span
              >
              <span style="cursor: pointer" @click="goHome()" v-else>GB</span>
            </v-toolbar-title>
            <v-text-field
              v-if="this.$route.name == 'Posts'"
              flat
              solo-inverted
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
              label="Search"
              filled
              class="hidden-sm-and-down"
              v-model="keywords"
              v-on:keydown="searchUser"
            ></v-text-field>

            <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn> -->
            <v-badge
              :content="friendRequestlength"
              :value="friendRequestlength"
              color="blue"
              overlap
            >
              <v-icon @click="onFriendRequest" large> mdi-account </v-icon>
            </v-badge>
            <v-btn icon>
              <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn icon large>
              <v-avatar size="32px" item>
                <v-img
                  :src="pho"
                  alt="Vuetify"
                  id="logo"
                  @click="upPhoto"
                ></v-img
              ></v-avatar>
            </v-btn>
          </v-app-bar>
          <v-main>
            <v-text-field
              v-if="windowWidth < 959 && this.$route.name == 'Posts'"
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
              v-model="keywords"
              v-on:keydown="searchUser"
            ></v-text-field>
            <v-container fluid>
              <!-- <button @click="sendMsg">Send</button>   center -->
              <v-content>
                <!-- <div 
            v-for="(post, index) in posts" :key="index"
            @click="inPostClick(post)">
             <my-post  
            :image="'http://localhost:3000/static/' + post._id + '.PNG'"  
            :text="post.text"
            >
            </my-post>
           </div> -->

                <!-- Search by name -->
                <div v-if="keywords" class="div-search">
                  <v-card
                    class="mx-auto card-scroll"
                    max-width="400"
                    max-height="100"
                    tile
                  >
                    <v-list-item v-for="user in searchNewUser" :key="user.id">
                      <v-list-item @click="onSearchNewUSer(user.id)">
                        <v-img
                          max-height="50"
                          max-width="50"
                          :src="'data:image/PNG;base64,' + user.image"
                        ></v-img>
                        <span style="margin-left: 50%">{{ user.name }}</span>
                        <hr />
                      </v-list-item>
                    </v-list-item>
                  </v-card>
                </div>
                <router-view> </router-view>
              </v-content>
            </v-container>
          </v-main>
          <v-btn
            bottom
            color="pink"
            dark
            fab
            fixed
            right
            @click="dialog = !dialog"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-dialog
            scrollable
            v-model="dialog"
            width="800px"
            style="color: red"
            content-class="vdialognew"
            persistent
          >
            <!-- plus button -->
            <v-card style="overflow-y: hidden !important" class="rounded-card">
              <v-card-title class="color dialog-custom darken-2">
                Create contact
              </v-card-title>
              <v-container fluid>
                <v-row class="mx-2">
                  <v-col class="align-center justify-space-between" cols="12">
                    <v-row align="center" class="mr-0">
                      <v-avatar size="40px" class="mx-3">
                        <img :src="pho" alt="" />
                      </v-avatar>
                      <v-text-field
                        placeholder="What is in your mind"
                        v-model="postText"
                      ></v-text-field>
                    </v-row>
                  </v-col>

                  <v-col cols="12">
                    <img class="post-image" id="output" />
                  </v-col>
                  <v-col cols="12">
                    <!-- <label for="upload-photo">Browse...</label> -->
                    <input
                      type="file"
                      id="upload-photo"
                      @change="onFileSelected($event)"
                    />
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <!-- <v-btn
              text
              color="primary"
            >More</v-btn> -->
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn text @click.prevent="savePost">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app>
      </v-app>
    </div>
  </v-app>
</template>

<script>
import io from "socket.io-client";
import axios from "axios";
//import router from './router/index';
import { eventBus } from "./main";
// import Post from './components/post/post'
import * as types from "./store/types";

export default {
  name: "App",

  data: () => ({
    dialog: false,
    drawer: null,
    selectedFile: null,
    postText: "",
    image: "",
    // items: [
    //   { icon: 'mdi-contacts', text: 'Contacts' },
    //   { icon: 'mdi-history', text: 'Frequently contacted' },
    //   { icon: 'mdi-content-copy', text: 'Duplicates' },
    //   {
    //     icon: 'mdi-chevron-up',
    //     'icon-alt': 'mdi-chevron-down',
    //     text: 'Labels',
    //     model: true,
    //     children: [
    //       { icon: 'mdi-plus', text: 'Create label' },
    //     ],
    //   },
    //   {
    //     icon: 'mdi-chevron-up',
    //     'icon-alt': 'mdi-chevron-down',
    //     text: 'More',
    //     model: false,
    //     children: [
    //       { text: 'Import' },
    //       { text: 'Export' },
    //       { text: 'Print' },
    //       { text: 'Undo changes' },
    //       { text: 'Other contacts' },
    //     ],
    //   },
    //   { icon: 'mdi-cog', text: 'Settings' },
    //   { icon: 'mdi-message', text: 'Messenger', onClick: function() {
    //     console.log('1111 App.vue')
    //     router.push('/chat')
    //   } },
    //   { icon: 'mdi-help-circle', text: 'Help' },
    //   { icon: 'mdi-cellphone-link', text: 'App downloads' },
    //   { icon: 'mdi-keyboard', text: 'Go to the old version' },
    // ],

    // items: [
    //   { icon: 'mdi-message', text: 'Messenger', onClick: function() {
    //     console.log('1111 App.vue')
    //     router.push('/chat')
    //   }
    //   }
    // ],
    socket: io("http://localhost:3000", {
      query: { token: localStorage.getItem("token") },
    }),
    photo: null,
    windowWidth2: window.innerWidth,
    keywords: "",
    isSearch: false,
    searchNewUser: [],
  }),
  computed: {
    isAuth() {
      if (localStorage.getItem("token")) {
        return true;
      } else {
        return false;
      }
    },

    pho() {
      if (this.photo) {
        return this.photo;
      }
      return this.$store.state.photo;
    },
    posts() {
      return this.$store.getters.getPosts;
    },

    friendRequestlength() {
      return this.$store.getters.getFriendRequestLength;
    },

    currentRouteName() {
      console.log("App.vue current route", this.$route.name);
      return this.$route.name;
    },

    userId() {
      return this.$store.state.auth;
    }
  },
  created() {
    this.currentRouteName;
    this.socket.on("new-post", (post) => {
      console.log('App.vue new-post13333333', post)
      this.$store.dispatch("newPost", post);
    });
    this.$store.dispatch("socketOnReceive");

    eventBus.$on("photoChanged", (d) => {
      this.photo = d;
    });

    this.$store.dispatch("getPhotoFromServer");
    this.photo = this.$store.state.photo;

    this.$store.dispatch(types.GET_FRIEND_REQUEST_LENGTH);

    this.socket.on("new-fr-req", (data) => {
      console.log("Appvue socket 990", data);
      this.$store.commit(types.REQUEST_SOCKET, data);
    });


    // axios.post(
    //   "http://localhost:3000/friend-request/request-pending",
    //   { id: "5f9cedeb0dffda56e12df8ae" },
    //   {
    //     headers: {
    //       authorization: localStorage.getItem("token"),
    //     },
    //   }
    // ).then((value) => {console.log('App.vue 34121: ', value)});

  },

  methods: {
    // sendMsg() {
    //   // this.socket.emit('msg', {msg: 'sosa', id: '5f6990a54730351e94e1fc11'});
    //   this.$store.dispatch('socketOnConnection', )
    // },
    upPhoto() {
      this.$store.dispatch("upPhoto");
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      var output = document.getElementById("output");
      output.src = URL.createObjectURL(event.target.files[0]);
      this.isFileSelected = true;
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };
    },

    savePost() {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      fd.append("data", this.postText);
      this.dialog = false;
      try {
        axios
          .post("http://localhost:3000/post/new-post", fd, {
            headers: { authorization: localStorage.getItem("token") },
          })
          .then((res) => {
            this.socket.emit("new-post", res);
          });
      } catch (error) {
        console.log("App.vue, error: ", error);
      }
    },
    onResize() {
      console.log("App.vue-onResize()", this.windowWidth2);
      this.windowWidth2 = window.innerWidth;
    },
    searchUser() {
      axios
        .post(
          "http://localhost:3000/users/search-user",
          { name: this.keywords },
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        )
        .then((res) => {
          if (res.data["success"]) this.searchNewUser = res.data.users;
        });
    },
    onSearchNewUSer(id) {
      this.searchNewUser.find((user) => {
        user.id = id;
        eventBus.shareImageSearchUser(user.image);
        this.searchNewUser = null;
        this.$router.push("/user/" + id).catch(() => {});
      });
    },
    onFriendRequest() {
      this.$router.push("/friend-requests").catch(() => {});
      this.friendRequestlength = 0;
    },
    goHome() {
      this.$router.push("/posts");
    },
  },
  watch: {
    windowWidth2(oldWidth, newWidth) {
      this.txt = `it changed to ${newWidth} from ${oldWidth}`;
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.v-main .v-content {
  padding: 0 !important;
}
.color {
  background-color: #1565c0 !important;
}
.v-card > *:first-child:not(.v-btn):not(.v-chip) {
  color: white;
}

.dialog-custom {
  overflow-y: hidden !important;
}

.vdialognew {
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: red;
}

.post-image {
  max-height: 100px;
}

.card-scroll {
  overflow-y: scroll;
}

.div-search {
  z-index: 10;
}
</style>
