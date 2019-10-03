<template>
  <div v-if="ready" class="flex flex1 fullwidth">
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
            @onSaveToStage="textContentChange(text_content)"
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
                    :inputData="inlineStyle"
                    :title="'Inline Style'"
                    :options="{
                    borderColor: $store.state.theme.global.border_color,
                    padding: 's'
                  }"
                  ></objectifyFlatSettings>
                </div>
                <monacoInlineStyle
                  @codeChange="monacoInlineCodeChange"
                  slot="editor"
                  :inlineCode="inlineCode"
                  :data="data"
                  :trigger="monaco_trigger"
                ></monacoInlineStyle>
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
            @onSaveToStage="attr_save_to_stage"
          >
            <div>
              <!-- $store.state.pages.temp_id ? $store.state.pages.temp_id.scoped_variable :0 -->
              <dqTab
                :tabs="_attribute_tabs"
                :default="0"
                :toggleMode="attrToggleMode"
                :hideInSingleTab="true"
                @onTabChange="tab_change"
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
                    v-if="attr_render"
                    :inputData="attr"
                    :title="'Global Attributes'"
                    :options="{
                      padding: 's',
                      borderColor: $store.state.theme.global.border_color,
                      bg: 'white'
                    }"
                  ></objectifyFlatSettings>
                </div>
                <div class="pad125" slot="Native Attributes">
                  <objectifyFlatSettings
                    v-if="nativeAttr_render"
                    @onChange="onNativeAttrChange"
                    @onError="err"
                    operation="rw"
                    :inputData="nativeAttr ? nativeAttr : _native_attributes_set_on_html_elements"
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
        <!-- <div class="padbottom050">
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
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import monaco_inlineStyle from "./monaco_inline";
import objtifyConverter from "../../../../../../components/global-ui/objectify/converter";

