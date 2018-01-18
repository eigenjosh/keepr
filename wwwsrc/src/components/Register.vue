<template>
  <div class="register">
    <router-link to="/">Home</router-link>
    <form class="form-signin">
      <h2 class="form-signin-heading">Create a new account</h2>
      <label for="inputUsername" class="sr-only">Username</label>
      <input type="username" id="inputUsername" class="form-control" placeholder="Username" v-model="signUp.username" required
        autofocus>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="signUp.email" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="signUp.password" required>
      <label for="inputrPassword" class="sr-only">Confirm Password</label>
      <input type="password" id="inputrPassword" class="form-control" placeholder="Confirm Password" v-model="signUp.rPassword"
        required>
      <div class="checkbox">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click="submitRegister">Submit</button>cd
    </form>
  </div>
</template>
<script>
  import Login from './Login.vue'
  export default {
    name: "Register",
    data() {
      return {
        date: Date,
        signUp: {
          username: "",
          email: "",
          password: "",
          rPassword: ""
        },
        error: false,
        validator: {
          form: false
        }
      };
    },
    components: {
      Login
    },
    mounted() {
      // this.$store.dispatch("authenticate");
      this.date = new Date().toJSON().split("T")[0];
    },
    computed: {},
    methods: {
      submitRegister() {
        if (this.signUp.password == this.signUp.rPassword) {
          this.$store.dispatch('register', this.signUp)
        } else {
          this.error = true
          console.error({ error: "Passwords Do Not Match" })
        }
      }
    }
  };
</script>
<style scoped>
  body {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #eee;
  }

  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>