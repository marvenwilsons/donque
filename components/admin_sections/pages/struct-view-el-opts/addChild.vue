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
  props: ["uid", "data", "path"],
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

      let addrs = [];
      let go = false;

      const recor = id => {
        const x = document.getElementById(`${id}`);

        if (x.parentElement.id == "dq-viz-host") {
          /**
           * split id > push to array
           * if the id of the element is equal to dq-viz-host
           * trim and split the id discard the character body
           * and parse the it to int then push to addrs array
           */
          addrs.push(
            parseInt(x.id.split("--")[0]) == NaN
              ? x.id.split("--")[0]
              : parseInt(x.id.split("--")[0])
          );


          //
          go = true;


        } 
        // if the is is not dq-viz-host
        else {
          const x = document.getElementById(`${id}`);

          const gtr = r => {
            if (r.parentElement.id != "dq-page-editor-area-c1") {
              gtr(r.parentElement);

              if (r.id) {
                addrs.push(parseInt(r.id.split("--")[0]));
              }

            } else {
              // replace the first index value of the addrs array to
              // data attribute value, this represents the section
              addrs.splice(0, 1, parseInt(r.getAttribute("data")));

              //
              go = true;
            }
          };

          addrs.push(
            parseInt(id.split("--")[0]) == NaN
              ? id.split("--")[0]
              : parseInt(id.split("--")[0])
          );


          /**
           * if the html element has no id, execute the gtr function.
           * the gtr function is a recorsive function,
           * the gtr function's main purpose is to find the id dq-page-editor-area-c1
           * until then the gtr function will kepp on executing on its self
           * 
           * if the current html being examine by each execution of the gtr function 
           * has an id, that id will be push to addrs array
           * 
           * if the id dq-page-editor-area-c1 found
           */
          if (x.parentElement.id == "") {
            const asfd = gtr(x);
          } else {
          }
        }
      };

      /**
       * 1. processing starts here! getting the addrs of the element being click
       * by reading the ID of each element until the parent host id is reach,
       * constant addrs mutation
       */
      recor(uid);

      const isOdd = num => num % 2;


      let cntr = -1;
      let new_addrs = [];

      /**
       * Currently the addrs array is an array of numbers which
       * represents the position index of arrays in the els object
       * insided the section object of the stage object located in the store.
       *
       * ex. current addrs state: [0,0]
       * ex. addrs after for loop: [0,'els',0,'els']
       * 
       * 2. push 'els' string to addrs array if index is even,
       * push addrs value according by index if it is odd.
       */
      for (let i = 0; i < addrs.length * 2; i++) {
        if (isOdd(i)) {
          new_addrs.push("els");
        } else {
          cntr++;
          new_addrs.push(addrs[cntr]);
        }
      }

      /**
       * 3
       */
      new_addrs.pop();

      /**
       * 4.
       * send final data to store for new stage entry
       */
      if (go) {
        this.$store.commit("pages/update_section", {
          desc: `Added HTML ${el} element to section - addrs: ${new_addrs.join(" > ")}`,
          locator: new_addrs,
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

        addrs = [];
        new_addrs = [];
      }
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
