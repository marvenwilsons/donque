<template>
    <v-app id="listify1-2">
        <v-flex style="background:white;" class="flexcol pad125 fullheight-percent" >
            <div>
                <v-flex>
                    <div class="fullwidth marginright125 flex flexcenter" >
                        <v-text-field
                            dense=""
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
                    <div class="pointer marginleft125" >
                        <v-btn dense small  fab dark color="primary">
                            <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                    </div>
                </v-flex>
            </div>
            <!-- <v-divider></v-divider> -->
            <v-flex style="overflow-y:auto; border:1px solid #9e9e9e;" relative>
                <div  class="absolute fullwidth" >
                    <v-flex class="listitem"  v-for="(item,itemIndex) in myData" :key="itemIndex" >
                        <v-card
                            flat=""
                            style="border-bottom:1px solid lightgray;border-radius:0px;"
                            class="listitem   fullwidth">
                            <v-flex class="pad050" style="font-weight:500;" >
                                <div class="pad050">
                                    <v-chip 
                                            text-color="var(--deftheme-blue-text)" 
                                        >
                                        <!-- <pre>{{item[myConfig.displayProp]}}</pre> -->
                                        <v-card-title>
                                            <small>{{item[myConfig.displayProp]}}</small>
                                        </v-card-title>
                                        
                                </v-chip>
                                </div>
                                <v-flex flexend flexcenter marginright050 >
                                    <span 
                                        class="marginleft125 pointer" 
                                        v-for="(myOpt,optIndex) in myConfig.dataControllers" 
                                        :key="optIndex" >
                                            <span class="optiontext" style="color:var(--deftheme-blue-text)" >{{myOpt.name}}</span>
                                    </span>
                                </v-flex>
                            </v-flex>
                        </v-card>
                    </v-flex>
                </div>
            </v-flex>
            <!--  -->
            <!-- <div class="padtop050" >
                <v-flex flexend class="marginright050" >
                    <span style="color:var(--deftheme-blue-text)" >found {{myData.length}} items</span>
                </v-flex>
            </div> -->
        </v-flex>
    </v-app>
</template>

<script>
export default {
    props: ['myData','myConfig'],
    mounted() {
        // console.log(this.myConfig)
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