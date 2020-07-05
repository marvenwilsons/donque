<template>
    <div>
        <div 
            :class="['pad050', ...appearanceProperties.fieldElementClasses]" 
            :style="{...appearanceProperties.fieldElementCss}"
            v-for="(item, item_idex) in fieldItems" 
            :key="item_idex" >
            <div class="flex flexcol">
                <el 
                    :elementProperty="item"
                    :formMethods="formMethods"
                />
            </div>
        </div>
        <div class="pad125 flex flexend" >
            <v-btn color="primary" >
                submit
            </v-btn>
        </div>
    </div>
</template>

<script>
import element from '../components/element'
export default {
    props: ['behaviorProperties','fieldItems','appearanceProperties','formMethods'],
    components: {
        el: element
    }
}
</script>