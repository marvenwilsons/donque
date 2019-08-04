<template>
  <div class :style="{color:theme['page_editor_tile_opt_addChild_tiles'].color}">
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
    <div style="bottom:-50px;color:white;" class="absolute">.</div>
  </div>
</template>

<script>
export default {
  props: ["addrs_finder", "uid", "data", "path"],
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
        // "dqFormMaker-free",
        // "dqTable-free",
        // "objectify",
        // "listify",
        // "collections-free",
        // "simple-slider",
        // "simple-tab",
        // "file-upload"
      ],
      els4: ["button", "img", "audio", "video"]
    };
  },
  methods: {
    addElemento(el, uid) {
      const fn = () => {};

      const gots = ({
        tag,
        name,
        role,
        inlineStyle,
        innerText,
        classList,
        els,
        path,
        createdOn,
        createdBy,
        lastModified
      }) => {
        return {
          tag: tag ? tag : "html_div",
          name,
          role,
          inlineStyle: inlineStyle ? inlineStyle : {},
          innerText,
          classList: classList ? classList : [],
          els: els ? els : [],
          data_collection: {},
          stat: {
            lastModified,
            createdOn,
            createdBy,
            type: "",
            path
          },
          security: {
            isLokced: false,
            password: "",
            allowedAdminsToWrite: [],
            access_type: "public",
            is_under_maintenance: false
          },
          commits: [],
          uid: (length => {
            var result = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
              result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            return result;
          })(4)
        };
      };

      this.addrs_finder({ el, uid }, locator => {
        this.$store.commit("pages/update_section", {
          desc: `Added HTML ${el} element to section - addrs: ${locator.join(
            " > "
          )}`,
          locator,
          tag: el,
          target_prop: "els",
          exec_on_prop: function(prop) {
            prop.push(
              gots({
                tag: `html_${el}`
              })
            );
          }
        });
      });

      
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
