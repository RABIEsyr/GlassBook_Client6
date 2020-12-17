<template>
  <div>
    <v-list subheader>
      <v-subheader>Friend Requests</v-subheader>

      <v-list-item v-for="user in httpFriendRequest" :key="user.id">
        <v-list-item-avatar>
          <v-img
            :alt="`${user.name} avatar`"
            :src="'data:image/PNG;base64,' + user.image"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="user.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-btn
            @click="addFriend(user.id)"
            class="mx-2"
            fab
            dark
            small
            color="primary"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
          <v-btn 
          @click="removeRequestOne(user.id)"
          class="mx-2" fab dark small color="red">
            <v-icon dark> mdi-minus </v-icon>
          </v-btn>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import io from "socket.io-client";
import * as types from "../../store/types";

export default {
  data() {
    return {
      socket: io("http://localhost:3000", {
        query: { token: localStorage.getItem("token") },
      }),
    };
  },
  methods: {
    ...mapActions({
      request: types.GET_FRIEND_REQUEST,
      removeRequestOne: types.REMOVE_ADD_REQUEST_ONE
    }),
    addFriend(id) {
      this.$store.dispatch(types.SUBMIT_FRIEND_REQUEST, id);
      this.$store.commit(types.REMOVE_ADD_REQUEST, id);
      this.httpFriendRequest
      this.$store.getters.getFriendRequestLength

    },
    removeSubmittedFriendRequest() {
      this.$store.dispatch(types.REMOVE_SUBMITTED_REQUEST_FRIEND);
    },
  },
  computed: {
    ...mapGetters({
      httpFriendRequest: types.GET_FRIEND_REQUEST,
    }),
  },
  created() {
    this.request();
    setTimeout(this.removeSubmittedFriendRequest, 1000);

    this.socket.on("get-fr-req-data", (data) => {
      this.$store.dispatch(types.GET_FRIEND_REQUEST);
      console.log("friendReqeust.vue 7676", data);
    });
  },
};
</script>

<style></style>
