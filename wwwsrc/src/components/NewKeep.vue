<template>
    <div class="register">
        <router-link to="/">Home</router-link>
        <form class="form-newKeep">
            <h2 class="form-newKeep-heading">Create a new keep</h2>
            <label for="inputName" class="sr-only">Title</label>
            <input type="name" id="inputName" class="form-control" placeholder="Name" v-model="keep.name" required autofocus>
            <label for="inputDescription" class="sr-only">Description</label>
            <input type="description" id="inputDescription" class="form-control" placeholder="Description" v-model="keep.description"
                required autofocus>
            <label for="inputMedia" class="sr-only">Media</label>
            <input type="media" id="inputMedia" class="form-control" placeholder="Media" v-model="keep.media" required>
            <div class="checkbox">
                <label>
                    <input type="checkbox" value="public">Make Public
                </label>
            </div>
            <button class="btn btn-lg btn-primary btn-block" type="submit" @click="submitRegister">Submit</button>
        </form>
    </div>
</template>
<script>
    import Keep from './Keep.vue'
    import Vault from './Vault.vue'
    export default {
        name: 'NewKeep',
        data() {
            return {
                date: Date,
                keep: {
                    firstName: '',
                    lastName: '',
                    Description: '',
                    name: '',
                    media: '',
                    rMedia: ''
                },
                error: false,
                login: {
                    Description: '',
                    media: ''
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
            Keep
        },
        mounted() {
            this.$store.dispatch('authenticate')
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
    body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #eee;
    }

    .form-newKeep {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }

    .form-newKeep .form-newKeep-heading,
    .form-newKeep .checkbox {
        margin-bottom: 10px;
    }

    .form-newKeep .checkbox {
        font-weight: 400;
    }

    .form-newKeep .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-newKeep .form-control:focus {
        z-index: 2;
    }

    .form-newKeep input[type="description"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-newKeep input[type="media"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>