<template>
    <v-app id="dq-init-page" class="fullheight-VH relative overflowhidden flex flexcenter smth flexcenter" >
        <div id="bgContainer2" style="width:100%;height:100%;" class="fullwidth  fullheight-percent absolute" ></div>
        <img id="lleaves" class="absolute" src="ganapathy.jpg" alt="">

        <!-- blur div here -->
        <div id="loginOverlay" class="absolute fullwidth fullheight-percent" >

        </div>

        <!-- form -->
        <div style="z-index:3; overflow: hidden;" :class="['fullheight-VH', 'flex', 'flexcenter smth']" >
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
                            <div
                                :style="{minWidth: showForms ? '0px' : '319px'}"
                                class="smth"
                            ></div>
                            <!-- email or username -->
                            <section
                                v-if="showForms"
                                role="signIn"
                                :style="{minWidth:'319px', 
                                    transform: `translateX(${signIn.currentPosition}px)`
                                }"
                                :class="['flex', 'relative flexcol', 'smth', 'flexcenter', 'fullwidth' ]" 
                            >
                                <div class="fullwidth" >
                                    <div class="fullwidth marginbottom050 margintop050" >
                                        <h5 style="margin:0" >{{signIn.title}}</h5>
                                    </div>
                                    <div v-if="signIn.error" class="fullwidth padtop125" >
                                        <span style="font-size:14px" class="err" >
                                            {{signIn.error}}
                                        </span>
                                    </div>
                                    <v-text-field
                                        tyle="margin-bottom:0px;"
                                        v-model="signIn.value"
                                        :label="signIn.placeholder"
                                        class="marginbottom125 fullwidth"
                                        :error="signIn.error"
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
                                :style="{minWidth: '318px', 
                                    transform: `translateX(${password.currentPosition}px)`
                                }"
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
                                        v-model="password.value"
                                        style="margin-bottom:0px;"
                                        :label="password.placeholder"
                                        class="marginbottom125 fullwidth"
                                        type="password"
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
                        
                        <v-expand-transition>
                            <div v-if="showForms" class="flex flexend margintop125" >
                                <v-btn :loading="currentForm.isLoading" @click="next" color="primary" >
                                    <strong>
                                        {{currentForm.btnText}}
                                    </strong>
                                </v-btn>
                            </div>
                        </v-expand-transition>
                        
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
            showFeature: false,
            currentPosition: 0,
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
            showFeature: false,
            currentPosition: 0,
        },
        currentForm: undefined,
        ready: false,
        showForms: false
    }),
    methods: {
        cantAccessAccount() {
            alert('This feature is not handled')
        },
        slideToLeft() {
            this.signIn.currentPosition = '-319'
            this.password.currentPosition = '-319'
        },
        slideToRight() {
            this.signIn.currentPosition = '0'
            this.password.currentPosition = '319'
        },
        next() {
            // this.currentForm = this.password

            if(this.currentForm.value == undefined) {
                this.currentForm.error = `Invalid ${this.currentForm.placeholder}`
                console.log(this.currentForm)
            } else {
                console.log('val')
                this.currentForm.isLoading = true

                setTimeout(() => {
                    this.currentForm.error = `Invalid: Cannot find "${this.currentForm.value}" in the database`
                }, 1000);
                // fetch database if username or email exist
            }
        }
    },
    mounted() {
        this.ready = true
        this.currentForm = this.signIn
        setTimeout(() => {
            this.showForms = true
        }, 500);
    }
}
</script>

<style>
@import url("@/assets/dq-css/normalize.css");
@import url("@/assets/dq-css/dq-fw-0.3.css");



#lleaves {
    height: 100%;
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