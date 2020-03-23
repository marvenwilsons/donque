<template>
    <div >
       <div class="flex flexcenter flexcol" >
            <div class="infolog flex flexwrap flexend borderRad4" style="min-width:300px;max-width:350px;" >
                <p class=" borderRad4 backgroundinfo pad050" >{{data}}</p>
                <button
                    @click="() => {
                        $emit('UnSetPaneModal')
                    }"
                    class="buttonreset pad050 darkprimary borderRad4"
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