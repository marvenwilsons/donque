<template>
    <section
        v-if="title == 'Input Password'"
        role="password"
        :style="{minWidth: '318px', 
            transform: `translateX(${currentPosition}px)`,
            opacity: opacity
        }"
        :class="['flex', 'relative flexcol', 'smth', 'flexcenter', 'fullwidth' ]" 
    >
        <div class="fullwidth" >
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