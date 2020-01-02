<template>
    <div>
        <input :placeholder="`Enter ${placeholder}`" class="pad050 fullwidth" type="text">
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