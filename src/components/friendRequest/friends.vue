<template>
  <div>
    <div v-for="user in friends" :key="user._id">
      <v-card class="mx-auto" max-width="700" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="mb-4">
              <span style="color: #2196f3">{{ user.name }}</span>
            </div>
          </v-list-item-content>

          <v-img
            :alt="`${user.name} avatar`"
            :src="'data:image/PNG;base64,' + user.image"
            height="100"
            width="50"
          ></v-img>
        </v-list-item>

        <v-card-actions>
          <v-btn outlined rounded text color="blue"> chat </v-btn>
        </v-card-actions>
      </v-card>
      <br />
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapActions, mapGetters } from "vuex";
import * as types from "../../store/types";

export default {
  data() {
    return {
      socket: io("http://localhost:3000", {
        query: { token: localStorage.getItem("token") },
      }),
    };
  },
  computed: {
    ...mapGetters({
      friends: types.GET_FRIENDS_LIST,
    }),
  },
  methods: {
    ...mapActions({
      getFiriend: types.GET_FRIENDS_LIST,
    }),
  },
  created() {
    this.getFiriend();

    this.socket.on("get-fr-req-data", (data) => {
      console.log("friendReqeust.vue 7676", data);
    });
  },
};
</script>

<style>
</style>