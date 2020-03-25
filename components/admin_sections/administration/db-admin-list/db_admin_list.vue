<template>
    <div>
        database admins here
        {{my_pane_index}}
        <br>
        <span class="pointer" @click="$store.dispatch('pane_system/open',{name: 'Administration', index: my_pane_index})">click me</span>
    </div>
</template>

<script>
export default {
  props: ["my_pane_index"],
 beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Database admin list",
      pane_width: "500px",
      maximizable: true
    });
  },
}
</script>

<style>

</style>
