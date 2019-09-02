<template>
    <div class="flex flexcol fullwidth fullheight-percent">
        <div :style="{background: $store.state.theme.global.primary_bg_color, color: 'white'}" class="flex spacebetween pad025">
            <div class="padleft050 padtop025 padbottom025">
                <strong>dq-</strong>studio
            </div>
            <div class="flex flexcenter">
                <i @click="$store.commit('nextAction'),$store.commit('pages/maximized_editor',false)" class="pointer fas fa-times padright050"></i>
            </div>
        </div>
        <div class=" flex flex1">
            <div class="flex1 flex flexcol">
                <div :style="{border: `1px solid ${$store.state.theme.global.primary_bg_color}`}" class="flex1 flex" >
                    <div class=" fullheight-percent fullwidth" style="max-width:1080px" >top</div>
                    <div class="flex flex1 ">
                        <div style="background: white;" class="fullwidth flex flex1">
                            <editor/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import editor from '../editor-view'
    export default {
        components: {
            editor
        }
    }
</script>