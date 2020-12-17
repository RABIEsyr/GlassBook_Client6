<template>
  <div class="main">
    <div class="parent">
      <img
        class="image1"
        src="https://picsum.photos/510/300?random"
        aspect-ratio="2"
        cols="12"
      />

      <img
        class="image2"
        :class="{
          width2: windowWidth < 785,
          width3: windowWidth < 309,
          width4: windowWidth < 332,
        }"
        :src="getSchPicture"
      />
    </div>
    <br />

    <div class="add-btn">
      <v-layout align-center justify-center>
        <v-flex>
          <div class="text-xs-center">
            <div style="margin-left: -20px; display: contents">
              <v-btn
                :class="{
                  'btn-2': windowWidth < 773,
                  'btn-3': windowWidth < 389,
                }"
                v-if="userId !== paramsId.id && !isFriend"
                depressed
                color="primary"
                @click="
                  addRequest(paramsId.id);
                  reload();
                "
              >
                {{ isFriendRequestExist }}
              </v-btn>

              <v-btn
                :class="{
                  'btn-1': windowWidth > 773,
                  'btn-2': windowWidth < 773,
                  'btn-3': windowWidth < 389,
                  'btn-4': windowWidth < 662,
                  'btn-5': windowWidth < 660,
                  'btn-6': windowWidth < 365,
                }"
                v-if="isFriend"
                depressed
                color="primary"
              >
                Friend
              </v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

import * as types from "../../store/types";

export default {
  props: ["image"],
  data: () => ({
    userId: localStorage.getItem("userID"),
    img: null,
    isFriend: false,
    requestPending: false,
  }),
  computed: {
    ...mapGetters({
      initRequest: types.INITIAL_REQUEST,
    }),

    paramsId() {
      return this.$route.params;
    },
    getSchPicture() {
      return this.$store.getters.getUserSrchPic;
    },
    isFriendRequestExist() {
      let vm = this;
      vm.$forceUpdate();
      return this.requestPending ? "Request Pending" : "Add Friend";
    },
  },

  created() {
    this.isFriendRequestExist;
    this.$store.dispatch("getUserSearchPic", this.$route.params.id);
    //this.initRequest;
    // this.removeSubmitted(this.$route.params.id);
    setTimeout(() => {
      this.submitFriend;
    }, 1000);

    axios
      .post(
        "http://localhost:3000/friend-request/remove-submitted-user",
        { id: this.$route.params.id },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log("UseProfile 0999", res.data.success);
        this.isFriend = res.data.success;
        return this.isFriend;
      });

    axios
      .post(
        "http://localhost:3000/friend-request/request-pending",
        { id: this.$route.params.id },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((value) => {
        console.log("USerProfile 2112: ", value.data);
        this.requestPending = value.data;
      });
  },
  methods: {
    ...mapActions({
      addRequest: types.ADD_REQUEST,
    }),
    reload() {
      setTimeout(()=> this.$router.go(`/user/${this.paramsId.id}`),2000)
    },
  },
};
</script>
 
<style scoped>
.main {
  width: 80%;
  left: 10%;
}
.parent {
  position: relative;
  top: 0;
  left: 0;
}
.image1 {
  position: relative;
  top: 0;
  left: 10%;
  right: 10%;
  width: 100%;
  max-height: 300px;
}
.image2 {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px green solid;
}

.width2 {
  left: 30%;
  width: 200px;
  height: 150px;
}

.width3 {
  left: 30%;
  width: 200px;
  height: 150px;
}
.width4 {
  width: 100px;
  height: 101px;
  margin-left: 10px;
}

.img3 {
  margin-left: 2px;
  width: 100px;
  height: 100px;
}

.add-btn {
  margin-top: 90px;
  margin-left: 55%;
}

.btn-1 {
  width: 300px;
  margin-left: -100px;
}
.btn-2 {
  width: 300px;

  margin-left: -200px;
}

.btn-3 {
  margin-left: -50px;
}
.btn-4 {
  margin-left: -70px;
}
.btn-5 {
  margin-left: -150px;
}

.btn-6 {
  /* margin-left: -60px; */
  width: 350px;
}
</style>
