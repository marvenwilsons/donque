<template>
    <div>
        <span id="val-s">
            <span v-for="(items,key) in val" :key="key">
                <strong> {{items}} </strong>
            </span>
        </span>
    </div>
</template>
<script>
export default {
    props:['val']

}
</script>

<style>
#val-s > span{
    margin-right: 10px;
    letter-spacing: 1px;
}
</style>
