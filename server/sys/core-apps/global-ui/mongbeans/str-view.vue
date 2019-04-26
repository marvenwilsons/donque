<template>
    <div class="flex">
        <div v-if="inputData['from'] === 'Array'"> [{{inputData['key']}}] </div>
        <div v-if="inputData['from'] != 'Array'"> {{inputData['key']}}: </div>
        <div> {{inputData['val']}} - </div>
        <div> String</div>
    </div>
</template>

<<script>
export default {
    props:["inputData"],
    methods: {
        
    }
}
</script>