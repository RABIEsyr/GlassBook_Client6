<template>
  <!-- <v-container class="center">
     <v-row v-if="windowWidth > 404">
      <v-col class="input-file1">
        <label for="upload-photo">Browse...</label>
        <input type="file" id="upload-photo" @change="onFileSelected($event)" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col class="input-file2">
        <label for="upload-photo">Browse...</label>
        <input type="file" id="upload-photo" @change="onFileSelected($event)" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <img id="output" />
      </v-col>
    </v-row>

    <v-row v-if="isFileSelected">
      <v-col>
        <v-btn color="primary" @click="onUpload">Upload</v-btn>
      </v-col>
    </v-row>
  </v-container>  -->

  <div class="main-upload-photo-div">
    <v-container>
      <v-form ref="form" lazy-validation :class="['form-image']">
        <v-row>
          <label for="image">
            <input
              type="file"
              @change="onFileSelected($event)"
              name="image"
              id="image"
              style="display: none"
            />
            <img
              id="output"
              :src="getPicture()"
              :class="['img-cus']"
              height="100"
              width="200"
            />
          </label>
        </v-row>
        <v-row>
          <v-btn  class="upload-btn" @click="onUpload">
            UPLAOD
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { eventBus } from "./../../main";

export default {
  data: function () {
    return {
      selectedFile: null,
      windowWidtha: window.innerWidth,
      isFileSelected: false,
    };
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      var output = document.getElementById("output");
      output.src = URL.createObjectURL(event.target.files[0]);
      console.log("UploadPhoto 234: out src", output.src);

      this.isFileSelected = true;
      output.onload = function () {};
    },
    onUpload() {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);

      axios
        .post("http://localhost:3000/upload-photo", fd, {
          headers: { authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          eventBus.$emit("photoChanged", res.data);
        });
    },
    onResize() {
      console.log("Uploadphoto.vue", this.windowWidtha);
      this.windowWidtha = window.innerWidth;
    },
    getPicture() {
      return this.$store.getters.getUserSrchPic;
    },
  },
  created() {
    let userId = localStorage.getItem("userID");
    this.$store.dispatch("getUserSearchPic", userId);
  },

  watch: {
    windowWidtha(oldWidth, newWidth) {
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
img {
  border-radius: 50%;
  margin-bottom: 50px;
  max-height: 200px;
}

.center {
  text-align: center;
  padding: 0 0 0 0;
}

.input-file1 {
  padding-left: 150px;
}

label {
  cursor: pointer;
  padding-right: 110px;
  color: #1976d2;
}

#upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

.form-g {
  box-shadow: 1px 1px rgb(231, 186, 186);
  border: 1px solid;
  padding: 10px;
  width: 300px;
  height: 200px;
  text-align: center;
}

.img-cus {
  border-radius: 50%;
}
.main-upload-photo-div {
  margin-left: 40%;
  margin-top: 20%;
}
.upload-btn {
  margin-left: 40px;
  margin-top: 10px;
  color: #fff;
  background-color: #1976d2 !important;
}

.form-image {
  /* background-color:#5b86d6;
  text-align: center; */
}
</style>