<template>
    <div class=" flex spacebetween">
        <div class="dqhead-items fullwidth flex flexcenter flexstart">
            <strong>dq-studio</strong>
        </div>
        <div class="dqhead-items fullwidth">
            <div class="flex flexend headcur fullheight-percent flex flexcenter">
            <div class="name-title"> {{$store.state.dashboard_data.admin_name}} </div>
                <i class="fas fa-user-circle pointer" @click="$store.commit('notification_pane/set_state', true)"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.dqhead-items {
  padding-top: calc(var(--fontSize) * 0.5);
  padding-bottom: calc(var(--fontSize) * 0.5);
  padding-left: calc(var(--fontSize) * 0.25);
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
