<template>
  <div class="home">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" style="font-family: 'Abril Fatface', cursive">Keepr</a>
        <!-- <div class="text-right" v-if="activeUser.hasOwnProperty('name')"> -->
        <!-- <p class="navbar-text">Welcome {{activeUser.name}}</p> -->
        <button type="button" class="btn btn-primary navbar-btn" data-toggle="modal" data-target="#myModal3" @click="validateForm">Create Keep</button>
        <button type="button" class="btn btn-danger navbar-btn logout-btn" @click="logout">Logout</button>
      </div>
      <!-- <div class="text-right" v-else> -->
      <button type="button" class="btn btn-primary navbar-btn " data-toggle="modal" data-target="#myModal">Login</button>
      <button type="button" class="btn btn-success navbar-btn" data-toggle="modal" data-target="#myModal2">Sign-up</button>


      <!-- MENU DROWDOWN -->
      <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">
        <ul>
          <!-- <div v-if="activeUser.hasOwnProperty('name')"> -->
          <li>
            <router-link :to="{name: 'createdKeeps'}">
              <button type="button" class="btn btn-default nav-drop-btn">Keeps I've Created</button>
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'myKeeps'}">
              <button type="button" class="btn btn-default nav-drop-btn">My Keeps</button>
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'userNotes'}">
              <button type="button" class="btn btn-default nav-drop-btn">My Notes</button>
            </router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
        </ul>
      </div>
    </nav>

    <div class="container-fluid bgimg-1">
      <div class="row main-heading">
        <div class="col-xs-12">
          <h1 id="main-logo">keepr</h1>
        </div>
        <div class="col-xs-12">
          <h2>Things-you-like Sharer</h2>
        </div>
      </div>
    </div>

    <div class="container-fluid text-responsive">
      <div class="row space-text extra-padding">
        <div class="col-xs-12 col-md-offset-3 col-md-6 col-md-offset-3">
          <h1 style="font-family: 'Abril Fatface', cursive;">Keepr</h1>
          <h2> lets you do stuff.</h2>
        </div>
      </div>
    </div>
    <!-- LOGIN MODAL -->

    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Sign in to your account</h4>
          </div>
          <div class="modal-body">
            <form id="login" class="form">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model='login.email'>
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model='login.password'>
              </div>
              <div class="form-group">
                <button class="btn btn-submit btn-success" @click="submitLogin" data-dismiss="modal" type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- SIGN UP MODAL -->

    <div id="myModal2" class="modal fade" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Create a Keepr Account</h4>
            <p v-if="error">
              <b>Your Passwords Do Not Match</b>
            </p>
          </div>
          <div class="modal-body">
            <form id="register" class="form">
              <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="firstName" name="firstName" maxlength="20" class="form-control" placeholder="First Name" required v-model="signUp.firstName">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="lastName" name="lastName" maxlength="20" class="form-control" placeholder="Last Name" required v-model="signUp.lastName">
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" maxlength="57" name="email" class="form-control" placeholder="Email" required v-model="signUp.email">
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" name="password" maxlength="20" class="form-control" placeholder="password" required v-model="signUp.password">
              </div>
              <div class="form-group">
                <label for="reEnterPassword">Re-enter Password:</label>
                <input type="password" name="reEnterPassword" maxlength="20" class="form-control" placeholder="Re Enter Password" v-model="signUp.rPassword">
              </div>
              <div class="form-group">
                <button class="btn btn-submit btn-success" data-dismiss="modal" type="submit" @click="submitRegister">Submit</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>

    <!-- Create new keep modal -->
    <div id="myModal3" class="modal fade" role="dialog">
      <div class="modal-dialog">


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        date: Date,
        signUp: {
          firstName: '',
          lastName: '',
          email: '',
          name: '',
          password: '',
          rPassword: ''
        },
        error: false,
        login: {
          email: '',
          password: ''
        },
        keep: {
          name: '',
          imgUrl: '',
        },
        validator: {
          form: false
        }
      }
    },
    components: {
    },
    mounted() {
      this.$store.dispatch('authenticate')
      this.date = new Date().toJSON().split('T')[0];
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser
      },
    },
    methods: {
      validateZip() {
        this.validator.zip = (this.keep.zip.length == 5)
      },
      validateStartDate() {
        this.validator.startDate = (new Date(this.keep.startDate).getTime() >= new Date(this.date).getTime())
      },
      validateEndDate() {
        this.validator.endDate = (new Date(this.keep.endDate).getTime() >= new Date(this.keep.startDate).getTime())
      },
      validateForm() {
        this.validateZip()
        this.validateStartDate()
        this.validateEndDate()
        this.validator.form = (this.validator.zip && this.validator.startDate && this.validator.endDate)
        console.log('validator: ', this.validator)
      },
      submitLogin() {

        this.$store.dispatch('login', this.login)
        this.login = {
          email: '',
          password: ''
        }
      },
      submitRegister() {
        if (this.signUp.password == this.signUp.rPassword) {
          this.signUp.name = this.signUp.firstName + ' ' + this.signUp.lastName
          this.$store.dispatch('register', this.signUp)
        } else {
          this.error = true
          console.error({ error: "Passwords Do Not Match" })
        }
      },
      logout() {
        this.$store.dispatch('logout')
      },
      createKeep() {
        this.validateForm()
        if (this.validator.form) {
          this.$store.dispatch('createEvent', { keep: this.keep, user: this.activeUser })
          this.keep = {
            name: '',
            imageUrl: '',
            description: '',
          }
        }

      }
    }
  }
