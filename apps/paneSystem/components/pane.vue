<template>
    <v-flex flexcol >
        <div 
            style="background: var(--deftheme-dark-primary); color:white;"
            class="pad050" >
                <v-flex spacebetween >
                    <div>
                        {{myData.paneName}}
                    </div>
                    <div>
                        <span 
                            class="pointer"
                            style="color:white; font-weight:100" >
                            	&#x2716;
                        </span>
                    </div>
                </v-flex>
        </div>
        <v-flex flex1 > body </v-flex>
    </v-flex>
</template>

<script>
import h from '@/helper'
export default {
    mixins: [h],
    props: {
        myData: Object
    },
    created() {
        this.h = this
    },
    data: () => ({

    }),
    methods: {

    }
}
</script>