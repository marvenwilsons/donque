<template>
    <div>
        I am a console
    </div>
</template>

<script>
export default {
    beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      title: `Console ~ ${this.$store.state.dashboard_data.admin_name}`,
    });
  }
}
</script>

<style>

</style>
