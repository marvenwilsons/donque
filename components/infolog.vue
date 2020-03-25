<template>
    <div >
       <div class="flex flexcenter flexcol" >
            <div class="infolog flex flexwrap flexend borderRad4" >
                <p class=" borderRad4 backgroundinfo pad050" >{{data.msg}}</p>
                <button
                    v-if="data.closable"
                    @click="() => {
                        $emit('UnSetPaneModal')
                    }"
                    class="buttonreset pad050 padleft125 padright125 darkprimary borderRad4"
                >Okay</button>
            </div>
       </div>
    </div>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style scoped>

</style>