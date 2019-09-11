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
          <div>
            <dqTab
              :tabs="['inline styles', 'editor']"
              :default="0"
              :options="{
                borderColor: $store.state.theme.global.border_color,
                activeColor: $store.state.theme.global.secondary_bg_color,
                activeTextColor: 'inherit'
              }"
            >
              <div class="pad125" slot="inline styles">
                <objectifyFlatSettings
                  @onChange="attrChange"
                  @onError="err"
                  operation="r"
                  :inputData="attr"
                  :title="'Inline Style'"
                  :options="{
                    borderColor: $store.state.theme.global.border_color,
                    padding: 's'
                  }"
                ></objectifyFlatSettings>
              </div>
              <div slot="editor">
                <monacoInlineStyle :data="data" :trigger="monaco_trigger"></monacoInlineStyle>
              </div>
            </dqTab>
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
              <strong>Attributes</strong>
            </div>
            <div class="flex flexcenter">
              <div class="marginright050 pointer padleft025 padright025">save to stage</div>
              <i class="fas fa-angle-down"></i>
            </div>
          </div>
          <div>
            <dqTab
              :tabs="['Global Attributes', 'Native Attributes']"
              :default="0"
              :options="{
                borderColor: $store.state.theme.global.border_color,
                activeColor: $store.state.theme.global.secondary_bg_color,
                activeTextColor: 'inherit'
              }"
            >
              <div class="pad125" slot="Global Attributes">
                <objectifyFlatSettings
                  @onChange="attrChange"
                  @onError="err"
                  operation="rw"
                  :inputData="attr"
                  :title="'Global Attributes'"
                  :options="{
                      padding: 's',
                      borderColor: $store.state.theme.global.border_color
                    }"
                ></objectifyFlatSettings>
              </div>
              <div class="pad125" slot="Native Attributes">
                <objectifyFlatSettings
                  @onChange="attrChange"
                  @onError="err"
                  operation="rw"
                  :inputData="attr"
                  :title="'Native Attributes'"
                  :options="{
                    borderColor: $store.state.theme.global.border_color,
                    padding: 's'
                  }"
                ></objectifyFlatSettings>
              </div>
            </dqTab>
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
            <objectifyFlatSettings
              @onChange="attrChange"
              @onError="err"
              operation="rw"
              :inputData="transform"
              :title="'Transform'"
              :options="{
                borderColor: $store.state.theme.global.border_color,
                padding: 's'
              }"
            ></objectifyFlatSettings>
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
import monaco_inlineStyle from "./monaco_inline";

export default {
  props: ["data"],

  data: () => ({
    text_content: "",
    monaco_trigger: false,
    attr: {
      id: {
        type: "string",
        minChar: 10,
        maxChar: 15,
        allowSpecialChars: false,
        allowWhiteSpace: false,
        default: null
      },
      name: {
        type: "string",
        minChar: 10,
        maxChar: 15,
        allowSpecialChars: false,
        allowWhiteSpace: false,
        default: null
      },
      lang: {
        type: "string",
        minChar: 10,
        maxChar: 15,
        allowSpecialChars: false,
        allowWhiteSpace: false,
        default: null
      },
      tabindex: {
        type: "number",
        min: 0,
        max: 999,
        step: 1,
        default: null
      },
      draggable: {
        type: "select",
        options: [true, false],
        default: 1
      },
      dropzone: {
        type: "select",
        options: [true, false],
        default: 1
      },
      contenteditable: {
        type: "select",
        options: [true, false],
        default: 1
      },
      dir: {
        type: "select",
        options: [null, "ltr", "rtl", "auto"],
        default: 0
      }
    },
    transform: {
      transformOriginX: {
        type: "select",
        options: [null, "top", "center", "bottom"],
        default: 0
      },
      transformOriginY: {
        type: "select",
        options: [null, "left", "center", "right"],
        default: 0
      },
      perspective: {
        type: "number",
        min: 0,
        max: 999,
        step: 1,
        default: null
      },
      rotateX: {
        type: "number",
        min: -180,
        max: 180,
        step: 1,
        default: 0
      },
      rotateY: {
        type: "number",
        min: -180,
        max: 180,
        step: 1,
        default: 0
      },
      rotateZ: {
        type: "number",
        min: -360,
        max: 360,
        step: 1,
        default: 0
      },
      translateZ: {
        type: "number",
        min: -360,
        max: 360,
        step: 1,
        default: 0
      }
    }
  }),

  methods: {
    // Objectify
    err(err) {
      console.log(err);
    },
    attrChange(val) {
      console.log(val);
    },

    //
    stageChanges(val) {
      this.$store.dispatch("pages/addrs_finder_mutator", {
        uid: `${this.data.index}--${this.data.uid}`,
        fn: locator => {
          this.$store.commit("pages/update_section", {
            desc: `Added Text Content to ${locator}`,
            locator,
            scoped_variable: this.text_content,
            exec_on_prop(prop, tag, scoped_variable, obj) {
              obj.properties["text_content"] = scoped_variable;
            }
          });
        }
      });
    },

    stateMonacoChanges() {
      this.monaco_trigger = !this.monaco_trigger;
    }
  },

  mounted() {
    this.text_content = this.data.properties.text_content;
  },

  components: {
    monacoInlineStyle: monaco_inlineStyle
  }
};
</script>

<style >
</style>
