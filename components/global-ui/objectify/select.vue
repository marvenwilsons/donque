<template>
    <div class="relative">
        <div @click="mutate_option_open" class="pointer flex spacebetween">
            <span class="padleft025">{{selected_opt}}</span>
            <span class="padright025">&#8964;</span>
        </div>
        <div id="option-container" style="background:white;" v-if="option_open" class="absolute fullwidth bordergray">
            <div @click="select_opt(opt)" class="pointer pad025" v-for="opt in data.options" :key="`t-${opt}`">{{opt}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data", "_key"],
    data: () => ({
        option_open: false,
        selected_opt: undefined
    }),
    computed: {
        get_selected_opt() {
            return this.selected_opt
        },
        get_option_open_state() {
            return this.option_open
        }
    },
    watch: {
        get_selected_opt(current,prev) {
        }
    },
    methods: {
        mutate_option_open() {
            this.option_open = !this.option_open
        },
        select_opt(opt) {
            this.selected_opt = opt
            this.option_open = false            
        }
    }
}
</script>

<style>
#option-container {
    margin-top: 5px;
    box-shadow: 2px 2px 15px 1px #393e4244;
}
#option-container > div:hover {
    background: lightgray;
}

</style>