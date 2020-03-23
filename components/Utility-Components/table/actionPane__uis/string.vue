<template>
    <div class="relative">
        <div v-if="isActive == false" class="absolute fullwidth fullheight-percent strnotActive" style="z-index:100" ></div>
        <div class="margintop025">
            <div class="marginbottom025">mode:</div>
            <div class="flex">
                <span
                    @click="selectedMode = 'exact match'"
                    :style="{background: selectedMode == 'exact match' ? '#303340' : '', color:  selectedMode == 'exact match' ? 'white' : 'black'}"
                    class="strmdopt padleft125 padright125 borderRad4 pad025 pointer "
                >exact match</span>
                <span
                    @click="selectedMode = 'includes'"
                    :style="{background: selectedMode == 'includes' ? '#303340' : '', color: selectedMode == 'includes' ? 'white' : 'black'}"
                    class="marginright050 pad025 pointer strmdopt flex1 flex flexcenter borderRad4"
                >
                    includes | cs:
                    <input
                        class="marginleft050 pointer"
                        v-model="isCaseSensitive"
                        type="checkbox"
                    />
                </span>
            </div>
        </div>
        <div class="flex margintop050 marginright050">
            <input :disabled="!isActive" v-model="query" class="pad025 flex fullwidth" type="text" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        owner: String,
        activeFilters: Array,
        filterArray: Array
    },
    data: () => ({
        selectedMode: undefined,
        isCaseSensitive: false,
        query: null,
        isActive: false,
    }),
    watch: {
        filterArray(d) {
            d.map(e => {
                if(e.name == this.owner) {
                    this.query = e.query
                }
            })
        },
        selectedMode(newData) {
            this.$emit("onStrMode", {
                mode: newData,
                owner: this.owner
            });
            if (this.isCaseSensitive && this.selectedMode === "exact match") {
                this.isCaseSensitive = false;
            }
        },
        isCaseSensitive(newData) {
            this.$emit("isCaseSensitive", {
                mode: newData,
                owner: this.owner,
                sm: this.selectedMode
            });
        },
        activeFilters() {
            this.isActive = this.activeFilters.includes(this.owner)
            !this.isActive && (this.selected = null)
        },
        query() {
            this.$emit('onQuery',{query:this.query, appendTo:this.owner })

            if(this.query === "") {
                this.query = null
            }
        }
    },
    methods: {
        getMode() {
            if (this.isCaseSensitive) {
                return "includes/cs";
            } else {
                return this.selectedMode;
            }
        }
    },
    mounted() {
        this.selectedMode = "exact match";

    }
};
</script>

<style>
.strmdopt {
    border: 1px solid lightgray;
}
.strnotActive {
    cursor: not-allowed;
}
</style>