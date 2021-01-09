<template>
    <section
        v-if="title == 'Input Password'"
        role="password"
        :style="{minWidth: '320px', 
            transform: `translateX(${currentPosition}px)`,
            opacity: opacity
        }"
        :class="['flex', 'relative flexcol marginleft050', 'smth', 'flexcenter', 'fullwidth' ]" 
    >
        <div v-if="opacity == 1" class="fullwidth" >

            <div class="pointer" @click="$emit('backToSignIn')" >
                <v-icon small class="marginright050 ar-h" >mdi-arrow-left</v-icon>{{user}}
            </div>

            <div class="fullwidth marginbottom050 margintop050" >
                <h5 style="margin:0" >{{title}}</h5>
            </div>

            <v-expand-transition>
                <div v-if="false" class="fullwidth padtop125" >
                    <span class="err" >
                        {{error}}
                    </span>
                </div>
            </v-expand-transition>
            
            <v-text-field
                v-model="value"
                style="margin-bottom:0px;"
                :label="placeholder"
                class="marginbottom125 fullwidth"
                type="password"
                id="password-field"
                :disabled="disabled"
            ></v-text-field>

            <div class="fullwidth" >
                <span @click="$emit('forgotPassword')" class="pointer" >
                    {{featureText}}
                </span>
            </div>

        </div>
        <div>
            <!-- forgot password -->
        </div>
    </section>
</template>

<script>
import m from './mixin'
export default {
    mixins: [m],
    mounted() {
        // set instance default
        this.placeholder = 'Password'
        this.title = 'Input Password'
        this.featureText = 'Forgot password?'
        this.showField = true
        this.btnText = 'Sign In'

        // set component default
        this.showForm = true
    },
}
</script>

<style>
.pointer:hover > .ar-h{
    border-radius: 100%;
    background: lightgray;
}
</style>