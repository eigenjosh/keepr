<template>
    <div class="register">
        <router-link to="/">Home</router-link>
        <form class="form-newVault">
            <h2 class="form-newVault-heading">Create a new vault</h2>
            <label for="inputName" class="sr-only">Title</label>
            <input type="name" id="inputName" class="form-control" placeholder="Name" v-model="vault.name" required autofocus>
            <label for="inputDescription" class="sr-only">Description</label>
            <input type="description" id="inputDescription" class="form-control" placeholder="Description" v-model="vault.description"
                required autofocus>
            <label>
                <input type="checkbox" value="public">Make Public
            </label>
    </div>
    <button class="btn btn-lg btn-primary btn-block" type="submit" @click="createVault">Submit</button>
    </form>
    </div>
</template>
<script>
    import Vault from './Vault.vue'
    export default {
        name: 'NewVault',
        data() {
            return {
                date: Date,
                vault: {
                    name: '',
                    description: '',
                    media: ''
                },
                error: false,
                vault: {
                    name: '',
                    description: '',
                    keeps: [],
                    public: false
                },
                validator: {
                    form: false
                }
            }
        },
        components: {
            Vault
        },
        mounted() {
            this.$store.dispatch('authenticate')
            this.date = new Date().toJSON().split('T')[0];
        },
        computed: {
            activeUser() {
                return this.$store.state.activeUser
            },
            allVaults() {
                return this.$store.state.allVaults
            }
        },
        methods: {
            createVault() {
                this.validateForm()
                if (this.validator.form) {
                    this.$store.dispatch('createVault', { vault: this.vault, user: this.activeUser })
                    this.vault = {
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
    body {
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #eee;
    }

    .form-newVault {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }

    .form-newVault .form-newVault-heading,
    .form-newVault .checkbox {
        margin-bottom: 10px;
    }

    .form-newVault .checkbox {
        font-weight: 400;
    }

    .form-newVault .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
    }

    .form-newVault .form-control:focus {
        z-index: 2;
    }

    .form-newVault input[type="description"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-newVault input[type="media"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>