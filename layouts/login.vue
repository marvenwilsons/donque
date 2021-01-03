<template>
    <v-app id="dq-init-page" class="fullheight-VH relative overflowhidden flex flexcenter smth flexcenter" >
        <div id="bgContainer2" style="width:100%;height:100%;" class="fullwidth  fullheight-percent absolute" ></div>
        <img id="lleaves" class="absolute" src="ganapathy.jpg" alt="">

        <!-- blur div here -->
        <div id="loginOverlay" class="absolute fullwidth fullheight-percent" >

        </div>

        <!-- form -->
        <div style="z-index:3; overflow: hidden;" :class="['fullheight-VH', 'flex', 'flexcenter']" >
            <div class="flex flexcenter" >
                <section
                    id="login-s"
                    style="background:white; max-width:400px; margin-top:-120px;" 
                    class="pad125 margintop125 marginbottom125 flex flexcenter borderRad4" >
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
                            <span @click="cantAccessAccount" class="pointer" >
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
    methods: {
        cantAccessAccount() {
            alert('This feature is not handled')
        }
    },
    mounted() {
    }
}
</script>

<style>
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-fw-0.3.css");



#lleaves {
    height: 100%;
    /* opacity: 0.2; */
    /* z-index: 2; */
}

#loginOverlay:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.13);
    filter: blur(10px);
    
}
#loginOverlay {
    /* background-attachment: fixed; */
    background: inherit;
    background-color: rgba(248, 247, 247, 0.397);  
    backdrop-filter: blur(15px);
    /* z-index: 100; */
    height: 100vh;
}

#login-s {
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
    
}
</style>