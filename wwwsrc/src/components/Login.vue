<template>
    <div class="register">

      <form class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
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
  name: "Login",
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

</style>
