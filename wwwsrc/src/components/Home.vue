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
                      <router-link to="account/register">Sign up</router-link>
                    </li>
                    <li>
                      <router-link to="account/login">Login</router-link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div class="inner cover">
              <ul id="allKeeps">
                <li v-for="keep in allKeeps" class="row">
                  {{keep.name}} {{keep.image}}
                </li>
              </ul>
              <router-link to="/create-keep">Create keep</router-link>
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
  /*
 * Globals
 */

  /* Links */

  a,
  a:focus,
  a:hover {
    color: #fff;
  }

  /* Custom default button */

  .btn-default,
  .btn-default:hover,
  .btn-default:focus {
    color: #333;
    text-shadow: none;
    /* Prevent inheritance from `body` */
    background-color: #fff;
    border: 1px solid #fff;
  }


  /*
 * Base structure
 */

  html,
  body {
    height: 100%;
    background-color: rgb(46, 97, 173);
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
</style>