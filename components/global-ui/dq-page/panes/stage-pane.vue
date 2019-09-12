<template>
  <div :style="{border: `1px solid ${borderColor}`}" class="fullwidth">
    <div :style="{background:`${paneBg}`}" class="pad050 spacebetween flex st-viz-bnnr">
      <strong>{{paneTitle}}</strong>
      <div class="flex flexcenter">
        <div
          v-if="saveToStage"
          @click="$emit('onSaveToStage')"
          class="marginright050 pointer padleft025 padright025"
        >save to stage</div>
        <div @click="toggle" class="pointer" v-if="collapse">
          <i v-if="toggleState == false" class="fas fa-angle-right padright025"></i>
          <i v-if="toggleState == true" class="fas fa-angle-down padright025"></i>
        </div>
      </div>
    </div>
    <div :id="`dq-st-pane-${rem_ws(paneTitle)}`" class="fullwidth">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { TweenMax, TimelineLite, TweenLite } from "gsap";

export default {
  props: ["paneTitle", "paneBg", "borderColor", "collapse", "saveToStage"],
  data: () => ({
    toggleState: true,
    h: 0
  }),
  methods: {
    toggle() {
      const n = document.getElementById(
        `dq-st-pane-${this.paneTitle.replace(/\s/g, "")}`
      );
      this.toggleState = !this.toggleState;

      if(this.h == 0){
          this.h = n.children[0].offsetHeight
      }

      if (this.toggleState) {
        TweenMax.fromTo(n, 0.2, { opacity: "0" }, { opacity: "1" });
        TweenMax.fromTo(n, 0.3, { height: "0px" }, { height: `${this.h}px` });
        TweenMax.fromTo(n, 0.3, { display: "none" }, { display: 'block' });
      } else {
        TweenMax.fromTo(n, 0.5, { opacity: "1" }, { opacity: "0" });
        TweenMax.fromTo(n, 0.3, { height: `${this.h}px` }, { height: '0px' });
        TweenMax.fromTo(n, 0.3, { display: "block" }, { display: 'none' });
      }
    },
    rem_ws(s) {
      return s.replace(/\s/g, "");
    }
  }
};
</script>