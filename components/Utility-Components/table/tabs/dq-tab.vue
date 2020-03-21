<template>
  <div id="dq-tabs" class="fullwidth">
    <div
      :style="{
        borderTop: `1px solid ${options_default.borderColor}`, 
        borderBottom: `1px solid ${options_default.borderColor}`,
        background: options_default.bg}"
      class="pad025 flex fullwidth pointer"
    >
      <div
        class="pad025 padleft050 padright050"
        v-for="(tab,tab_i) in tabs"
        :key="`--sdf-${tab_i}}`"
        @click="active = tab"
        :style="{
          background: active == tab ? options_default.activeColor : '',  
          color: active == tab ? options_default.activeTextColor : '',
          borderRadius:'4px'}"
      >{{tab}}</div>
    </div>
    <div
      :id="active ? active.replace(' ','') : ''"
      v-for="(tab,tab_i) in tabs"
      :key="`--slots-${tab_i}}`"
      class="fullwidth"
      :style="{background: options_default.bg}"
    >
      <div v-if="toggleMode == 'showhide'" v-show="active === tab">
        <slot :name="tab"></slot>
      </div>

      <div v-if="toggleMode == 'rerender' && active === tab">
        <slot :name="tab"></slot>
      </div>

      <div v-if="toggleMode == 'opacity'"  :style="{opacity: active === tab ? 1 : 0}" :class="[active === tab ? 'block' : 'absolute']" >
        <slot :name="tab"></slot>
      </div>
    </div>
  </div>
</template>

<script>
// import { TweenMax, TimelineLite, TweenLite } from "gsap";

export default {
  props: ["tabs", "options", "default", "toggleMode"],
  data: () => ({
    active: undefined,
    options_default: {
      borderColor: "transparent",
      activeColor: "lightgray",
      activeTextColor: "white",
      textColor: "inherit",
      bg: 'white',
      _toggleMode:'render'
    }
  }),
  watch: {
    active() {
      if (this.active) {
        this.$emit('onTabChange', this.active)
        setTimeout(() => {
          // const n = document.getElementById(this.active.replace(" ", ""));
          // TweenMax.fromTo(n, 0.5, { opacity: "0" }, { opacity: "1" });
        }, 0);
      }
    }
  },
  mounted() {
    if(this.toggleMode){
      this._toggleMode = this.toggleMode
    }

    this.active = this.tabs[this.default];
    if (this.options) {
      if (this.options.borderColor) {
        this.options_default.borderColor = this.options.borderColor;
      }

      if (this.options.activeColor) {
        this.options_default.activeColor = this.options.activeColor;
      }

      if (this.options.activeTextColor) {
        this.options_default.activeTextColor = this.options.activeTextColor;
      }

      if (this.options.textColor) {
        this.options_default.textColor = this.options.textColor;
      }
    }
  }
};
</script>

 <style>
#dq-tabs {
  transition: 0.3s;
}
</style>