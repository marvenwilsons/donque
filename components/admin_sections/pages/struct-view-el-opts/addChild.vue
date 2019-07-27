<template>
  <div :style="{color:theme['page_editor_tile_opt_addChild_tiles'].color}">
    <strong>Common HTML</strong>
    <span>
      <strike>(can be nested)</strike>
    </span>
    <div style="width:350px" class="flex relative flexwrap padbottom125">
      <div
        @click="selected = el, cur_actv = `cmn-html-${el}`"
        :style="setStyle(active === `cmn-html-${el}` || cur_actv == `cmn-html-${el}`)"
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
        :style="setStyle(active === `ractv-html${el}` || cur_actv == `ractv-html${el}`)"
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
        :style="setStyle(active === `html-headings-${el}` || cur_actv == `html-headings-${el}`)"
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
        :style="setStyle(active === `dq-opt-bx-plgins-${el}` || cur_actv == `dq-opt-bx-plgins-${el}`)"
        @mouseover="active = `dq-opt-bx-plgins-${el}`"
        @mouseleave="cur_actv != `dq-opt-bx-plgins-${el}` && (active = undefined)"
        class="dq-el-ac flex flexcenter pad025 margin025 pointer"
        v-for="el in els3"
        :key="`el3-${el}`"
      >{{el}}</div>
    </div>

    <div v-if="selected" class="padtop125 flex flexend flexcenter">
      <span class="padright050">
        You selected
        <strong>{{selected}}</strong>
      </span>
      <span
        :style="{...theme['page_editor_tile_opt_addChild_tiles_hover_&_active']}"
        @click="addElemento(selected,uid)"
        class="padleft050 padright050 padtop025 padbottom025 pointer"
      >Add Element</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['uid','data','path'],
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
        "simple-tab",
        "file-upload"
      ],
      els4: ["button", "img", "audio", "video"]
    };
  },
  methods: {
    addElemento(el,uid) {      
      // this.$store
      //     .dispatch("systemCall", {
      //       command: "updatePage",
      //       section: "pageMethods",
      //       data: {
      //         mode: "addChild",
      //         path: this.path,
      //         customData: {
      //           uid,
      //           el
      //         }
      //       },
      //       method: "post"
      //     })
      //     .then(respose => {
      //       if (respose.status) {
      //         this.$store.dispatch("pages/update_root", this.page_data.path);
      //         this.sec_modal_viz = false;
      //       }
      //     });

      // add new to stage
      // get the current the current stage and produce a new one
    },
    setStyle(arg) {
      if (arg) {
        return this.theme["page_editor_tile_opt_addChild_tiles_hover_&_active"];
      } else {
        return this.theme.page_editor_tile_opt_addChild_tiles;
      }
    }
  },
  mounted() {
    this.$store.dispatch("theme/set_class_css_defaults", {
      class: ["dq-el-ac"],
      css_keys: ["transition"],
      css_values: ["0.2s"]
    });
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
