<template>
    <div class="fullwidth pad125">
        <div  class="flexend flex pad025 " >
            <span class="pointer" @click="$emit('onItemDelete')">Delete this item</span>
        </div>
        <d-objectify
            @onSubmit="updateHandler"
            v-if="isReady"
            :config="{
                data: latestSchema,
                operation: 'rw',
                show_modal: false,
                allowRemoveProp: false,
                submit_button: 'SAVE CHANGES', // string: if supplied the button will appear
            }"
            :appearance="appearance"
        ></d-objectify>
    </div>
</template>

<script>
import Objectify from "./Objectify/objectify-flat-settings";
import ObjectView_mixin from "./ObjectView";
import ObjectifyConverter from "./Objectify/converter";
export default {
    mixins: [ObjectView_mixin],
    props: {
        schema: Object,
        data: Object
    },
    data: () => ({
        isReady: true
    }),
    computed: {
        latestSchema() {
            return ObjectifyConverter(this.schema, this.data);
        }
    },
    methods: {
        updateHandler(data) {
            this.$emit("onSubmit", {
                new: data,
                old: this.data
            });
        }
    },
    watch: {
        data() {
            this.isReady = false;
            setTimeout(() => {
                this.isReady = true;
            }, 0);
        }
    },
    components: {
        "d-objectify": Objectify
    }
};
</script>