<template>
    <div  >
        <v-flex class="backgroundinfo pad125 marginbottom050" >
            {{data.question}}
        </v-flex>
        <v-flex class="flexend" >
            <button class="defbtn marginright050 buttonreset">
                {{data.truthy}}
            </button>
            <button class="defbtn buttonreset">
                {{data.falsey}}
            </button>
        </v-flex>
    </div>
</template>

<script>
export default {
    props: {
        data: Object
    }
}
</script>