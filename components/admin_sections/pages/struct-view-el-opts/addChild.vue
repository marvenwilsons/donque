<template>
  <div>
    <strong>Common HTML</strong>
    <span>
      <strike>(can be nested)</strike>
    </span>
    <div style="width:350px" class="flex relative flexwrap padbottom125">
      <div
        @click="selected = el, cur_actv = `cmn-html-${el}`"
        :style="{background: active === `cmn-html-${el}` || cur_actv == `cmn-html-${el}` ? hoverBgColor : ''}"
        @mouseover="active = `cmn-html-${el}`"
        @mouseleave="cur_actv != `cmn-html-${el}` && (active = undefined)"
        class="dq-el-ac flex flexcenter pad025 margin025 pointer"
        v-for="el in els"
        :key="`el1-${el}`"
      >{{el}}</div>
    </div>
    <strong>Reactive HTML</strong>
    <span>
      <strike>(cannot be nested)</strike>
    </span>
    <div style="width:350px" class="flex relative flexwrap padbottom125">
      <div
        @click="selected = el, cur_actv = `ractv-html${el}`"
        :style="{background: active === `ractv-html${el}` || cur_actv == `ractv-html${el}` ? hoverBgColor : ''}"
        @mouseover="active = `ractv-html${el}`"
        @mouseleave="cur_actv != `ractv-html${el}` && (active = undefined)"
        class="dq-el-ac flex flexcenter pad025 margin025 pointer"
        v-for="el in els4"
        :key="`el4-${el}`"
      >{{el}}</div>
    </div>
    <strong>Headings</strong>
    <div style="width:350px" class="flex relative flexwrap padbottom125">
      <div
        @click="selected = el, cur_actv = `html-headings-${el}`"
        :style="{background: active === `html-headings-${el}` || cur_actv == `html-headings-${el}` ? hoverBgColor : ''}"
        @mouseover="active = `html-headings-${el}`"
        @mouseleave="cur_actv != `html-headings-${el}` && (active = undefined)"
        class="dq-el-ac flex flexcenter pad025 margin025 pointer"
        v-for="el in els2"
        :key="`el2-${el}`"
      >{{el}}</div>
    </div>
    <strong>Plugins</strong>
    <span>
      <strike>(cannot be nested)</strike>
    </span>
    <div style="width:350px" class="flex relative flexwrap">
      <div
        @click="selected = el, cur_actv = `dq-opt-bx-plgins-${el}`"
        :style="{background: active === `dq-opt-bx-plgins-${el}` || cur_actv == `dq-opt-bx-plgins-${el}` ? hoverBgColor : ''}"
        @mouseover="active = `dq-opt-bx-plgins-${el}`"
        @mouseleave="cur_actv != `dq-opt-bx-plgins-${el}` && (active = undefined)"
        class="dq-el-ac flex flexcenter pad025 margin025 pointer"
        v-for="el in els3"
        :key="`el3-${el}`"
      >{{el}}</div>
    </div>

    <div v-if="selected" class="padtop125 flex flexend flexcenter">
      <span class="padright050">You selected <strong>{{selected}}</strong> </span>
      <span @click="addElemento(selected)" class="padleft050 padright050 padtop025 padbottom025 pointer">Add Element</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: undefined,
      active: undefined,
      cur_actv: undefined,
      theme: this.$store.state.theme,
      hoverBgColor: this.$store.state.theme.notify_tile_body_bg_hover_color,
      els: [
        "div",
        "span",
        "main",
        "article",
        "footer",
        "p",
        "a",
        "nav",
        "section"
      ],
      els2: ["h1", "h2", "h3", "h4", "h5", "h6"],
      els3: [
        "dqFormMaker-free",
        "dqTable-free",
        "objectify",
        "listify",
        "collections-free",
        "simple-slider",
        "simple-tab"
      ],
      els4: ["button", "img", "audio", "video"]
    };
  },
  methods: {
      addElemento(s){
          console.log(s)
      }
  }
};
</script>

<style>
.dq-el-ac {
  border: 1px solid gray;
  min-width: 50px;
  border-radius: 3px;
}
</style>
