<template>
    <div>
        Analytics here
        {{this.$store.state.user}}
    </div>
</template>

<script>
export default {
    beforeCreate(){
        console.log(localStorage)
    }
}
</script>

<style>

</style>
