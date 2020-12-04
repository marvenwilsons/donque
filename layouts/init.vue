<template>
    <v-app id="dq-init-page" class="fullheight-VH relative overflowhidden flex flexcenter" >
        <!-- <div id="bgContainer2" style="width:100%;height:100%;position:fixed;" class="fullwidth  fullheight-percent" ></div> -->
        <img id="leaves" class="absolute" src="leaves.jpeg" alt="">


        <!-- form behind art -->
        <v-flex class="absolute fullwidth fullheight-percent flex flexcenter" >
            <div id="bgContainer" style="width:350px;height:680px;" class="" >
            </div>
        </v-flex>

        <!-- form -->
        <div style="z-index:1; overflow-x:auto;" class="fullheight-VH" >
            <div class="flex flexcenter" >
                <section style="background:white; max-width:400px;" class="pad125 margintop125 marginbottom125 flex flexcenter borderRad4 modalShadow" >
                    <div class="pad125" >
                        <div class="marginbottom125 margintop125 flex flexcenter flexcol" >
                            <img style="height:40px;width:40px;" src="favicon.ico" alt="">
                            <div>
                                <h5 style="font-weight:100;" >
                                    Create App
                                </h5>
                            </div>
                        </div>
                        <v-expand-transition>
                            <div v-if="error" >
                                <div class="backgrounderr pad050 marginbottom125 borderRad4" >
                                    {{error}}
                                </div>
                            </div>
                        </v-expand-transition>
                        <FirstFom 
                            v-show="currentFrom == 1"
                        />
                        <SecondForm 
                            v-show="currentFrom == 2" 
                        />
                    </div>
                </section>
            </div>
        </div>
    </v-app>
</template>

// on next, --> database_name database username, database password, token_secret, table_prefix
<script>
import h from '@/helper'
import FirstFom from '@/components/init/FirstForm.vue'
import SecondForm from '@/components/init/SecondForm.vue'

export default {
    mixins: [h],
    created() {
        this.h = this
    },
    components: {
        FirstFom,
        SecondForm
    },
    data: () => ({
        disableAll: false,
        error: undefined,
        errorTarget: undefined,
        isLoading: false,
        show1: false,
        currentFrom: 1
    }),
    methods: {
        postError(target,errmsg) {
            this.error = errmsg
            this.errorTarget = target
        }
    }
}
</script>

<style>
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-fw-0.3.css");

/* #dq-init-page{
    background: url('~static/leaves.jpeg');
} */

#bgContainer {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . ."
    ". . . .";
    /* clip-path: polygon(0 0, 1600px 0, 1600px 87%, 0 100%); */
    background: rgb(255,161,64);
    background: linear-gradient(90deg, rgba(255,161,64,0.6825105042016807) 0%, rgba(255,64,158,0.43881302521008403) 91%);
    margin-right: 120px;
    margin-top: -85px;
    transform:rotate(40deg);
    overflow: hidden;
    /* transform: skewX(-20deg); */
}

#bgContainer::before {
    content: "";
    background-color: #409eff;
    grid-column: 3;
    grid-row: 1;
}

#bgContainer::after {
    content: "";
    background-color: #409eff;
    grid-column: 4;
    grid-row:12;
}
#leaves {
    height: 100%;
    /* opacity: 0.2; */
}


/* #bgContainer2{
    background: rgb(34,193,195);
    background: linear-gradient(0deg, rgba(34,193,195,0.5816701680672269) 0%, rgba(253,187,45,0.5368522408963585) 100%);
     background: inherit;
} */
</style>