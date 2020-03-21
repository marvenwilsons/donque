<template>
    <div class="flex flexcol fullwidth">
        <div>
            <select style="width:50%;" v-model="selected">
                <option :value="query" v-for="(query,index) in savedQueries" :key="`${query.queryTitle}-${index}`" >
                    {{query.queryTitle}}
                </option>
            </select>
        </div>
        <div v-if="selected" style="border:1px solid lightgray" class="flex flex1 pad025 flexcol" >
            <div style="border-bottom:1px solid lightgray" class="margintop025 pad050 flex " >
                <span class="flex1" >Title:</span> <span class="flex3" >{{selected.queryTitle}}</span>
            </div>
            <div style="border-bottom:1px solid lightgray" class="pad050 flex" >
                <span class="flex1" >Description:</span> <span class="flex3" >{{selected.queryDesc ? selected.queryDesc : 'none'}}</span>
            </div>
            <div style="border-bottom:1px solid lightgray" class="flex pad050" >
                <span class="flex1" >Link:</span> <span class="flex3" >none</span>
            </div>
            <div style="border-bottom:1px solid lightgray" class="flex pad025" >
                <span class="flex1 flex flexcenter flexstart padleft025" >View:</span> 
                <div v-if="assignViewMode == false" class="flex3" >
                    <button @click="assignViewMode = true" class="buttonreset pad025 pointer" >
                        <span style="color:red;" >(no view assigned)</span> assign a view to this query
                    </button>
                </div>
                <select v-model="defaultView" v-if="assignViewMode == true" class="flex3"  style="width:25%;" >
                    <option 
                            :selected="defaultView == view.title" 
                            v-for="view in savedViews" :key="view.title" 
                        >
                        {{view.title}}
                    </option>
                </select>
            </div>
            <div class="pad025 margintop050 flex flexend fullheight-percent flexcenter" >
                <span class="marginright050" >
                    <button @click="$emit('onLoadQuery', selected)" class="buttonreset pad050 pointer tbdshdw" >Load this query</button>
                </span>
                <span @click="$emit('onDeleteQuery', selected)" class="marginright050">
                    <button class="buttonreset pad050 pointer tbdshdw">Delete this query</button>
                </span>
                <span v-if="showSaveBtn" >
                    <button @click="saveChange" class="buttonreset pad050 pointer tbdshdw">Save changes</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        savedQueries: Array,
        savedViews: Array
    },
    data: () => ({
        selected: null,
        defaultView: undefined,
        assignViewMode: false,
        showSaveBtn: false
    }),
    methods: {
        saveChange() {
            this.selected.view = this.defaultView
            this.$emit('onSaveChangeView', this.selected)
        }
    },
    watch: {
        defaultView(newViewData) {
            this.savedQueries.map(e => {
                if(e.view == newViewData && this.selected.queryTitle == e.queryTitle) {
                    this.showSaveBtn = false
                } else {
                    this.showSaveBtn = true
                }
            })
        }, 
        selected(newSelected) {
            this.defaultView = newSelected.view

            if(newSelected.view == 'none') {
                this.assignViewMode = false
            } else {
                this.assignViewMode = true
                this.showSaveBtn = true
            }

            this.savedQueries.map(e => {
                if(e.view == newSelected.view && newSelected.queryTitle == e.queryTitle) {
                    this.showSaveBtn = false
                } else {
                    this.showSaveBtn = true
                }
            })
        }
    }
}
</script>

<style scoped>
option {
    cursor: pointer;
}
.tbdshdw{

    border-radius: 4px;
}
.tbdshdw:hover {
    background: lightgray;
    -webkit-box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    -moz-box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    box-shadow: 0px 10px 10px -10px rgba(112,112,112,1);
    transition: 0.3s;
}
select{
    padding: 2px;
}
</style>