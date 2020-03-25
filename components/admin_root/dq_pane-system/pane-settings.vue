<template>
  <div class="fullwidth fullheight-percent" style="height:400px;">
    <div class="fullheight-percent fullwidth flex">
      <dqTab
        :tabs="['Raw Data', 'VDS', 'Properties']"
        :toggleMode="'rerender'"
        :default="0"
        :options="{
                  borderColor: $store.state.theme.global.border_color,
                  activeColor: $store.state.theme.global.secondary_bg_color,
                  activeTextColor: 'inherit',
                }"
      >
        <div class="pad050 borderred fullheight-percent" slot="Raw Data">this is raw data</div>
        <div class="pad050" slot="VDS">this is VDS</div>
        <div slot="Properties">this is raw Properties</div>
      </dqTab>
    </div>
  </div>
</template>

<script>
/**
 * Opens up pane modal, with tabs,
 * the tabs are --> | Raw Data | VDS | Properties | Change UI-Host
 * VDS
 * VDS - Valid Data Structure, explains the correct input in order for the pane to work correctly
 * VDS - ex. "An array of objects, the object must this properties, a. b. c. d."
 *
 * Properties
 * "Pane Id", "UI-host", "Pane width", "Pane name", "Pane set by"
 *
 */
export default {};
</script>