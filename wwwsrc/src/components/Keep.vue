<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <router-link :to="{path: 'keep/' + keep.id}">
                    <button class="lt-btn keep-btn word-wrap" @click="setActiveKeep(keep)">
                        <div class="name">
                            <h5>{{keep.name}}</h5>
                        </div>
                        <div class="img-space">
                            <img :src="keep.imgUrl" class="image">
                        </div>
                        <div class="description">
                            <p>{{keep.description}}</p>
                        </div>
                        <div class="id">
                            <p>{{keep.id}}</p>
                        </div>
                    </button>
                </router-link>
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'keep',
        props: ["keep"],
        data() {
            return {

            }
        },
        computed: {
            keeps() {
                return this.$store.state.keeps
            }
        },
        methods: {
            setActiveKeep(keep) {
                this.$store.dispatch('getKeepById', keep)
            }
        }
    }
</script>
<style>
    .image{
        max-height: 500px;
        max-width: 300px;
    }
</style>