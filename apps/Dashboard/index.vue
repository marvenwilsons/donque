<template>
    <v-flex>
        this is dashboard
    </v-flex>
</template>

<script>
import h from '@/helper'
import Templates from '@/templates'
export default {
    mixins: [h],
    props: {
        myData: Object,
        paneIndex: Number
    },
    created() {
        this.h = this
    },
    data: () => ({

    }),
    mounted() {
        this.paneSettings({
            paneWidth: '95%',
            paneName: 'Dashboard',
            isClosable: false
        })


        // const service  = function() {}

        // new service ({
        //     name: 'pages',
        //     dataSet: [], // array of objects
        //     views: [
        //         {
        //             dataType: Object,
        //             ObjectKeys: ['pageName','pageContent'],
        //             component: 'objectify' // name of vue component
        //         }, 
        //         {
        //             dataType: Array,
        //             ObjectKeys: null, // assumes array
        //             component: 'listify'
        //         }
        //     ]
        // })
    }
}
</script>