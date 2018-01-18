<template>
    <div class="newKeep">
        Create a new Keep
    </div>
</template>
<script>
    import Vault from './Vault.vue'
    export default {
        name: 'NewKeep',
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
<style>
</style>