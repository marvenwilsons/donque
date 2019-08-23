<template>
  <div class="fullwidth pad125">
    <div :style="{border: `1px solid ${$store.state.theme.global.border_color}`}">
      <div
        :style="{
          background:`${$store.state.theme.global.secondary_bg_color}`,
          }"
        class="pad050 spacebetween flex st-viz-bnnr"
      >
        <strong>Notes</strong>
      </div>
      <div class="pad125">
          <textarea
              style="resize: vertical"
              name="custom_Style"
              class="pad050 fullwidth"
              rows="10"
            ></textarea>
            <div class="flex flexend margintop050 pointer">
                stage changes
            </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>