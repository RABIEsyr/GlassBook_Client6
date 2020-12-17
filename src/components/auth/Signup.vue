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
                    <v-toolbar-title>Signup</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <!-- <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        :href="source"
                        icon
                        large
                        target="_blank"
                        v-on="on"
                      >
                        <v-icon>mdi-code-tags</v-icon>
                      </v-btn>
                    </template>
                    <span>Source</span>
                  </v-tooltip> -->
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn icon large target="_blank" v-on="on">
                          <v-toolbar-title>
                            <router-link style="color: white" to="/login">
                              <span style="color: white; margin-right: 40px"
                                >Login</span
                              >
                            </router-link>
                          </v-toolbar-title>
                        </v-btn>
                      </template>
                      <span>alreday have an account</span>
                    </v-tooltip>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <v-text-field
                        label="Name"
                        name="name"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="name"
                        :counter="10"
                        :error-messages="nameErrors"
                        @input="$v.name.$touch()"
                        @blur="$v.name.$touch()"
                        required
                      ></v-text-field>
                      <!-- <p v-if="!$v.name.required">enter name</p> -->
                      <v-text-field
                        label="Email"
                        name="email"
                        prepend-icon="mdi-email"
                        type="text"
                        v-model="email"
                        :error-messages="emailErrors"
                        @input="$v.email.$touch()"
                        @blur="$v.email.$touch()"
                        required
                      ></v-text-field>
                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :error-messages="passwordErrors"
                        @blur="$v.password.$touch()"
                        @input="$v.password.$touch()"
                      ></v-text-field>
                      <v-text-field
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="confirmPassword"
                        :error-messages="confirmPasswordErrors"
                        @blur="$v.confirmPassword.$touch()"
                        @input="$v.confirmPassword.$touch()"
                      ></v-text-field>

                      <v-radio-group v-model="radio" required>
                        <v-radio label="Male" value="male"></v-radio>
                        <v-radio label="Femal" value="femal"></v-radio>
                      </v-radio-group>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      class="login-btn"
                      color="primary"
                      :disabled="disable"
                      @click.prevent="onSignup"
                      >Signup</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  props: {
    source: String,
  },
  data: function () {
    return {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      genders: ["Male", "Female"],
      primaryDrawer: {
        model: null,
        type: "",
        clipped: false,
        floating: false,
        mini: false,
      },
      radio: "male",
    };
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signup", {
        name: this.name,
        email: this.email,
        password: this.password,
        gender: this.radio,
      });
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
    name: {
      required,
      maxLength: maxLength(10),
    },
    confirmPassword: {
      required,
      same: sameAs("password"),
    },
    gender: {
      required,
    },
  },
  computed: {
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      // !this.$v.name.decimal && errors.push('Name must be a number')
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      !this.$v.password.minLength &&
        errors.push("Password should be at least 8 characters");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required && errors.push("Password is required");
      !this.$v.confirmPassword.same && errors.push("password not matched");
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.gender.$dirty) return errors;
      !this.$v.gender.required && errors.push("Gender is required");
      return errors;
    },
    disable() {
      console.log();
      if (
        this.$v.name.required &&
        this.$v.password.required &&
        this.$v.confirmPassword.required &&
        this.$v.confirmPassword.same &&
        this.$v.email.required &&
        this.$v.email.email
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.login-btn {
  margin-right: 50%;
  width: 100%;
}

.invalid {
  border: 1px solid red;
  background-color: #ffc9aa;
}

.invalid-text {
  color: red;
}

@media (min-width: 960px) {
  .col-md-4 {
    flex: 0.1 0 33.3333333333%;
    max-width: 100% !important;
  }
}
</style>