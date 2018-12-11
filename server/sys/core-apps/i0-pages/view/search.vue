<template>
    <div class="flex flexcol dq-pane-container-padding">
        <div>search page </div>
        <input type="text">
        <small>{{totalPages}} pages in total</small>
    </div>
</template>

<script>
export default {
    props:['totalPages']
}
</script>

<style>

</style>
