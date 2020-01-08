<template>
    <div>
        <input :placeholder="` Enter ${placeholder}`" class="pad050 fullwidth borderRad4 dqinp" type="number">
    </div>
</template>

<script>
export default {
    props: {
        placeholder: String
    }
}
</script>

<style scoped>

</style>