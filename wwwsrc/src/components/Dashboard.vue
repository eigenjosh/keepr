<template>
    <div class="dashboard">
        <header>
            <div class="jumbotron">
            </div>
        </header>

        <body>
            <div class="container-fluid">
                <div class="site-wrapper-inner">
                    <div class="cover-container">
                        <div class="masthead">
                            <div class="inner">
                                <h4 v-if="activeUser.username == null">Hello {{activeUser.username}}</h4>
                                <h3 class="masthead-brand">Keepr</h3>
                                <nav>
                                    <ul class="nav masthead-nav">
                                        <li class="active">
                                            <router-link :to="{name: 'Home'}">Home</router-link>
                                        </li>
                                        <li>
                                            <router-link :to="{name: 'Register'}">Sign up</router-link>
                                        </li>
                                        <li>
                                            <router-link v-if="activeUser.username == null" :to="{name: 'Login'}">Login</router-link>
                                        </li>
                                        <li>
                                            <router-link v-if="activeUser.username != null" :to="{name: 'Home'}" @click="logout">Log out</router-link>
                                        </li>
                                        <li>
                                            <router-link v-if="activeUser.username != null" :to="{name: 'NewKeep'}">Create Keep</router-link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div class="inner cover">
                            <keep v-for="(keep) in homeVault" :keep="keep" :key="keep.id"></keep>
                        </div>
                        <div class="mastfoot">
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
    import Register from './Register.vue'
    import Keep from './Keep.vue'
    import Login from './Login.vue'
    import Home from './Home.vue'
    import Vault from './Vault.vue'
    export default {
        name: 'home',
        data() {
            return {
                date: Date,
                signUp: {
                    username: '',
                    email: '',
                    password: '',
                    rPassword: ''
                },
                error: false,
                login: {
                    email: '',
                    password: ''
                },
                keep: {
                    id: '',
                    name: '',
                    description: '',
                    imgUrl: '',
                    userId: ''
                },
                validator: {
                    form: false
                }
            }
        },
        components: {
            Keep,
            Register,
            Login
        },
        mounted() {
            this.$store.dispatch('getAllKeeps');
            this.$store.dispatch('authenticate');
            this.date = new Date().toJSON().split('T')[0];
            this.$store.commit('setActiveVault')
        },
        computed: {
            activeUser() {
                return this.$store.state.activeUser
            },
            allKeeps() {
                return this.$store.state.allKeeps
            },
            homeVault() {
                return this.$store.state.homeVault
            },
            handledError() {
                return this.$store.state.error
            },
        },
        methods: {
            submitLogin() {
                this.$store.dispatch('login', this.login)
                this.login = {
                    email: '',
                    password: ''
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

<style scoped>
    a,
    a:focus,
    a:hover {
        color: #fff;
    }

    body {
        color: #fff;
        text-align: center;
        background-color: rgba(224, 183, 0, 0.747);
        text-shadow: 0 1px 3px rgba(0, 0, 0, .5);
        margin-bottom: 0%;
    }

    /* Extra markup and styles for table-esque vertical and horizontal centering */

    .site-wrapper {
        display: table;
        width: 100%;
        height: 100%;
        min-height: 100%;
        -webkit-box-shadow: inset 0 0 100px rgba(0, 0, 0, .5);
        box-shadow: inset 0 0 100px rgba(0, 0, 0, .5);
    }

    .site-wrapper-inner {
        display: inline-block;
        vertical-align: top;
    }

    .cover-container {
        margin-right: auto;
        margin-left: auto;
    }

    /* Padding for spacing */

    /* 
        .inner {
          padding: 30px;
        } */

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

    /* .cover {
          padding: 0 20px;
        } */

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
            position: absolute;
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
        background-color: rgb(211, 211, 211);
        margin-bottom: 0%;
    }

    h2.bb-docs {
        font-size: 1.8rem;
        font-family: "MozTT", Sans-serif;
        font-weight: lighter;
        color: #666;
        margin: -0.1rem 0 0;
        background-color: #f5f5f5;
        padding: 0.4rem 0.4rem 0.4rem 3rem;
        border: solid 0.1rem #e8e8e8;
    }

    div.bb-docs {
        padding: 1rem;
    }

    div.bb-docs.dark {
        background: #000;
    }
</style>