<template>
    <section
            v-if="showForm"
            role="signIn"
            :style="{minWidth:'310px', 
                transform: `translateX(${currentPosition}px)`
            }"
            :class="['flex', 'relative flexcol marginleft025 marginright025', 'smth', 'flexcenter', 'fullwidth' ]" 
        >
        <div v-if="showField" class="fullwidth" >
            <div class="fullwidth marginbottom050 margintop050" >
                <h5 style="margin:0" >{{title}}</h5>
            </div>
            <v-expand-transition>
                <div v-if="error" class="fullwidth padtop125" >
                    <span style="font-size:14px" class="err" >
                        {{error}}
                    </span>
                </div>
            </v-expand-transition>
            <v-text-field
                style="margin-bottom:0px;"
                v-model="value"
                :label="placeholder"
                class="marginbottom125 fullwidth"
                :error="error ? true : false"
            ></v-text-field>
            <div class="fullwidth" >
                <span @click="showFeature = true, error = undefined, showField = false" 
                    class="pointer" >
                    {{featureText}}
                </span>
            </div>
        </div>
        <v-expand-transition>
            <div class="fullwidth" v-if="showFeature">
                <!-- cant access account -->
                <div style="font-size:14px;" class="flex padtop050 padbottom050 pointer" >
                    <div @click="showFeature = false, error = undefined, showField = true" class="flex flexcenter flexstart" >
                        <v-icon dense class="marginright050" >mdi-arrow-left</v-icon> Back to Sign in
                    </div>
                </div>
                <div v-if="showFeature" class="fullwidth marginbottom050 margintop050" >
                    <h5 style="margin:0" >Retrive account</h5>
                </div>
                <v-expand-transition>
                    <div v-if="error" class="fullwidth padtop125" >
                        <span style="font-size:14px" class="err" >
                            {{error}}
                        </span>
                    </div>
                </v-expand-transition>
                <v-text-field
                    style="margin-bottom:0px;"
                    v-model="forgotAccount.firstName"
                    label="First Name"
                    class="marginbottom125 fullwidth"
                    :error="error ? true : false"
                ></v-text-field>
                <v-text-field
                    style="margin-bottom:0px;"
                    v-model="forgotAccount.lastName"
                    label="Last Name"
                    class="marginbottom125 fullwidth"
                    :error="error ? true : false"
                ></v-text-field>
                <v-text-field
                    style="margin-bottom:0px;"
                    v-model="forgotAccount.emailUsed"
                    label="Email Used In Account"
                    class="marginbottom125 fullwidth"
                    :error="error ? true : false"
                ></v-text-field>
            </div>
        </v-expand-transition>
    </section>
</template>
<script>
import m from './mixin'
export default {
    mixins: [m],
    data: () => ({
        showForm: false
    }),
    methods: {
        setDefaults() {
            // set instance default
            this.placeholder = 'Email or Username'
            this.title = 'Sign in'
            this.featureText = 'Cant access your account?'
            this.showField = true
            this.btnText = 'next'

            // set component default
            this.showForm = true
        }
    },
    mounted() {
        this.setDefaults()
    },
    watch: {
        showFeature() {
            if(this.showFeature) {
                this.btnText = 'Submit'
                this.title = 'Retrive account'
            } else {
                this.setDefaults()
            }
        }
    }
}
</script>