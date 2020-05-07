<template>
    <div v-if="progressLoader" class="padleft050 padright050 marginbottom050" >
        <v-progress-linear :value="progressLoader"></v-progress-linear>
        <div class="caption flex spacebetween" >
            <div>
                <span v-if="totalItems" >{{execTimes}}/{{totalItems}}</span> {{progressText}} 
            </div>
            <div>
                {{Math.round(progressLoader)}}%
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        progressText: undefined,
        progressLoader: undefined,
        incrementValue: undefined,
        totalItems: undefined,
        execTimes: 0,
        isSet: false
    }),
    methods: {
        updateProgressText(text, totalItems) {
            this.progressText = text
            if(totalItems) {
                const t = 100 / Math.round(totalItems)

                if(this.progressLoader == 1) {
                    this.totalItems = totalItems
                    this.progressLoader = t
                    this.incrementValue = t
                    this.isSet = true
                    this.execTimes = this.execTimes + 1
                }
            } else {
                if(!this.isSet) {
                    this.progressLoader = 1
                    this.incrementValue = 1
                }

                if(this.isSet) {
                    this.execTimes = this.execTimes + 1
                    this.progressLoader = this.progressLoader + this.incrementValue
                }
            }

            
        }
    },
    mounted() {
        this.$emit('progressMethod',this.updateProgressText)
    }
}
</script>