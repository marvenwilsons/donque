<template>
    <div @click.right.prevent="" class="relative">
        <div @click="mutate_option_open" class="pointer flex spacebetween">
            <span class="padleft025">{{selected_opt}}</span>
            <span :style="{color:appearance.select_arrow_down_color}" class="padright025"><strong>&#8964;</strong></span>
        </div>
        <div id="option-container" :style="{background: appearance.background}" v-if="option_open" class="absolute fullwidth bordergray">
            <div>
                <div 
                    :style="{color: appearance.color, background: get_selected_opt == opt ? appearance.background_selected : ''}" 
                    @click="select_opt(opt)" 
                    class="pointer pad025" v-for="opt in data.options" 
                    :key="`t-${opt}`">{{opt}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data", "_key", "appearance"],
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
            this.data.default = this.data.options.indexOf(current)
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
    },
    mounted() {
        this.selected_opt = this.data.options[this.data.default]
    }
}
</script>

<style>
#option-container {
    margin-top: 5px;
    box-shadow: 2px 2px 15px 1px #393e4244;
    z-index: 100;
}
#option-container > div > div:hover {
    background: lightgray;
}

#option-container > div {
    max-height: 250px;
    overflow-x: hidden;
}

</style>