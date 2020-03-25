<template>
    <div id="tb-modal-host" class="absolute fullwidth fullheight-percent flex flexcenter">
        <div class="pad125">
            <div v-if="isLoading">
                <my-spinner></my-spinner>
                <div style="color: white;" class="flex flexcenter">Updating</div>
            </div>
        </div>
    </div>
</template>

<script>
import spinner from "./spinner";

export default {
    props: {
        isLoading: Boolean,
        isError: Boolean,
        message: String
    },
    components: {
        "my-spinner": spinner
    }
};
</script>

<style scoped>
#tb-modal-host {
    background: rgba(51, 51, 51, 0.363);
}
#tb-modal-host > div {
    box-shadow: 0px 0px 70px -41px rgba(0, 0, 0, 1);
    max-width: 80%;
}
</style>