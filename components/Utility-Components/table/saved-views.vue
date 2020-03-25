<template>
    <div style="border: 1px solid lightgray;" class="flex fullwidth" >
        <div style="border-right: 1px solid lightgray;" class="flex1 relative" >
            <div class="absolute fullwidth" >
                <div style="border-bottom:1px solid lightgray;" class="fullwidth pad050 flex spacebetween" v-for="(view,vindex) in savedViews" :key="vindex" >
                    <div 
                        style="background:rgba(211, 211, 211, 0.377); max-width:200px;" 
                        class="flex flexcenter pad025 borderRad4 padleft125 padright125" >
                        <pre>{{view.title}}</pre>
                    </div>
                    <div class="flex" >
                        <div class="marginright125" >
                            <button @click="$emit('onDeleteView',view)" class="tbdshdw buttonreset pad050 flex flexcenter">
                                delete view
                            </button>
                        </div>
                       <button @click="selected = view" class="tbdshdw buttonreset pad050 flex flexcenter">
                            open view 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex1 relative" >
            <div class="absolute" >
                <div v-if="selected" class="pad050 flex flexcol" >
                    Title: {{selected.title}} <br />
                    Views: {{selected.view}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        savedViews: Array
    },
    data: () => ({
        selected: undefined
    })
}
</script>

<style scoped>
.tbdshdw:hover {
    background: lightgray;
}
</style>