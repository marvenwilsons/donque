<template>
    <v-container>
            <v-flex class="flexcol fullheight-percent" >
                <div class="fullwidth fullheight-percent">
                    <main class="flex flexcol fullheight-percent" >
                        <div v-if="!myConfig.hideControlls" style="background:white" class="padtop125 padleft125 padright125 borderRad4" >
                            <v-flex>
                                <div class="fullwidth marginright125 flex flexcenter" >
                                    <v-text-field
                                        dense
                                        label="Search item"
                                        outlined
                                    ></v-text-field>
                                </div>
                                <div class="pointer" >
                                    <v-select
                                        dense
                                        :items="['A-Z','Z-A']"
                                        label="Sort By"
                                        outlined
                                    ></v-select>
                                </div>
                                <div v-if="myConfig.ableToAddItem" class="pointer marginleft125" >
                                    <v-btn @click="$emit('onEvent',{
                                        eventName: 'addNewPage',
                                        context: null
                                    })" dense small  fab dark color="primary">
                                        <v-icon dark>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                            </v-flex>
                        </div>
                        <div style="overflow-y:auto; background:white;" class="flexcol relative fullwidth flex1 relative margintop025 borderRad4"  >
                            <div class=" fullwidth absolute pad125" >
                                <v-card v-for="(item,itemIndex) in myData" :key="itemIndex"  outlined class="marginbottom050 fullwidth" >

                                    <div v-if="myConfig.infoDisplay != undefined" class="pa-2 grey lighten-4 d-flex align-top" >
                                        <div class="flex xs3 text-xs-left" >
                                            <v-flex v-if="item[myConfig.infoDisplay[0]]" flexcol >
                                                <div class="header grey--text text--darken-1">
                                                    <small><pre>{{myConfig.infoDisplay[0]}}</pre></small>
                                                </div>
                                                <div style="color:#bd4147;" class="mono name">
                                                    {{item[myConfig.infoDisplay[0]]}}
                                                </div>
                                            </v-flex>
                                        </div>
                                        <div class="flex xs6 text-xs-left" >
                                            <v-flex v-if="item[myConfig.infoDisplay[2]]" >
                                                <div class="header grey--text text--darken-1"> <small> <pre>{{myConfig.infoDisplay[1]}}: </pre> </small> </div>
                                                <div class="header grey--text text--darken-1"> 
                                                    <small style="color:#bd4147;"> 
                                                        <pre>{{item[myConfig.infoDisplay[1]] ? item[myConfig.infoDisplay[1]] : 'null'}}</pre>
                                                    </small> 
                                                </div>
                                            </v-flex>
                                        </div>
                                        <div class="flex xs3 text-xs-right" >
                                            <v-flex v-if="item[myConfig.infoDisplay[2]]" >
                                                <div class="header grey--text text--darken-1"> <small> <pre>{{myConfig.infoDisplay[2]}}: </pre> </small> </div>
                                                <div class="header grey--text text--darken-1"> 
                                                    <small style="color:#bd4147;"> 
                                                        <pre>{{item[myConfig.infoDisplay[2]] ? item[myConfig.infoDisplay[2]] : 'null'}}</pre>
                                                    </small> 
                                                </div>
                                            </v-flex>
                                        </div>
                                    </div>

                                    <div v-if="item.$listifyNodeDesc " class="pa-2 grey lighten-4 d-flex align-top" >
                                        <span class="grey--text text--darken-1" >
                                            {{ item.$listifyNodeDesc }}
                                        </span>
                                    </div>

                                    <div class="pa-2 grey lighten-3 grey--text text--darken-2 d-flex flexend">
                                        <span 
                                            class="pointer marginleft125" 
                                            v-for="(myOpt,optIndex) in myConfig.events" 
                                            :key="optIndex"
                                            >
                                            <v-card-text @click="$emit('onEvent', {
                                                eventName: myOpt,
                                                context: item
                                            })" class="optiontext" style="padding:0px;" >
                                                {{myOpt}}
                                            </v-card-text>
                                        </span>
                                    </div>

                                </v-card>
                            </div>
                        </div>
                    </main>
                </div>
        </v-flex>
    </v-container>
</template>

<script>
import h from '@/helper'
import templates from '@/templates'
export default {
    props: ['myData','myConfig', 'paneIndex'],
    mixins: [h],
    created() {
        this.h = this
    },
    methods: {
        c(data,fn) {
            const { syspane, syspanemodal, dwin} =  this.normyDep(this.paneIndex,this)
            fn(data,syspane,syspanemodal,dwin)
        }
    }
}
</script>

<style>
#listify1-2 {
    width: 100%;
}
.v-application--wrap{
    min-height: 100% !important;
}
</style>