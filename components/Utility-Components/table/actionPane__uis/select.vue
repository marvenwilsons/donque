<template>
    <div class="pad025 relative">
        <div v-if="isActive == false" class="absolute fullwidth fullheight-percent strnotActive" style="z-index:100" ></div>
        <div class="marginbottom050">select:</div>
        <div>
            <select v-model="selected" class="fullwidth">
                <option v-for="option in options" :key="option" :value="option">{{option}}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: Array,
        owner: String,
        activeFilters: Array,
        filterArray: Array
    },
    data: () => ({
        selected: undefined,
        isActive: false
    }),
    watch: {
        filterArray(d) {
            d.map(e => {
                if(e.name == this.owner) {
                    this.selected = e.query
                }
            })
        },
        selected() {
            this.$emit('onSelection', {
                selected: this.selected,
                owner: this.owner
            })
        },
        activeFilters() {
            this.isActive = this.activeFilters.includes(this.owner)
            !this.isActive && (this.selected = null)
        }
    }
};
</script>

<style>
select{
    padding: 2px;
}
</style>