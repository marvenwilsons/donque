<template>
    <v-app id="dq-init-page" class="fullheight-VH relative overflowhidden flex flexcenter smth flexcenter" >
        <div id="bgContainer2" style="width:100%;height:100%;" class="fullwidth  fullheight-percent absolute" ></div>
        <img id="leaves" class="absolute" src="leaves.jpeg" alt="">

        <!-- blur div here -->


        <!-- form -->
        <div style="z-index:3; overflow-x:auto;" :class="['fullheight-VH', 'flex', 'flexcenter']" >
            <div class="flex flexcenter" >
                <section style="background:white; max-width:400px; margin-top:-120px;" class="pad125 margintop125 marginbottom125 flex flexcenter borderRad4 modalShadow" >
                    <div class="padleft125 padright125 padbottom125 flex flexcol" >
                        <div class="flex flexcol flexcenter fullwidth" >
                            <!-- logo -->
                            <div class="relative flex flexcenter" style="height:85px;width:85px;" >
                                <img class="absolute flex" style="z-index:1;" src="dq-logo.png" alt="">
                            </div>

                            <div class="fullwidth" >
                                <h5 style="margin:0" >Sign in</h5>
                            </div>
                            <!-- form title -->
                            <div>
                                <h5 v-if="currentForm == 3 " class="smth" style="font-weight:100;" >
                                    Please wait ...
                                </h5>
                            </div>
                        </div>
                        <!-- froms -->
                        <div
                            :class="['flex', 'relative', 'smth', 'flexcenter', 'fullwidth', 'margintop125' ]" 
                            
                        >
                            <v-text-field
                            style="margin-bottom:0px;"
                                label="Email or Username"
                                class="marginbottom125"
                            ></v-text-field>
                        </div>
                        <div>
                            <span class="pointer" >
                                Cant access your account?
                            </span>
                        </div>
                        <div class="flex flexend margintop125" >
                            <v-btn :loading="isLoading" @click="next" color="primary" >
                                <strong>
                                    next
                                </strong>
                            </v-btn>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </v-app>
</template>

// on next, --> database_name database username, database password, token_secret, table_prefix
<script>
import h from '@/helper'

export default {
    mixins: [h],
    created() {
        this.h = this
    },
    components: {
    },
    data: () => ({
    }),
    methods: {},
    mounted() {
    }
}
</script>

<style>
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-fw-0.3.css");

/* #dq-init-page{
    background: url('~static/leaves.jpeg');
} */
.FirstForm_exit {
    transform: translateX(-260px);
    transition: all 300ms ease;
}


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
    z-index: 2;
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
    /* z-index: 2; */
}


/* #bgContainer2{
    background: rgb(34,193,195);
    background: linear-gradient(0deg, rgba(19, 72, 73, 0.219) 0%, rgba(71, 53, 14, 0.247) 100%);
    z-index: 1;
    filter: blur(10px);
} */
</style>