<template>
  <div class="fullheight-percent flex flexcol" style="border-right: 2px solid whitesmoke">
    <div class="flex1">avatar here</div>
    <div role="container" class="flex3">
      <div role="docker-host" class="fullheight-percent">
        <div
          class="pad050 pointer padright125"
          v-for="(items,item_index) in menu_items"
          :key="`docker-item-${item_index}`"
        >
          <strong>{{items}}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    menu_items() {
      return (
        this.$store.state.dashboard_data.resources &&
        Object.keys(this.$store.state.dashboard_data.resources)
      );
    }
  },
};
</script>

<style>
</style>
