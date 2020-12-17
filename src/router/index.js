import Vue from "vue";
import VueRouter from "vue-router";

import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import Chat from "../components/chat/Chat";
import UploadPhoto from "../components/uploadPhoto/UploadPhoto";
import Posts from "../components/post/Posts";
import UserProfile from "../components/user/UserProfile";
import FriendRequest from "../components/friendRequest/friendRequest.vue";
import Friends from "../components/friendRequest/friends.vue";

// import App from '../App';

Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    // component: () => import('../views/About.vue')
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "Home",
    redirect: "posts",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: Chat,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/upload-photo",
    name: "upload-photo",
    component: UploadPhoto,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/user/:id",
    name: "userProfile",
    component: UserProfile,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/friend-requests",
    name: "friendRequest",
    component: FriendRequest,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
  {
    path: "/get-friends",
    name: "getFriends",
    component: Friends,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/login");
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'signup'  && !localStorage.getItem('token')) next({ name: 'signup' })
//   else next()
// });

export default router;
