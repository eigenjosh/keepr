<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <router-link :to="{path: 'vault/' + vault.id}">
                    <button class="lt-btn vault-btn word-wrap" @click="setActiveVault(vault)">
                        <div class="name">
                            <h5>{{vault.name}}</h5>
                        </div>
                        <div class="description">
                            <p>{{vault.description}}</p>
                        </div>
                        <div class="id">
                            <p>{{vault.id}}</p>
                        </div>
                    </button>
                </router-link>
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
    import Keep from './Keep.vue'
    export default {
        name: 'vault',
        props: ["vault"],
        data() {
            return {
                vault: {
                    name: name,
                    description: description,
                    userId: user._id,
                }
            }
        },
        computed: {
            vaults() {
                return this.$store.state.vaults
            }
        },
        methods: {
            setActiveVault(vault) {
                this.$store.dispatch('getVaultById', vault)
            }
        }
    }
</script>
<style>
    .img-space {
        padding-top: 50px;
        padding-bottom: 20px;
    }

    .image {
        max-height: 400px;
        max-width: 200px;
    }
</style>