</script>

<style>
  .home {
    height: 100%;
    margin: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center
  }

  @media screen and (min-width: 500px) {
    #main-logo {
      font-size: 150px;
    }
  }

  @media screen and (min-width: 500px) {
    #second-logo {
      font-size: 100px;
    }
  }

  @media screen and (max-width: 500px) {
    .no-padding-xs {
      position: absolute;
      left: 0;
      top: 10%;
      width: 100%;
      text-align: center;
      color: white;
      font-family: 'Lato', sans-serif;
      font-size: 50px;
      letter-spacing: 10px;
    }
  }

  @media screen and (min-width: 501px) {
    .extra-padding-md {
      position: absolute;
      left: 0;
      top: 20%;
      width: 100%;
      text-align: center;
      color: white;
      font-family: 'Lato', sans-serif;
      font-size: 50px;
      letter-spacing: 10px;
      padding: 50px 80px;
    }
  }

  /* BACKGROUND PHOTOS */

  .bgimg-1,
  .bgimg-2,
  .bgimg-3 {
    position: relative;
    opacity: 0.65;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .bgimg-3 {
    background-image: url("https://images.unsplash.com/38/awhCbhLqRceCdjcPQUnn_IMG_0249.jpg?dpr=1&auto=format&fit=crop&w=967&q=60&cs=tinysrgb");
    min-height: 400px;
  }

  @media screen and (min-width: 500px) {
    #main-logo {
      font-size: 150px;
    }
  }

  @media screen and (max-width: 500px) {
    .my-img-responsive {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }

  .caption {
    position: absolute;
    left: 0;
    top: 20%;
    width: 100%;
    text-align: center;
    color: white;
    font-family: 'Lato', sans-serif;
    padding: 18px;
    font-size: 50px;
    letter-spacing: 10px;
  }

  .space-text {
    color: #fff;
    background-color: #111;
    font-family: 'Lato', sans-serif;
    letter-spacing: 5px;
  }

  .off-section {
    color: black;
    background-color: white;
    font-family: 'Lato', sans-serif;
    letter-spacing: 5px;
  }

  .extra-padding {
    padding: 50px 80px;
  }

  .spacer {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .top-spacer {
    margin-bottom: 10px;
  }

  .main-heading {
    font-family: 'Abril Fatface', cursive;
    text-shadow: 0px 0px 35px black;
    color: white;
    margin-top: 275px;
  }

  .btn-default {
    width: 100%;
  }

  .screenshot {
    margin-left: 50px;
  }

  .navbar ul {
    list-style-type: none;
  }

  .logout-btn {
    margin-left: 2px;
  }

  @media (max-width: 2000px) {
    .navbar-header {
      float: none;
    }
    .navbar-toggle {
      display: block;
    }
    .navbar-collapse {
      border-top: 1px solid transparent;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    .navbar-collapse.collapse {
      display: none!important;
    }
    .navbar-collapse.collapse.in {
      display: block!important;
    }
    .navbar-nav {
      float: none!important;
      margin: 7.5px -15px;
    }
    .navbar-nav>li {
      float: none;
    }
    .navbar-nav>li>a {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .state {
      width: 50%
    }
    .nav-drop-btn {
      width: 90%;
      background-color: #FFFFF9;
      margin: 2px;
      font: black;
    }
    /* .multi-img-one {
            margin-top: -50px;
            margin-bottom: -10px;
        } */
    .multi-img-two {
      margin-top: -10px;
      margin-bottom: -10px;
    }
    /* .multi-img-three {
            
        } */
    .multi-img-four {
      margin-top: -10px;
      margin-bottom: -10px;
    }

    .multi-text {
      padding-top: 50px;
      padding-bottom: 10px;
    }

    .multi-text-one {
      padding-top: 100px;
      padding-bottom: 50px;
    }

    .multi-text-two {
      padding-top: 75px;
      padding-bottom: 50px;
    }

    .multi-text-three {
      padding-top: 60px;
      padding-bottom: 50px;
    }

    .multi-text-four {
      padding-top: 70px;
      padding-bottom: 50px;
    }
  }
</style>