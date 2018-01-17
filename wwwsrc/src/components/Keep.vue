<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <router-link :to="{path: 'keep/' + keep.id}">
                    <button class="lt-btn event-btn word-wrap" @click="setActiveKeep(keep)">
                        <div class="col-xs-12">
                            <h3>{{keep.name}}</h3>
                        </div>
                        <div class="col-xs-12 img-space">
                            <img :src="keep.imgUrl" class="image">
                        </div>
                        <div class="col-xs-12">
                            <p>{{keep.description}}</p>
                        </div>
                        <div class="col-xs-12">
                            <p>{{keep.userId}}</p>
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
    .img-space {
        padding-top: 50px;
        padding-bottom: 20px;
    }
    .image{
        max-height: 400px;
        max-width: 200px;
    }
</style>