<template>
   <div class="register">
      <form class="form-signin">
        <h2 class="form-signin-heading">Create a new account</h2>
        <label for="inputUsername" class="sr-only">Username</label>
        <input type="username" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <label for="inputrPassword" class="sr-only">Confirm Password</label>
        <input type="cpassword" id="inputrPassword" class="form-control" placeholder="Confirm Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

    </div> <!-- /container -->
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      date: Date,
      signUp: {
        firstName: "",
        lastName: "",
        email: "",
        name: "",
        password: "",
        rPassword: ""
      },
      error: false,
      login: {
        email: "",
        password: ""
      },
      validator: {
        form: false
      }
    };
  },
  components: {},
  mounted() {
    // this.$store.dispatch("authenticate");
    this.date = new Date().toJSON().split("T")[0];
  },
  computed: {}
};
</script>
<style>
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
