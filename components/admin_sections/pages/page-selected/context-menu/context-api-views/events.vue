<template>
  <div class="flex fullwidth pad050">
    <div :style="{border: `1px solid ${$store.state.theme.global.border_color}`}" class="fullwidth">
      <div
        :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
        class="pad050 spacebetween flex st-viz-bnnr"
      >
        <strong>Events</strong>
        <div>stage changes</div>
      </div>
      <div
        :style="{borderBottom: `1px solid ${$store.state.theme.global.border_color}`, borderTop: `1px solid ${$store.state.theme.global.border_color}`}"
        class="flex"
      >
        <div
          :style="{background: view == 'rc' ? `${$store.state.theme.global.secondary_bg_color}` : '' }"
          @click="view = 'rc'"
          class="pointer pad025 padleft050 padright050 flex"
        >
          <span class="padright025">rightclick</span>
          <div class="padleft025 flex flexcenter">
            <input type="checkbox" />
          </div>
        </div>
        <div
          :style="{background: view == 'lc' ? `${$store.state.theme.global.secondary_bg_color}` : '' }"
          @click="view = 'lc'"
          class="pointer pad025 padleft050 padright050 flex"
        >
          <span class="padright025">leftclick</span>
          <div class="padleft025 flex flexcenter">
            <input type="checkbox" />
          </div>
        </div>
        <div
          :style="{background: view == 'me' ? `${$store.state.theme.global.secondary_bg_color}` : '' }"
          @click="view = 'me'"
          class="pointer pad025 padleft050 padright050 flex"
        >
          <span class="padright025">mouseenter</span>
          <div class="padleft025 flex flexcenter">
            <input type="checkbox" />
          </div>
        </div>
        <div
          :style="{background: view == 'ml' ? `${$store.state.theme.global.secondary_bg_color}` : '' }"
          @click="view = 'ml'"
          class="pointer pad025 padleft050 padright050 flex"
        >
          <span class="padright025">mouseleave</span>
          <div class="padleft025 flex flexcenter">
            <input type="checkbox" />
          </div>
        </div>
        <div
          :style="{background: view == 'mm' ? `${$store.state.theme.global.secondary_bg_color}` : '' }"
          @click="view = 'mm'"
          class="pointer pad025 padleft050 padright050 flex"
        >
          <span class="padright025">mousemove</span>
          <div class="padleft025 flex flexcenter">
            <input type="checkbox" />
          </div>
        </div>
      </div>
      <div>
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
    };
  }
};
</script>