<template>
    <div>
        <v-flex class="flexend" >
            <button class="pad050">
                {{data.truthy}}
            </button>
            <button class="pad050">
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