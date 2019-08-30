<template>
    <div class="flex flexcol fullwidth fullheight-percent borderred">
        <div class="flex spacebetween pad025 borderred">
            <div class="padleft050">
                <strong>dq-studio</strong>
            </div>
            <div>
                <i @click="$store.commit('nextAction')" class="pointer fas fa-times padright050"></i>
            </div>
        </div>
        <div class="borderred flex flex1">
            <div class="flex1 flex flexcol">
                <div class="flex1 flex " >
                    <div class="borderred fullheight-percent fullwidth" style="max-width:1080px" >top</div>
                    <div class="borderred flex1">side</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>