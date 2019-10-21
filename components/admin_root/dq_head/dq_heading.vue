<template>
    <div v-dq-theme:heading="['color','background']" class="flex spacebetween relative">
        <div class="dqhead-items fullwidth flex flexcenter flexstart">
            <div  v-dq-theme:heading_logo="['background','color']" style="width:180px; z-index:2;" class="fullhight-percent padtop050 padbottom050">
                <span><strong class="padleft125">dq</strong>studio <strong>Enterprise</strong></span>
            </div>
        </div>
        <div style="z-index:100" class="dqhead-items fullwidth  padtop025 padbottom025">
            <div class="flex flexend headcur fullheight-percent flex flexcenter">
            <div class="name-title padright050"> {{adminName}} </div>
                <i class="fas fa-user-circle pointer padright025 marginright125" @click="$store.commit('notification_pane/set_state', true)"></i>
            </div>
        </div>
        <div class="absolute fullwidth" style="height:100vh;"></div>
        <div class="absolute  fullwidth bd-style flex relative fullheight-percent" style="height:600px;">
            <div class=" flex1 absolute fullwidth fullheight-percent"></div>
            <div class=" flex1"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['bgColor','textColor', 'adminName'],
}
</script>

<style>
.fas.fa-user-circle{
    font-size: calc(var(--fontSize) * 2.00);
}
.headcur{
    padding-right: calc(var(--fontSize) * 0.25);
}
.name-title{
    margin-right: calc(var(--fontSize) * 0.25);
}
.bd-style > div:nth-child(1){
    border-radius: 0% 0% 40% 140%;
    background: #2299ddb2;
}
.bd-style > div:nth-child(2){
    border-radius: 0% 0% 100% 60%;
    background: #2299dd8e;
}
</style>
