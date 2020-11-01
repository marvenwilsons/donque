<template>
    <div v-if="progressLoader" class="padleft050 padright050 marginbottom050" >
        <div class="flex flexcenter" >
            <v-progress-linear :value="progressLoader"></v-progress-linear>
            <v-icon v-if="!ptIsOpen" @click="ptIsOpen = true" class="pointer marginleft050" small >
                mdi-arrow-left-drop-circle
            </v-icon>
            <v-icon v-if="ptIsOpen" @click="ptIsOpen = false" class="pointer marginleft050" small >
                mdi-arrow-down-drop-circle
            </v-icon>
        </div>
                           
        <div class="caption flex spacebetween" >
            <div>
                <span v-if="totalItems" >{{execTimes}}/{{totalItems}}</span> {{progressText}} 
            </div>
            <div>
                <div> 
                    {{Math.round(progressLoader)}}% 

                </div>
            </div>
        </div>
        <v-expand-transition>
            <div v-if="ptIsOpen" style="background: black; color:white; height: 100px; overflow:auto;" class="pad025 relative" >
                <div class="absolute" >
                    <div v-for="(item,index) in processStack" :key="item" >
                        <code style="background: black; color:white" >
                            process {{index + 1}}: &nbsp; {{item}}
                        </code>
                    </div>
                </div>
            </div>
        </v-expand-transition>

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
        isSet: false,
        processStack: [],
        ptIsOpen: false
    }),
    watch: {
        progressText(n) {
            this.processStack.push(n)
        }
    },
    methods: {
        updateProgressText(text, totalItems) {
            this.progressText = text
            if(totalItems && typeof totalItems == 'number') {
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

                    if(totalItems && typeof totalItems == 'function') {
                        if(Math.round(this.progressLoader) === 100) {
                            setTimeout(() => {
                                totalItems()
                            }, 500);
                        }
                    }
                }
            }

            
        }
    },
    mounted() {
        this.$emit('progressMethod',this.updateProgressText)
    }
}
</script>