<template>
    <div>
        <input :placeholder="number_placeholder" v-model="number_v_model" :style="{border:'none',outline:'none', color: color.color}" class="fullwidth pad025 dq-inp-objtfy" type="number" />
    </div>
</template>

<script>
    export default {
        props: ["data", "_key", "color"],
        data: () => ({
            number_v_model: undefined,
            number_placeholder: undefined
        }),
        watch: {
            number_v_model(current_input,prev_input){
                if (this.data.max < current_input) {
                    this.$emit("onChange", {
                        err: `The value of ${this._key} exceeds the defined maximum value of ${this.data.max}`,
                        data: null,
                        key: this._key
                    })
                } else if (this.data.min > current_input) {
                    this.$emit("onChange", {
                        err: `The value of ${this._key} exceeds the defined maximum value of ${this.data.max}`,
                        data: null,
                        key: this._key
                    })
                } else {
                    this.$emit("onChange", {
                        err: null,
                        data: current_input,
                        key: this._key
                    })
                }
            }
        },
        mounted() {
            if(this.data.default){
                this.number_v_model = this.data.default
            } else {
                this.number_placeholder = 'none'
            }
        }
    }
</script>