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
                            <signInForm @retrieveAccount="retrieveAccount" ref="signInForm" />
                            <!-- password -->
                            <passwordForm @forgotPassword="forgotPassword" ref="passwordForm" />
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
            this.$refs.signInForm.currentPosition = '-319'
            this.$refs.passwordForm.currentPosition = '-319'
        },
        slideToRight() {
            this.signIn.currentPosition = '0'
            this.password.currentPosition = '319'
        },
        forgotPassword() {

        },
        next() {
            if(this.currentForm.value == undefined) {
                this.currentForm.error = `Invalid ${this.currentForm.placeholder}`
                console.log(this.currentForm)
            } else {
                switch(this.currentForm.title) {
                    /**
                     * /$dqappservices/user/confirm
                     * 
                     * get if the email or username supplied exist in the database
                     */
                    case 'Sign in':
                        console.log('sign in')
                        setTimeout(() => {
                            // sample on error
 

                            this.$axios
                            .$get(`$dqappservices/v1/user/confirm`, {
                                params: { user: this.currentForm.value }
                            })
                            .then(({result, msg}) => {
                                if(result) {
                                    this.slideToLeft()
                                    this.currentForm = this.$refs.passwordForm
                                    this.currentForm.opacity = 1
                                    this.currentForm.isLoading = false
                                } else {
                                    this.currentForm.error = msg
                                    this.currentForm.isLoading = false
                                }
                            })

                            
                        }, 1000);
                    break

                    /**
                     * /$dqappservices/user/get-account
                     * 
                     * payload: first name, last name, email used
                     */
                    case 'Retrive account':
                    break

                    /**
                     * /$dqappservices/user/signin
                     * 
                     * When this case hits, it mean the user clicks the
                     * submit button to submit the entered username or email together
                     * with password
                     * 
                     * valdiate in server if credintials submitted is valid, if valid it
                     * returns a token, then redirects to the admin dashboard
                     * 
                     * payload: email or username and password
                     */
                    case 'Input password':
                    break

                    /**
                     * /$dqappservices/user/get-account
                     * 
                     * the admin will define in the dashboard if to give the user an 
                     * ability to change password on request
                     * 
                     * payload: first name, last name, email used
                     */
                    case 'Forgot password':
                    break
                }
                this.currentForm.isLoading = true 
                // fetch database if username or email exist
            }
            

            
        },
        retrieveAccount() {
            console.log('retrive')
        }
    },
    mounted() {
        this.ready = true

        /**
         * Set defaults
         */
        setTimeout(() => {
            this.showForms = true
            this.$refs.signInForm.showForm = true
            this.currentForm = this.$refs.signInForm
        }, 1000);
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