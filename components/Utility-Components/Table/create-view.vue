<template>
    <div class="fullwidth flex">
        <!-- 1 -->
        <div class="sectionBox fullheight-percent flex flexcol flex1" >
            <div class="sectionTitle pad050 marginbottom050" >
                Select the keys to be included for new view
            </div>
            <div class="pad050 fullheight-percent" >
                <div style="overflow:auto;" class="sectionBox fullheight-percent relative" >
                    <div class="absolute fullwidth" >
                        <div 
                            class="pointer lpitem pad050" 
                            v-for="key in Object.keys(schema)" 
                            :key="key" 
                        >
                            <div class="flex spacebetween flexcenter padleft050" >
                                <div> <pre>{{key}}</pre> </div>
                                <button
                                    :disabled="selected.includes(key)"
                                    @click="selected.push(key)" class="tbdshdw buttonreset pad050">
                                    <strong style="color:gray;" > &#65291;</strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 2 -->
        <div class="sectionBox flex1 flex flexcol" >
            <div class="sectionTitle pad050 marginbottom050" >
                Selected key set for new view
            </div>
            <div class="pad050 fullheight-percent" >
                <div style="overflow:auto;" class="sectionBox fullheight-percent relative" >
                    <div class="absolute fullwidth" >
                        <div 
                            class="pointer lpitem pad050" 
                            v-for="(key,index) in selected" 
                            :key="key" 
                        >
                            <div class="flex spacebetween flexcenter padleft050" >
                                <div> <pre>{{key}}</pre> </div>
                                <button @click="selected.splice(index,1)" class="tbdshdw buttonreset pad050">
                                    <strong style="color:gray;" > &#8722;  </strong>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 3 -->
        <div class="sectionBox flex1  relative flex flexcol" >
            <div v-if="selected.length == 0" class="absolute fullwidth fullheight-percent not-allowed" ></div>
            <div>
                <div class="sectionTitle pad050 marginbottom050" >
                    Submit new view
                </div>
            </div>
            <div class="flex flexcol flexcenter flex1" >
                <div v-if="!similarError" >
                    <div class="flex  flex fullwidth flexcol flexstart" >
                        <label for="title">Title</label> 
                        <input v-model="viewTitle" class="pad025" type="text" name="" id="">
                    </div>
                    <div v-if="titleErr" class="backgrounderr pad050 margintop050" >
                        Title cannot be undefined
                    </div>
                    <div class="margintop050 fullwidth flex flexend" >
                        <button @click="createView" class="buttonreset pad050" >
                            Create View
                        </button>
                    </div>
                </div>
                <div v-if="similarError" >
                    <div class="backgrounderr pad050" >
                        {{similarError}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        schema: Object,
        savedViews: Array
    },
    data: () => ({
        selected: [],
        similarError: undefined,
        errorTitle: undefined,
        viewTitle: undefined,
        titleErr: false
    }),
    watch: {
        selected(newValue) {
            // scan for duplicates and giving
            this.savedViews.map(e => {
                if(JSON.stringify(e.view) == JSON.stringify(newValue)) {
                    this.similarError = `a similar view already exist, view: "${e.title}"`
                    this.errorTitle = e.title
                }
            })
            // clear errors
            if(this.similarError) {
                this.savedViews.map(e => {
                    if(JSON.stringify(e.view) != JSON.stringify(newValue)) {
                        if(e.title == this.errorTitle) {
                            this.errorTitle = undefined
                            this.similarError = undefined
                        }
                    }
                })
            }
        }
    },
    methods: {
        createView() {
            if(this.viewTitle) {
                this.$emit('onCreateView', {
                    title: this.viewTitle,
                    view: this.selected
                })
                this.titleErr = false
            } else {
                this.titleErr = true
            }
        }
    }
}
</script>

<style scoped>
.sectionTitle {
    background: rgba(211, 211, 211, 0.555);
}
.sectionBox {
    border:1px solid lightgray;
}
.lpitem {
    border-bottom:1px solid lightgray;
}
.not-allowed {
    cursor: not-allowed;
}
.tbdshdw:hover {
    background: lightgray;
}
</style>