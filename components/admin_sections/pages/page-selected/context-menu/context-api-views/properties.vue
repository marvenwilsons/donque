<template>
  <div class="flex flex1 fullwidth">
    <div class="relative fullwidth fullheight-percent aut">
      <div class="absolute fullwidth flex flexcol pad050">
        <!-- text content -->
        <div class="padbottom050">
          <saveToStagePane
            :paneTitle="'Text Content'"
            :paneBg="$store.state.theme.global.secondary_bg_color"
            :collapse="true"
            :saveToStage="true"
            :borderColor="$store.state.theme.global.border_color"
            @onSaveToStage="stageChanges(text_content)"
          >
            <div class="pad050">
              <textarea
                v-model="text_content"
                style="resize: vertical"
                name="text_conent"
                class="pad050 fullwidth"
                rows="3"
              ></textarea>
            </div>
          </saveToStagePane>
        </div>

        <!-- Custom Style -->
        <div class="padbottom050">
          <saveToStagePane
            :paneTitle="'Custom Inline Style'"
            :paneBg="$store.state.theme.global.secondary_bg_color"
            :saveToStage="true"
            :collapse="true"
            :borderColor="$store.state.theme.global.border_color"
            @onSaveToStage="stateMonacoChanges"
          >
            <div>
              <dqTab
                :tabs="['inline styles', 'editor']"
                :default="0"
                :toggleMode="monacoInlineToggleMode"
                :options="{
                borderColor: $store.state.theme.global.border_color,
                activeColor: $store.state.theme.global.secondary_bg_color,
                activeTextColor: 'inherit'
              }"
              >
                <div class="pad125" slot="inline styles">
                  <objectifyFlatSettings
                    operation="r"
                    :inputData="data.inlineStyle"
                    :title="'Inline Style'"
                    :options="{
                    borderColor: $store.state.theme.global.border_color,
                    padding: 's'
                  }"
                  ></objectifyFlatSettings>
                </div>
                <monacoInlineStyle @codeChange="monacoInlineCodeChange" slot="editor" :data="data" :trigger="monaco_trigger"></monacoInlineStyle>
              </dqTab>
            </div>
          </saveToStagePane>
        </div>

        <!-- Other attributes -->
        <div class="padbottom050">
          <saveToStagePane
            :paneTitle="'Attributes'"
            :paneBg="$store.state.theme.global.secondary_bg_color"
            :collapse="true"
            :saveToStage="true"
            :borderColor="$store.state.theme.global.border_color"
            @onSaveToStage="attrHandler"
          >
            <div>
              <dqTab
                :tabs="['Global Attributes', 'Native Attributes']"
                :default="0"
                :toggleMode="'rerender'"
                :options="{
                borderColor: $store.state.theme.global.border_color,
                activeColor: $store.state.theme.global.secondary_bg_color,
                activeTextColor: 'inherit'
              }"
              >
                <div class="pad125" slot="Global Attributes">
                  <objectifyFlatSettings
                    @onChange="onAttrChange"
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
                    @onChange="onAttrChange"
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
          </saveToStagePane>
        </div>

        <!-- transform -->
        <div class="padbottom050">
          <saveToStagePane
            :paneTitle="'Transform'"
            :paneBg="$store.state.theme.global.secondary_bg_color"
            :collapse="true"
            :saveToStage="true"
            :borderColor="$store.state.theme.global.border_color"
            @onSaveToStage="transformHandler"
          >
            <div class="pad125">
              <objectifyFlatSettings
                @onChange="onTransformChange"
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
          </saveToStagePane>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import monaco_inlineStyle from "./monaco_inline";
import objtifyConverter from "../../../../../../components/global-ui/objectify/converter";

export default {
  props: ["data"],

  data: () => ({
    text_content: "",
    monaco_trigger: false,
    hasErr: false,
    ready: true,
    monacoInlineToggleMode: 'rerender',

    attrNewValue: undefined,
    attr: {
      id: {
        type: "string",
        minChar: 3,
        maxChar: 20,
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

    transformNewValue: undefined,
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
    // Objectify error
    err(err) {
      if (err.onMethod == "change") {
        this.hasErr = true;
      } else {
        this.$store.commit("modal/set_modal", {
          head: "Objectify Error",
          body: err.Msg,
          config: {
            ui_type: "err",
            closable: false
          }
        });
      }
    },

    // Attribute Handler
    onAttrChange(val) {
      this.hasErr = false;
      this.attrNewValue = val;
    },
    attrHandler() {
      if (this.hasErr) {
        this.$store.commit("modal/set_modal", {
          head: "Objectify Error",
          body:
            'Cannot perform "save to stage" because there are un-resolve errors',
          config: {
            ui_type: "err",
            closable: false
          }
        });
      } else {
        this.$store.dispatch("pages/addrs_finder_mutator", {
          uid: `${this.data.index}--${this.data.uid}`,
          fn: locator => {
            this.$store.commit("pages/update_section", {
              desc: `Updated Attributes ${locator}`,
              locator,
              scoped_variable: this.attrNewValue,
              exec_on_prop(prop, tag, scoped_variable, obj) {
                obj.properties["attributes"] = scoped_variable;
              }
            });
          }
        });
        this.$store.commit("pages/set_temp_id", {
          uid: this.data.uid,
          index: this.data.index
        });
      }
    },

    // Transform handler
    transformHandler() {
      console.log(val);
    },
    onTransformChange() {
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

    // custom inline style handler
    stateMonacoChanges() {
      this.monaco_trigger = !this.monaco_trigger;
    },
    monacoInlineCodeChange() {
      this.monacoInlineToggleMode = 'opacity'
    }
  },

  components: {
    monacoInlineStyle: monaco_inlineStyle
  },

  mounted() {
    this.text_content = this.data.properties.text_content;

    // attr
    const attr_parsedVanilaObj = objtifyConverter(
      this.attr,
      this.data.properties.attributes
    );
    this.attr = attr_parsedVanilaObj;
  }
};
</script>

<style >
</style>
