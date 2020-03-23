<template>
    <div class="margintop050 relative">
        <div v-if="isActive == false" class="absolute fullwidth fullheight-percent strnotActive" style="z-index:100" ></div>
        <div class="marginbottom050">mode:</div>
        <div class="flex spacebetween">
            <div
                :style="{...gt_style}"
                @click="modeSelected == 'greater than' ? modeSelected = false : modeSelected = 'greater than'"
                class="pad025 mdopt borderRad4 fullwidth flex flexcenter"
            >greater than</div>
            <div
                :style="{...ls_style}"
                @click="modeSelected == 'lesser than' ? modeSelected = false : modeSelected = 'lesser than'"
                class="pad025 mdopt borderRad4 fullwidth flex flexcenter"
            >lesser than</div>
            <div :style="{...equal_style}" @click="isEqual = !isEqual" class="pad025 mdopt borderRad4 padleft050 padright050">equal</div>
        </div>
        <div class="margintop050">
            <input v-model="query" class="pad025 fullwidth" type="number" />
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
        isEqual: true,
        modeSelected: undefined,
        query: null,
        currentMode: 'eq',
        isActive: false
    }),
    watch: {
        filterArray(d) {
            d.map(e => {
                if(e.name == this.owner) {
                    this.query = e.query
                }
            })
        },
        activeFilters() {
            this.isActive = this.activeFilters.includes(this.owner)
            !this.isActive && (this.selected = null)
        },
        query(newValue) {
            this.$emit('onNumber', {
                query: newValue,
                appendTo: this.owner
            })
        },
        modeSelected(newValue) {
            this.currentMode = newValue ? `${newValue}/eq` : 'eq'
            if(this.isEqual) {
                this.$emit('onNumMode',{
                    owner: this.owner,
                    mode: newValue ? `${newValue}/eq` : 'eq'
                })
            } else {
                this.currentMode = newValue
                this.$emit('onNumMode', {
                    owner: this.owner,
                    mode: newValue
                })
            }
        },
        isEqual(newValue) {
            if(this.modeSelected == undefined && newValue) {
                this.currentMode = 'eq'
                this.$emit('onNumMode', {
                    owner: this.owner,
                    mode: 'eq'
                })
            } else if(this.modeSelected && newValue) {
                this.$emit('onNumMode', {
                    owner: this.owner,
                    mode:`${this.modeSelected}/eq`
                })
            } else if(!newValue) {
                this.currentMode = this.modeSelected
                this.$emit('onNumMode', {
                    owner: this.owner,
                    mode:`${this.modeSelected}`
                })
            }
        }
    },
    computed: {
        gt_style() {
            let res = undefined;
            if (this.modeSelected === "greater than") {
                res = {
                    background: "#303340",
                    color:'white'
                };
            }
            return res;
        },
        ls_style() {
            let res = undefined;
            if (this.modeSelected === "lesser than") {
                res = {
                    background: "#629af4",
                    color:'white'
                };
            }
            return res;
        },
        equal_style() {
            let res = undefined;
            if (this.isEqual) {
                res = {
                    background: "#629af4",
                    color:'white'
                };
            }
            return res;
        }
    }
};
</script>

<style scoped>
.mdopt {
    border: 1px solid lightgray;
    cursor: pointer;
}
</style>