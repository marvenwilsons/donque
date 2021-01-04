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
                            <signInForm ref="signInForm" />
                            <!-- password -->
                            <passwordForm ref="passwordForm" />
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

<script>
import h from '@/helper'

import signInForm from '@/components/login/sign-in'
import passwordForm from '@/components/login/password'
export default {
    mixins: [h],
    created() {
        this.h = this
    },
    components: {
        signInForm,
        passwordForm
    },
    data: () => ({
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
            showField: true
        },
        currentForm: undefined,
        ready: false,
        showForms: false
    }),
    methods: {
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

        setTimeout(() => {
            this.showForms = true
            this.$refs.signInForm.showForm = true
            this.currentForm = this.$refs.signInForm
        }, 400);
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