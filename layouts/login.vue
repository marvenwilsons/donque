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
                    v-if="ready"
                    id="login-s"
                    style="background:white; max-width:400px; margin-top:-120px;" 
                    class="pad125 margintop125 marginbottom125 flex flexcenter" >
                    <div class="padleft125 padright125 padbottom125 flex flexcol" >
                        <div class="flex flexcol flexcenter fullwidth" >
                            <!-- logo -->
                            <div class="relative flex flexcenter" style="height:85px;width:85px;" >
                                <img class="absolute flex" style="z-index:1;" src="dq-logo.png" alt="">
                            </div>

                            
                        </div>
                        <!-- forms -->
                        <main class="relative flex" style="overflow:hidden;" >  

                            <!-- email or username -->
                            <section
                                role="signIn"
                                style="min-width:319px"
                                :class="['flex', 'relative flexcol', 'smth', 'flexcenter', 'fullwidth' ]" 
                            >
                                <div class="fullwidth" >
                                    <div class="fullwidth marginbottom050 margintop050" >
                                        <h5 style="margin:0" >{{signIn.title}}</h5>
                                    </div>
                                    <div v-if="false" class="fullwidth padtop125" >
                                        <span class="err" >
                                            {{signIn.error}}
                                        </span>
                                    </div>
                                    <v-text-field
                                    style="margin-bottom:0px;"
                                        :label="signIn.placeholder"
                                        class="marginbottom125 fullwidth"
                                    ></v-text-field>
                                    <div class="fullwidth" >
                                        <span @click="cantAccessAccount" class="pointer" >
                                            {{signIn.featureText}}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <!-- cant access account -->
                                </div>
                            </section>

                            <!-- password -->
                            <section
                                role="password"
                                style="min-width:318px"
                                :class="['flex', 'relative flexcol', 'smth', 'flexcenter', 'fullwidth' ]" 
                            >
                                <div class="fullwidth" >
                                    <div class="fullwidth marginbottom050 margintop050" >
                                        <h5 style="margin:0" >{{password.title}}</h5>
                                    </div>
                                    <div v-if="false" class="fullwidth padtop125" >
                                        <span class="err" >
                                            {{password.error}}
                                        </span>
                                    </div>
                                    <v-text-field
                                    style="margin-bottom:0px;"
                                        :label="password.placeholder"
                                        class="marginbottom125 fullwidth"
                                    ></v-text-field>
                                    <div class="fullwidth" >
                                        <span @click="cantAccessAccount" class="pointer" >
                                            {{password.featureText}}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <!-- forgot password -->
                                </div>
                            </section>
                        </main>
                        
                        <div class="flex flexend margintop125" >
                            <v-btn :loading="isLoading" @click="next" color="primary" >
                                <strong>
                                    {{currentForm.btnText}}
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
        signIn: {
            error: undefined,
            isDone: false,
            isLoading: false,
            btnText: 'next',
            placeholder: 'Email or Username',
            title: 'Sign in',
            value: undefined,
            featureText: 'Cant access your account?',
            showFeature: false
        },
        password: {
            error: undefined,
            isDone: false,
            isLoading: false,
            btnText: 'sign in',
            placeholder: 'Password',
            title: 'Enter password',
            value: undefined,
            featureText: 'Forgot password?',
            showFeature: false
        },
        currentForm: undefined,
        ready: false
    }),
    methods: {
        cantAccessAccount() {
            alert('This feature is not handled')
        },
        next() {
            this.currentForm = this.password
        }
    },
    mounted() {
        this.ready = true
        this.currentForm = this.signIn
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

#login-s, .formShadow {
    box-shadow: 0 1px 2px rgba(0,0,0,0.07), 
                0 2px 4px rgba(0,0,0,0.07), 
                0 4px 8px rgba(0,0,0,0.07), 
                0 8px 16px rgba(0,0,0,0.07),
                0 16px 32px rgba(0,0,0,0.07), 
                0 32px 64px rgba(0,0,0,0.07);
}

</style>