<template>
  <div>
    <v-app id="inspire">
      <v-app id="inspire">
        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>{{ $t("auth.Login") }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn icon large target="_blank" v-on="on">
                          <v-toolbar-title>
                            <router-link style="color: 'white'" to="/signup">
                              <span>{{ $t("auth.Signup") }}</span>
                            </router-link>
                          </v-toolbar-title>
                        </v-btn>
                      </template>
                      <span>New Account</span>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        :label="$t('auth.Email')"
                        name="login"
                        prepend-icon="mdi-email"
                        type="text"
                        v-model="email"
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        :label="$t('auth.Password')"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      @click.prevent="login"
                      class="login-btn"
                      >Login</v-btn
                    >
                  </v-card-actions>
                </v-card>

                <v-row>
                  <v-col offset="3">
                    <span @click="arabic">
                      <country-flag country="sy" size="big" />
                    </span>
                    <span @click="english">
                      <country-flag country="gb" size="big" />
                    </span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import CountryFlag from "vue-country-flag";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      langs: ["en", "ar"],
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    arabic() {
      this.$i18n.locale = "ar";
    },
    english() {
      console.log("11", this.$i18n.locale);
      this.$i18n.locale = "en";
    },
  },
  components: {
    CountryFlag,
  },
};
</script>

<style scoped>
.login-btn {
  margin-right: 50%;
  width: 100%;
}

.v-application a {
  margin-right: 40px;
  color: white;
}
</style>