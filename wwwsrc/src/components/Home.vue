<template>
  <div class="home">
    <header>
      <div class="jumbotron">
      </div>
    </header>

    <body>
      <div class="site-wrapper">
        <div class="site-wrapper-inner">
          <div class="cover-container">
            <div class="masthead clearfix">
              <div class="inner">
                <h3 class="masthead-brand">Keepr</h3>
                <nav>
                  <ul class="nav masthead-nav">
                    <li class="active">
                      <router-link to="home">Home</router-link>
                    </li>
                    <li>
                      <router-link to="accounts/register">Sign up</router-link>
                    </li>
                    <li>
                      <router-link to="accounts/login">Login</router-link>
                    </li>
                  </ul>
                  <!-- <div class="bb-docs">
                    <ul class="compact">
                      <li>
                        <button class="btn-default">Sign Up</button>
                      </li>
                      <li>
                        <button class="btn-info">Login</button>
                      </li>
                    </ul>
                  </div> -->
                </nav>
              </div>
            </div>
            <div class="inner cover">
              <ul id="allKeeps">
                <li v-for="keep in testVault" class="row">
                  <div class="col-s-4">
                    <h4>{{keep.name}}</h4>
                  </div>
                  <img :src="keep.imgUrl" style="background-image: url(keep.imgUrl)" class="keepimg">
                </li>
              </ul>
            </div>
            <div class="mastfoot">
              <div class="inner">
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    <footer>
    </footer>
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
          description: '',
          imgUrl: ''
        },
        validator: {
          form: false
        }
      }
    },
    components: {
    },
    mounted() {
      this.$store.dispatch('getAllKeeps')
      this.date = new Date().toJSON().split('T')[0];
    },
    computed: {
      activeUser() {
        return this.$store.state.activeUser
      },
      allKeeps() {
        return this.$store.state.allKeeps
      },
      testVault() {
        return this.$store.state.vault
      }
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
          this.$store.dispatch('createKeep', { keep: this.keep, user: this.activeUser })
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
  /*
 * Globals
 */

  /* * {
    background-color: #000;
  } */

  /* Links */

  a,
  a:focus,
  a:hover {
    color: #fff;
  }

  /* Custom default button */

  /* .btn-default,
  .btn-default:hover,
  .btn-default:focus {
    color: #333;
    text-shadow: none;
    /* Prevent inheritance from `body` */

  /* background-color: #fff;
    border: 1px solid #fff;
  }
 */

  /*
 * Base structure
 */

  body {
    height: 100%;
    /* background-image: url("../assets/ad.jpg"); */
  }

  html {
    background-color: rgba(40, 132, 160, 0.527);
  }

  body {
    color: #fff;
    text-align: center;
    text-shadow: 0 1px 3px rgba(0, 0, 0, .5);
  }

  /* Extra markup and styles for table-esque vertical and horizontal centering */

  .site-wrapper {
    display: table;
    width: 100%;
    height: 100%;
    /* For at least Firefox */
    min-height: 100%;
    -webkit-box-shadow: inset 0 0 100px rgba(0, 0, 0, .5);
    box-shadow: inset 0 0 100px rgba(0, 0, 0, .5);
  }

  .site-wrapper-inner {
    display: table-cell;
    vertical-align: top;
  }

  .cover-container {
    margin-right: auto;
    margin-left: auto;
  }

  /* Padding for spacing */

  .inner {
    padding: 30px;
  }


  /*
 * Header
 */

  .masthead-brand {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .masthead-nav>li {
    display: inline-block;
  }

  .masthead-nav>li+li {
    margin-left: 20px;
  }

  .masthead-nav>li>a {
    padding-right: 0;
    padding-left: 0;
    font-size: 16px;
    font-weight: bold;
    color: rgb(153, 146, 146);
    /* IE8 proofing */
    color: rgba(255, 255, 255, .75);
    border-bottom: 2px solid transparent;
  }

  .masthead-nav>li>a:hover,
  .masthead-nav>li>a:focus {
    background-color: transparent;
    border-bottom-color: #a9a9a9;
    border-bottom-color: rgba(255, 255, 255, .25);
  }

  .masthead-nav>.active>a,
  .masthead-nav>.active>a:hover,
  .masthead-nav>.active>a:focus {
    color: #fff;
    border-bottom-color: rgb(143, 138, 138);
  }

  @media (min-width: 768px) {
    .masthead-brand {
      float: left;
    }
    .masthead-nav {
      float: right;
    }
  }


  /*
 * Cover
 */

  .cover {
    padding: 0 20px;
  }

  .cover .btn-lg {
    padding: 10px 20px;
    font-weight: bold;
  }


  /*
 * Footer
 */

  .mastfoot {
    color: #999;
    /* IE8 proofing */
    color: rgba(255, 255, 255, .5);
  }


  /*
 * Affix and center
 */

  @media (min-width: 768px) {
    /* Pull out the header and footer */
    .masthead {
      position: fixed;
      top: 0;
    }
    .mastfoot {
      position: fixed;
      bottom: 0;
    }
    /* Start the vertical centering */
    .site-wrapper-inner {
      vertical-align: middle;
    }
    /* Handle the widths */
    .masthead,
    .mastfoot,
    .cover-container {
      width: 100%;
      /* Must be percentage or pixels for horizontal alignment */
    }
  }

  @media (min-width: 992px) {
    .masthead,
    .mastfoot,
    .cover-container {
      width: 700px;
    }
  }

  .jumbotron {
    background-color: rgb(211, 211, 211)
  }

  h2.bb-docs {
    font-size: 1.8rem;
    font-family: "MozTT", Sans-serif;
    font-weight: lighter;
    color: #666;
    margin: -0.1rem 0 0;
    /* background-color: #f5f5f5; */
    padding: 0.4rem 0.4rem 0.4rem 3rem;
    border: solid 0.1rem #e8e8e8;
  }

  div.bb-docs {
    padding: 1rem;
  }

  div.bb-docs.dark {
    background: #000;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .keepimg {
    max-height: 300px;
    max-width: 200px;
  }
</style>