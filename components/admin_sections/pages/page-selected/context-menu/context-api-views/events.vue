<template>
  <div class="flex  fullwidth pad050">
    <div :style="{border: `1px solid ${$store.state.theme.global.border_color}`}" class="fullwidth">
      <div
        :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
        class="pad050 spacebetween flex st-viz-bnnr"
      >
        <strong>Events</strong>
      </div>
      <div :style="{borderBottom: `1px solid ${$store.state.theme.global.border_color}`, borderTop: `1px solid ${$store.state.theme.global.border_color}`}" class="flex">
          <div :style="{background: view == 'rc' ? `${$store.state.theme.global.secondary_bg_color}` : '' }" @click="view = 'rc'" class="pointer pad025 padleft050 padright050">rightclick</div>
          <div :style="{background: view == 'lc' ? `${$store.state.theme.global.secondary_bg_color}` : '' }" @click="view = 'lc'" class="pointer pad025 padleft050 padright050">leftclick</div>
          <div :style="{background: view == 'me' ? `${$store.state.theme.global.secondary_bg_color}` : '' }" @click="view = 'me'" class="pointer pad025 padleft050 padright050">mouseenter</div>
          <div :style="{background: view == 'ml' ? `${$store.state.theme.global.secondary_bg_color}` : '' }" @click="view = 'ml'" class="pointer pad025 padleft050 padright050">mouseleave</div>
          <div :style="{background: view == 'mm' ? `${$store.state.theme.global.secondary_bg_color}` : '' }" @click="view = 'mm'" class="pointer pad025 padleft050 padright050">mousemove</div>
      </div>
      <div>
          <div>activate ?</div>
          {{view}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            view: undefined
        }
    }
};
</script>