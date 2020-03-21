<template>
    <div>
        <!-- toogleModes: showhide, opacity, showhide -->
        <!-- Note: toggleMode should not be null for the data to show -->
        <!-- Events: onTabChange -->
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
          <div class="pad050 borderred" slot="Raw Data">this is raw data</div>
          <div class="pad050" slot="VDS">this is VDS</div>
          <div slot="Properties">this is raw Properties</div>
        </dqTab>
    </div>
</template>