<template>
    <div>
        this is sample listify!!
        {{myData}}
        ''''''''
        {{myConfig}}
    </div>
</template>

<script>
export default {
    props: ['myData','myConfig'],
    mounted() {
        // console.log(this.myConfig)
    }
}
</script>