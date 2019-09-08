<template>
  <div class="flex flex1 fullwidth">
    <div class="relative fullwidth fullheight-percent aut">
      <div class="absolute fullwidth flex flexcol pad050">
        <!-- text content -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <strong>Text Content</strong>
            <div class="flex flexcenter">
              <div
                @click="stageChanges(text_content)"
                class="marginright050 pointer padleft025 padright025"
              >save to stage</div>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad050">
            <textarea
              v-model="text_content"
              style="resize: vertical"
              name="text_conent"
              class="pad050 fullwidth"
              rows="3"
            ></textarea>
          </div>
        </div>

        <!-- Custom Style -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Custom Inline Style</strong>
            </div>
            <div class="flex flexcenter">
              <div
                @click="stateMonacoChanges()"
                class="marginright050 pointer padleft025 padright025"
              >save to stage</div>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad050">
            <monaco :trigger="monaco_trigger"></monaco>
          </div>
        </div>
        <!-- Other attributes -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Other Attributes</strong>
            </div>
            <div class="flex flexcenter">
              <div class="marginright050 pointer padleft025 padright025">save to stage</div>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad125">
            <div>
              <div class="padbottom050">
                <strong>
                  <div>Id</div>
                </strong>
                <input type="text" />
              </div>
              <div class="padbottom025">
                <strong>
                  <div>role</div>
                </strong>
                <input type="text" />
              </div>
              <div class="padbottom025">
                <strong>
                  <div>data-attr</div>
                </strong>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
        <!-- transform -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Transform</strong>
            </div>
            <div class="flex flexcenter">
              <div class="marginright050 pointer padleft025 padright025">save to stage</div>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad125">
            <div>
              <div class="padbottom050">
                <strong>
                  <div>Id</div>
                </strong>
                <input type="text" />
              </div>
              <div class="padbottom025">
                <strong>
                  <div>role</div>
                </strong>
                <input type="text" />
              </div>
              <div class="padbottom025">
                <strong>
                  <div>data-attr</div>
                </strong>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
        <!-- Stat -->
        <div
          :style="{border: `1px solid ${$store.state.theme.global.border_color}`}"
          class="marginbottom050"
        >
          <div
            :style="{background:`${$store.state.theme.global.secondary_bg_color}`}"
            class="pad050 spacebetween flex st-viz-bnnr"
          >
            <div>
              <strong>Stat</strong>
            </div>
            <div class="flex flexcenter">
              <div class="marginright050 pointer padleft025 padright025">save to stage</div>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div class="pad050">sdaf</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import monaco from "./monaco";

export default {
  props: ["data"],

  data: () => ({
    text_content: "",
    monaco_trigger: false
  }),

  methods: {
    stageChanges(val) {
      this.$store.dispatch("pages/addrs_finder_mutator", {
        uid: `${this.data.index}--${this.data.uid}`,
        fn: locator => {
          this.$store.commit("pages/update_section", {
            desc: `Added Text Content to ${locator}`,
            locator,
            scoped_variable: this.text_content,
            exec_on_prop(prop, tag, scoped_variable, obj) {
              console.log(obj);
              obj.properties["text_content"] = scoped_variable;
            }
          });
        }
      });
    },

    stateMonacoChanges() {
      this.monaco_trigger = true;
    }
  },

  mounted() {
    this.text_content = this.data.properties.text_content;
  },

  components: {
    monaco
  }
};
</script>

<style >
</style>
