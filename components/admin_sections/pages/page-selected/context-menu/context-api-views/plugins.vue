<template>
    <div class="pad125 fullwidth">
        <div :is="`${data.tag}-api`"></div>
    </div>
</template>

<script>
export default {
    props:['pageName','uid','data', 'stageData',],
}
</script>

<style>

</style>