export default {
  props: ["data", "stageData"],

  data: () => ({
    // General purpose Model
    stage_data: undefined,
    text_content: "",
    monaco_trigger: false,
    hasErr: false,
    ready: true,

    // Model of Attr tab
    current_attribute_tab: undefined,

    // Model of inline style view and the inline code view
    inlineStyle: undefined,
    inlineCode: undefined,
    monacoInlineToggleMode: "rerender",

    // Model of Global Attributes HTML view
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
      tabindex: {
        type: "number",
        min: 0,
        max: 999,
        step: 1,
        default: null
      }
      // draggable: {
      //   type: "select",
      //   options: [true, false],
      //   default: 1
      // },
      // dropzone: {
      //   type: "select",
      //   options: [true, false],
      //   default: 1
      // },
      // contenteditable: {
      //   type: "select",
      //   options: [true, false],
      //   default: 1
      // },
      // dir: {
      //   type: "select",
      //   options: [null, "ltr", "rtl", "auto"],
      //   default: 0
      // }
    },
    attr_render: true,
    attrToggleMode: undefined,
    attr_has_changed: false,

    // Model of Native Atrributes HTML view
    nativeAttrNewValue: undefined,
    nativeAttr: undefined,
    nativeAttr_render: true,
    native_attr_has_changed: false,

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

  computed: {
    _root() {
      return this.$store.state.pages.root;
    },
    _attribute_tabs() {
      const TagHaveNativeAttrs = new Set([
        "html_audio",
        "html_video",
        "html_img",
        "html_button"
      ]);

      if (TagHaveNativeAttrs.has(this.data.tag)) {
        return ["Global Attributes", "Native Attributes"];
      } else {
        return ["Global Attributes"];
      }
    },
    _native_attributes_set_on_html_elements() {
      if (this.data.tag == "html_audio") {
        return {
          autoplay: {
            type: "select",
            options: [true, false],
            default: 1
          },
          controls: {
            type: "select",
            options: [true, false],
            default: 1
          },
          loop: {
            type: "select",
            options: [true, false],
            default: 1
          },
          muted: {
            type: "select",
            options: [true, false],
            default: 1
          },
          src: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          }
        };
      } else if (this.data.tag == "html_video") {
        return {
          autoplay: {
            type: "select",
            options: [true, false],
            default: 1
          },
          controls: {
            type: "select",
            options: [true, false],
            default: 1
          },
          loop: {
            type: "select",
            options: [true, false],
            default: 1
          },
          muted: {
            type: "select",
            options: [true, false],
            default: 1
          },
          src: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          },
          height: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          },
          width: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          },
          poster: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          }
        };
      } else if (this.data.tag == "html_img") {
        return {
          alt: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          },
          crossorigin: {
            type: "select",
            options: [null, "anonymous ", "use-credentials"],
            default: 1
          },
          height: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          },
          ismap: {
            type: "select",
            options: [null, "ismap "],
            default: 1
          },
          longdesc: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          },
          src: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          },
          width: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null
          }
        };
      } else if (this.data.tag == "html_button") {
        return {
          autofucos: {
            type: "select",
            options: [null, "autofocus"],
            default: 0,
            hoverInfo:
              "Specifies that a button should automatically get focus when the page loads"
          },
          disabled: {
            type: "select",
            options: [null, "disabled"],
            default: 0,
            hoverInfo: "Specifies that a button should be disabled"
          },
          formaction: {
            type: "string",
            minChar: 3,
            maxChar: 500,
            allowWhiteSpace: false,
            default: null,
            hoverInfo: `Specifies where to send the form-data when a form is submitted. Only for type="submit"`,
            renderCondition: {
              controllers: ["type"],
              method: schema => schema.type.default == 3
            }
          },
          formenctype: {
            type: "select",
            options: [
              null,
              "application/x-www-form-urlencoded",
              "multipart/form-data",
              "text/plain"
            ],
            hoverInfo: `Specifies how form-data should be encoded before sending it to a server. Only for type="submit"`,
            renderCondition: {
              controllers: ["type"],
              method: schema => schema.type.default == 3
            }
          },
          formmethod: {
            type: "select",
            options: [null, "get", "post"],
            default: 0,
            hoverInfo: `Specifies how to send the form-data (which HTTP method to use). Only for type="submit"`,
            renderCondition: {
              controllers: ["type"],
              method: schema => schema.type.default == 3
            }
          },
          formnovalidate: {
            type: "select",
            options: [null, "formnovalidate"],
            default: 0,
            hoverInfo: `Specifies that the form-data should not be validated on submission. Only for type="submit" `,
            renderCondition: {
              controllers: ["type"],
              method: schema => schema.type.default == 3
            }
          },
          formtarget: {
            type: "select",
            options: [null, "_blank", "_self", "_parent", "top"],
            default: 0,
            hoverInfo: `Specifies where to display the response after submitting the form. Only for type="submit"`,
            renderCondition: {
              controllers: ["type"],
              method: schema => schema.type.default == 3
            }
          },
          type: {
            type: "select",
            options: [null, "button", "reset", "submit"],
            default: 0,
            hoverInfo: `Specifies the type of button`
          },
          value: {
            type: "string",
            minChar: 1,
            maxChar: 500,
            default: null,
            hoverInfo: `Specifies an initial value for the button`
          }
        };
      }
    }
  },

  watch: {
    _root() {
      this.monacoInlineToggleMode = "rerender";

      this.ready = false;

      setTimeout(() => {
        this.ready = true;
      }, 0);

      // attr
      const attr_parsedVanilaObj = objtifyConverter(
        this.attr,
        this.data.properties.attributes
      );
      this.attr = attr_parsedVanilaObj;

      // after save to server this code is reponsible for updating the ui of native attributes
      // it re writes the nativeAttr property in the vue data object, which the objectify is using
      // to display the data. this is like a hot update behaviour.
      const nativeAttr_parsedVanilaObj = objtifyConverter(
        this._native_attributes_set_on_html_elements,
        this.data.properties.native_attributes
      );
      this.nativeAttr = nativeAttr_parsedVanilaObj;

      //
      this.attrToggleMode = "rerender";
    },
    // Controller of Stages, when user changes the stage pointer
    stageData(o, n) {
      if (n) {
        let final = undefined;
        let old = undefined;
        const findObj = (o, id) => {
          if (o === null) return null;

          var output, v, key;
          output = Array.isArray(o) ? [] : {};
          for (key in o) {
            if (o.uid == id) {
              final = o;
              return;
            }

            v = o[key];
            output[key] = typeof v === "object" ? findObj(v, id) : v;
          }
        };

        if (this.$store.state.pages.temp_id) {
          findObj(n, this.$store.state.pages.temp_id.uid);
          old = findObj(o, this.$store.state.pages.temp_id.uid);
          this.stage_data = final;

          // hot update mutation

          // text conent hot update

          // inline style hot update
          if (
            JSON.stringify(final.inlineStyle) !=
            JSON.stringify(this.inlineStyle)
          ) {
            this.inlineStyle = final.inlineStyle;
          }

          // inline code hot update
          if (
            JSON.stringify(final.inlineCode) != JSON.stringify(this.inlineCode)
          ) {
            this.inlineCode = final.inlineCode;
          }

          // global attr hot update
          if (
            JSON.stringify(final.properties.attributes) !=
            JSON.stringify(this.attr)
          ) {
            this.attr = objtifyConverter(
              this.attr,
              final.properties.attributes
            );
            this.attr_render = false;
            setTimeout(() => {
              this.attr_render = true;
            }, 0);
          }

          // native attr hot update
          if (
            JSON.stringify(final.properties.native_attributes) !=
            JSON.stringify(this.nativeAttr)
          ) {
            this.nativeAttr = objtifyConverter(
              this.nativeAttr,
              final.properties.native_attributes
            );
            this.nativeAttr_render = false;
            setTimeout(() => {
              this.nativeAttr_render = true;
            }, 0);
          }
        }
      }
    }
  },

  methods: {
    // static method copy
    copy(o) {
      if (o === null) return null;

      var output, v, key;
      output = Array.isArray(o) ? [] : {};
      for (key in o) {
        v = o[key];
        output[key] = typeof v === "object" ? copy(v) : v;
      }

      return output;
    },
    // Controller of modal, spwans modal display
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

    // Controller of dqtab components
    tab_change(tab_name) {
      this.current_attribute_tab = tab_name;
    },

    // Controller of Global Attribute, manipulates global attributes model
    onAttrChange(val) {
      this.hasErr = false;
      this.attrNewValue = val;
      this.attr_has_changed = true;
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
      } else if (!this.attr_has_changed) {
        this.$store.commit("modal/set_modal", {
          head: "dqPageLogicError",
          body: "There is currently nothing to save",
          config: {
            ui_type: "err",
            closable: false
          }
        });
      } else {
        const copy = o => {
          if (o === null) return null;

          var output, v, key;
          output = Array.isArray(o) ? [] : {};
          for (key in o) {
            v = o[key];
            output[key] = typeof v === "object" ? copy(v) : v;
          }

          return output;
        };
        const nattr = copy(this.attrNewValue);
        this.$store.dispatch("pages/addrs_finder_mutator", {
          uid: `${this.data.index}--${this.data.uid}`,
          fn: locator => {
            this.$store.commit("pages/update_section", {
              desc: `Updated Attributes ${locator}`,
              locator,
              scoped_variable: nattr,
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
    // Controller of Native Attributes, manipulates the native attribute model
    onNativeAttrChange(val) {
      this.hasErr = false;
      this.nativeAttrNewValue = val;
      this.native_attr_has_changed = true;
    },
    nativeAttrHandler() {
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
      } else if (!this.native_attr_has_changed) {
        this.$store.commit("modal/set_modal", {
          head: "dqPageLogicError",
          body: "There is currently nothing to save",
          config: {
            ui_type: "err",
            closable: false
          }
        });
      } else {
        const copy = o => {
          if (o === null) return null;

          var output, v, key;
          output = Array.isArray(o) ? [] : {};
          for (key in o) {
            v = o[key];
            output[key] = typeof v === "object" ? copy(v) : v;
          }

          return output;
        };
        const natarr = copy(this.nativeAttrNewValue);
        this.$store.dispatch("pages/addrs_finder_mutator", {
          uid: `${this.data.index}--${this.data.uid}`,
          fn: locator => {
            this.$store.commit("pages/update_section", {
              desc: `Updated Attributes ${locator}`,
              locator,
              scoped_variable: natarr,
              exec_on_prop(prop, tag, scoped_variable, obj) {
                obj.properties["native_attributes"] = scoped_variable;
              }
            });
          }
        });
        this.$store.commit("pages/set_temp_id", {
          uid: this.data.uid,
          index: this.data.index,
          scoped_variable: 1
        });
      }
    },
    // Controller of saveToStargePane component
    attr_save_to_stage() {
      if (this.current_attribute_tab == "Native Attributes") {
        this.nativeAttrHandler();
      } else {
        this.attrHandler();
      }
    },
    // Controller of Transform handler
    transformHandler() {
      this.$store.dispatch("pages/addrs_finder_mutator", {
        uid: `${this.data.index}--${this.data.uid}`,
        fn: locator => {
          this.$store.commit("pages/update_section", {
            desc: `Updated Attributes ${locator}`,
            locator,
            scoped_variable: this.transformNewValue,
            exec_on_prop(prop, tag, scoped_variable, obj) {
              obj.properties["transform"] = scoped_variable;
            }
          });
        }
      });
      this.$store.commit("pages/set_temp_id", {
        uid: this.data.uid,
        index: this.data.index
      });
    },
    onTransformChange(val) {
      this.transformNewValue = val;
    },
    // Controller of text content
    textContentChange(val) {
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
      this.$store.commit("pages/set_temp_id", {
        uid: this.data.uid,
        index: this.data.index
      });
    },
    // Controller of custom inline style
    stateMonacoChanges() {
      this.monaco_trigger = !this.monaco_trigger;
    },
    monacoInlineCodeChange() {
      this.monacoInlineToggleMode = "opacity";
    }
  },
  components: {
    monacoInlineStyle: monaco_inlineStyle
  },
  mounted() {
    // text content default value assignment
    this.text_content = this.data.properties.text_content;

    // inline style default value assignment
    this.inlineStyle = this.data.inlineStyle;

    // inline code default value assignment
    this.inlineCode = this.data.inlineCode;

    // global attribute default value assignment
    const attr_parsedVanilaObj = objtifyConverter(
      this.attr,
      this.data.properties.attributes
    );
    this.attr = attr_parsedVanilaObj;

    // native attribute default value assignment
    this.attrToggleMode = "rerender";

    const nativeAttr_parsedVanilaObj = objtifyConverter(
      this._native_attributes_set_on_html_elements,
      this.data.properties.native_attributes
    );
    this.nativeAttr = nativeAttr_parsedVanilaObj;

    // when the user switchs or toggles to another tab not saving the data being input
    // to the previous tab, this code is responsible for not erasing the data being input
    // to the prev tab, because after it doesnt re renders the component on tab toggle.
    setTimeout(() => {
      this.attrToggleMode = "showhide";
    }, 0);
  }
};
</script>

<style >
</style>
