<template>
    <v-container>
            <v-flex class="flexcol fullheight-percent" >
                <v-card class="fullwidth fullheight-percent">
                    <main class="flex flexcol fullheight-percent" >
                        <div style="background:white" class="padtop125 margintop125 padleft125 padright125" >
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
                                    <v-btn dense small  fab dark color="primary">
                                        <v-icon dark>mdi-plus</v-icon>
                                    </v-btn>
                                </div>
                            </v-flex>
                        </div>
                        <div style="overflow-y:auto" class="flexcol relative fullwidth flex1 relative"  >
                            <div class=" fullwidth absolute pad125" >
                                <v-card v-for="(item,itemIndex) in myData" :key="itemIndex"  outlined class="marginbottom050 fullwidth" >
                                    <div class="pa-2 grey lighten-4 d-flex align-top" >
                                        <div class="flex xs3 text-xs-left" >
                                            <v-flex flexcol ``>
                                                <div class="header grey--text text--darken-1">
                                                    <small><pre>{{myConfig.infoDisplay[0]}}</pre></small>
                                                </div>
                                                <div style="color:#bd4147;" class="mono name">
                                                    <pre>{{item[myConfig.infoDisplay[0]]}}</pre>
                                                </div>
                                            </v-flex>
                                        </div>
                                        <div class="flex xs6 text-xs-left" >
                                            <v-flex flexcol >
                                                <div class="header grey--text text--darken-1"> <small> <pre>{{myConfig.infoDisplay[1]}}</pre> </small> </div>
                                                <div class="mono name">
                                                    <pre>{{item[myConfig.infoDisplay[1]] ? item[myConfig.infoDisplay[1]] : 'null'}}</pre>
                                                </div>
                                            </v-flex>
                                        </div>
                                        <div class="flex xs3 text-xs-right" >
                                            <v-flex flexcol >
                                                <div class="header grey--text text--darken-1"> <small> <pre>{{myConfig.infoDisplay[2]}}</pre> </small> </div>
                                                <div class="mono name">
                                                     <pre>{{item[myConfig.infoDisplay[2]] ? item[myConfig.infoDisplay[2]] : 'null'}}</pre>
                                                </div>
                                            </v-flex>
                                        </div>
                                    </div>
                                    <div class="pa-2 grey lighten-3 grey--text text--darken-2 d-flex flexend">
                                        <span 
                                            class="pointer marginleft125" 
                                            v-for="(myOpt,optIndex) in myConfig.dataControllers" 
                                            :key="optIndex"
                                            >
                                            <v-card-text @click="myOpt.handler(item,itemIndex)" class="optiontext" style="padding:0px;" >
                                                {{myOpt.name}}
                                            </v-card-text>
                                        </span>
                                    </div>
                                </v-card>
                            </div>
                        </div>
                    </main>
                </v-card>
        </v-flex>
    </v-container>
</template>

<script>
import h from '@/helper'

export default {
    props: ['myData','myConfig'],
    mixins: [h],
    created() {
        this.h = this
    },
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