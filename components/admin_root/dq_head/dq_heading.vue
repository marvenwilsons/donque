<template>
    <div class="flex spacebetween" :style="{background:bgColor, color:textColor}">
        <div class="dqhead-items fullwidth flex flexcenter flexstart">
            <strong class="padleft125">dq</strong>studio <strong>Enterprise</strong>
        </div>
        <div class="dqhead-items fullwidth">
            <div class="flex flexend headcur fullheight-percent flex flexcenter">
            <div class="name-title padright050"> {{adminName}} </div>
                <i class="fas fa-user-circle pointer padright025 marginright125" @click="$store.commit('notification_pane/set_state', true)"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['bgColor','textColor', 'adminName'],
}
</script>

<style>
.dqhead-items {
  padding-top: calc(var(--fontSize) * 0.5);
  padding-bottom: calc(var(--fontSize) * 0.5);
  /* padding-left: calc(var(--fontSize) * 0.25); */
}
.fas.fa-user-circle{
    font-size: calc(var(--fontSize) * 2.00);
}
.headcur{
    padding-right: calc(var(--fontSize) * 0.25);
}
.name-title{
    margin-right: calc(var(--fontSize) * 0.25);
}
</style>
