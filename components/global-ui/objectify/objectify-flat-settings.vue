<template>
  <div>
    <div>{{title}}</div>
    <!-- error -->
    <div v-if="validation_err" class="marginbottom050">
      <span class="err backgrounderr bordererr">
        <strong>Error:</strong>
        {{validation_err}}
      </span>
    </div>

    <!-- main -->
    <div
      :style="{
        borderTop:`1px solid ${options_defaults.borderColor}`, 
        borderLeft:`1px solid ${options_defaults.borderColor}`, 
        borderRight:`1px solid ${options_defaults.borderColor}`,
        background: options.bg
        }"
    >
      <div v-for="(objData,objIndex) in initial_object_data" :key="`--${objIndex}--}`">
        <div
          v-if="typeof renderProp == 'object' ? !renderProp.includes(objIndex) : true"
          :id="deleteSpace(objIndex)"
          class="flex"
        >
          <div
            :style="{borderBottom:`1px solid ${options_defaults.borderColor}`}"
            class="flex1 padleft025 flex"
          >
            <!-- key -->
            <div
              @mousemove="mv"
              @mouseenter="hoverKey = objIndex"
              @mouseleave="hoverKey = undefined"
              :class="[validation_target == objIndex ? 'err' : 'flex', options_defaults.padding,'flexwrap']"
            >
              <span class="pointer">{{objIndex}}</span>
              <!-- hover container -->
              <div class="relative">
                <div
                  v-if="hoverKey == objIndex && inputData[objIndex].hoverInfo"
                  :style="{
                  zIndex:100,
                  left:`${x - 20}px`,minWidth:'300px',
              maxWidth:'300px',
              boxShadow:`0 2px 15px ${$store.state.theme.global.secondary_bg_color}`,
              border: `2px solid ${$store.state.theme.global.secondary_border_color}`,
              borderRadius: '8px',
              ...$store.state.theme.global.page_modal_background
                }"
                  class="absolute pad025 padleft050 padright050"
                >{{inputData[objIndex].hoverInfo}}</div>
              </div>
            </div>
          </div>
          <div
            :style="{borderBottom:`1px solid ${options_defaults.borderColor}`,  borderLeft:`1px solid ${options_defaults.borderColor}`}"
            v-if="operation == 'r'"
            :class="['flex2' ,'padleft025', options_defaults.padding]"
          >{{objData}}</div>
          <div
            :style="{borderBottom:`1px solid ${options_defaults.borderColor}`,  borderLeft:`1px solid ${options_defaults.borderColor}`}"
            v-if="operation == 'rw'"
            class="flex2 padleft025"
          >
            <div :class="[options_defaults.padding]" v-if="inputData[objIndex].type == 'select'">
              <select
                v-on:change="change(initial_object_data[objIndex],objIndex)"
                v-model="initial_object_data[objIndex]"
                style="border:none; background:white; color:inherit"
                class="borderred fullwidth canceldef pointer"
              >
                <option
                  :class="[options_defaults.padding]"
                  v-for="opts in inputData[objIndex].options"
                  :key="opts"
                >{{opts}}</option>
              </select>
            </div>
            <div :class="[options_defaults.padding]" v-if="inputData[objIndex].type == 'string'">
              <input
                style="border:none;"
                v-on:change="change(initial_object_data[objIndex],objIndex)"
                v-model="initial_object_data[objIndex]"
                type="text"
                :class="[validation_target == objIndex ? 'err' : 'colorinherit', 'fullwidth','canceldef']"
              />
            </div>

            <div :class="[options_defaults.padding]" v-if="inputData[objIndex].type == 'number'">
              <input
                style="border:none;"
                v-on:change="change(initial_object_data[objIndex],objIndex)"
                v-model="initial_object_data[objIndex]"
                :step="inputData[objIndex].step"
                type="number"
                :class="[validation_target == objIndex ? 'err' : 'colorinherit', 'fullwidth','canceldef']"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax, TimelineLite, TweenLite } from "gsap";

export default {
  props: ["inputData", "title", "options", "operation", "bg"],
  data: () => ({
    initial_object_data: {},

    s_operation: "r", // read(r) and readwrite(rw)

    types: ["select", "number", "string"],
    operations: ["r", "rw"],

    options_defaults: {
      textColor: "inherit",
      borderColor: "gray",
      padding: undefined
    },

    text_model: undefined,
    text_change: undefined,

    validation_err: "",
    validation_target: undefined,

    x: undefined,
    y: undefined,

    hoverKey: undefined,

    has_render_condition: false,
    tobe_render: [],
    tobe_render_read_only: [],
    tobe_splice: undefined,
    tobe_render_old: [],
    render_controllers: []
  }),
  watch: {
    inputData() {
      // stage related, when traversing into stages
      this.$emit("onMounted", {
        options: this.options,
        initial: this.initial_object_data,
        data_passed: {
          data: this.inputData,
          options: this.options
        }
      });
      const render_obj = this.render({
        data: this.inputData,
        options: this.options,
        operation: this.operation,
        scoped_variables: {
          types: this.types,
          operations: this.operations
        }
      });

      if (this.options.padding) {
        switch (this.options.padding) {
          case "m":
            this.options_defaults.padding = "pad050";
            break;
          case "s":
            this.options_defaults.padding = "pad025";
            break;
          case "l":
            this.options_defaults.padding = "pad125";
            break;
        }
      }
      this.options_defaults.borderColor = this.options.borderColor;

      if (this.operation == "r") {
        this.initial_object_data = this.inputData;
      } else {
        this.initial_object_data = render_obj;
      }
    },
    tobe_splice(current, prev) {
      this.tobe_render_old = current;

      this.tobe_render.splice(this.tobe_render.indexOf(current), 1);
    }
  },
  computed: {
    renderProp() {
      if (this.tobe_render.length) {
        // return !this.tobe_render.includes(propkey)
        return this.tobe_render;
      } else {
        return true;
      }
    }
  },
  methods: {
    render({ data, options, operation, scoped_variables }) {
      const keys = Object.keys(data);
      const { operations, types } = scoped_variables;
      let final_obj = {};

      if (!operations.includes(operation)) {
        return this.$emit("onError", {
          Msg: `Unrecognize operation name "${operation}"`,
          Obj: data,
          Valid: operations,
          App: "objectfySingle",
          onMethod: "render"
        });
      }

      keys.map(key => {
        // render condition
        if (data[key].renderCondition) {
          if (!data[key].renderCondition.method(data)) {
            this.tobe_render.push(key);
            this.tobe_render_read_only.push(key);
            this.render_controllers = data[key].renderCondition.controllers;
          }
        }

        if (!types.includes(data[key].type)) {
          return this.$emit("onError", {
            Msg: `Unrecognize type found "${data[key].type}" on object key ${key}`,
            Obj: data[key],
            Valid: types,
            App: "objectfySingle",
            onMethod: "render"
          });
        } else {
          final_obj[key] =
            data[key].type == "select"
              ? data[key].options[data[key].default]
              : data[key].default;
        }
      });
      return final_obj;
    },
    deleteSpace(str) {
      return str
        .split(" ")
        .join()
        .replace(" ", "");
    },
    change(val, key) {
      // console.log('chnaged!')
      const output_data = this.initial_object_data;

      switch (this.inputData[key].type) {
        case "number":
          if (this.inputData[key].max < val) {
            this.validation_err = `The value of ${key} exceeds the defined maximum value of ${this.inputData[key].max}`;
            this.validation_target = key;
          } else if (this.inputData[key].min > val) {
            this.validation_err = `The value of ${key} is lesser than the defined minimum value of ${this.inputData[key].min}`;
            this.validation_target = key;
          } else {
            this.validation_target = undefined;
            this.validation_err = "";
            this.$emit("onChange", output_data);
          }
          break;
        case "string":
          const validationSet = new Set([
            "minChar",
            "maxChar",
            "allowSpecialChars",
            "allowWhiteSpace"
          ]);
          const copy = this.inputData;

          const stringValidation = {
            minChar(val, arg, err) {
              if (val.length > arg.minChar) {
                return {
                  status: true
                };
              } else {
                err({
                  Msg: `Character length is lesser than the defined minimum of ${arg.minChar} characters required`,
                  App: "objectfySingle",
                  onMethod: "change"
                });
                return {
                  status: false,
                  msg: `Character length is lesser than the defined minimum of ${arg.minChar} characters required`
                };
              }
            },
            maxChar(val, arg, err) {
              if (val.length < arg.maxChar) {
                return {
                  status: true
                };
              } else {
                err({
                  Msg: `Character length is greater than the defined maximum character required`,
                  App: "objectfySingle",
                  onMethod: "change"
                });
                return {
                  status: false,
                  msg:
                    "Character length is greater than the defined maximum character required"
                };
              }
            },
            allowSpecialChars(val, arg, err) {
              if (!arg.allowSpecialChars) {
                const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
                if (regex.exec(val) != null) {
                  err({
                    Msg: `Special character detected`,
                    App: "objectfySingle",
                    onMethod: "change"
                  });
                  return {
                    status: false,
                    msg: "Special character detected"
                  };
                } else {
                  return {
                    status: true
                  };
                }
              }
            },
            allowWhiteSpace(val, arg, err) {
              if (!arg.allowWhiteSpace) {
                if (val.indexOf(" ") != -1) {
                  err({
                    Msg: `White space detected`,
                    App: "objectfySingle",
                    onMethod: "change"
                  });
                  return {
                    status: false,
                    msg: "White space detected"
                  };
                } else {
                  return {
                    status: true
                  };
                }
              }
            }
          };

          const final = Object.keys(this.inputData[key]).map(e => {
            if (validationSet.has(e)) {
              const exec = stringValidation[e](val, this.inputData[key], err =>
                this.$emit("onError", err)
              );
              if (exec) {
                if (!exec.status) {
                  this.validation_target = key;
                  return (this.validation_err = exec.msg);
                }
              }
            }
          });

          if (final.every(e => (e == undefined ? true : false))) {
            this.validation_err = "";
            this.validation_target = undefined;
            this.$emit("onChange", output_data);
          }
          break;
        case "select":
          const current_items_not_being_rendered = this.tobe_render_read_only; // ['fromaction']
          const controllers_for_items_not_yet_rendered = this
            .render_controllers; // ['type','formtarget']

          const check_render_condition = (
            full_schema,
            hidden_prop,
            current_selected_value
          ) => {
            let response;

            // 1. locate prop from schema and extract controllers
            const controllers_array =
              full_schema[hidden_prop].renderCondition.controllers;

            // 2.   controllers are just a property of the fullschema
            // 2.a  mutate the controllers default value by the passed current_selected_value
            // 2.b  run renderCondition if it satisfies the condition return true else return false
            if (controllers_array) {
              controllers_array.map(controller => {
                //
                current_selected_value =
                  current_selected_value == "true"
                    ? true
                    : current_selected_value;

                current_selected_value =
                  current_selected_value == "false"
                    ? false
                    : current_selected_value;

                //
                if (full_schema[controller].options.includes(current_selected_value)) {
                  // mutating full schma default value
                  full_schema[controller].default = full_schema[controller].options.indexOf(current_selected_value);

                  // run render condition
                  response = full_schema[hidden_prop].renderCondition.method(full_schema);
                }
              });
            } else {
              return {
                status: "err",
                Msg: `Cannot find controllers`,
                App: "objectfySingle",
                onMethod: "renderCondition"
              };
            }
            //
            return response;
          };

          // routine, always executes the renderCondition method each time select value changed
          // each time the renderCondition method executes it mutates the current
          if (this.tobe_render_read_only.length != 0) {
            // console.log('this', '')
            current_items_not_being_rendered.map((prop_name, prop_index) => {
              console.log('one')
              const res = check_render_condition(
                this.inputData,
                prop_name,
                val,
              );
              if (typeof res == "boolean" && res === true) {
                // splice
                this.tobe_render.splice(this.tobe_render.indexOf(prop_name), 1);
                const el = prop_name
                  .split(" ")
                  .join()
                  .replace(" ", "");

                // animation bg
                setTimeout(() => {
                  const n = document.getElementById(el);
                  TweenMax.fromTo(
                    n,
                    1.5,
                    { backgroundColor: "#FFBF00", ease: Power1.easeIn },
                    { backgroundColor: "auto", delay: 1, ease: Power1.easeIn }
                  );
                }, 0);
              } else if (res === false) {
                // check if prop_name exist then push the prop name
                // this makes the prop hidded
                console.log(prop_name, '-- prop_name')
                console.log(this.tobe_render)
                if (!this.tobe_render.includes(prop_name)) {
                  this.tobe_render.push(prop_name);
                }
              }
            });
          } else {
            // get click origin and condition origin
            let click_origin;
            let render_con_origin = [];
            for (let objkey in this.inputData) {
              const prop_has_renderCondition = this.inputData[objkey]
                .renderCondition;
              if (prop_has_renderCondition) {
                render_con_origin.push(objkey);
                prop_has_renderCondition.controllers.map(cntrls => {
                  if (this.inputData[cntrls].options.indexOf(val) != -1) {
                    click_origin = cntrls;
                  }
                });
              }
            }

        

            // mutate
            if (this.inputData[click_origin]) {
              this.inputData[click_origin].default = this.inputData[
                click_origin
              ].options.indexOf(val);

              render_con_origin.map(names => {
                let renderCondition_res = this.inputData[
                  names
                ].renderCondition.method(this.inputData);

                if (
                  typeof renderCondition_res == "boolean" &&
                  renderCondition_res == false
                ) {
                  if (!this.tobe_render.includes(names)) {
                    this.tobe_render.push(names);
                    this.tobe_render_read_only.push(names);
                  }
                }
              });
            }
          }

          this.$emit("onChange", output_data);
          break;
      }
    },
    mv($event) {
      let o_left = $event.layerX;
      let o_top = $event.layerY;

      this.x = o_left;
      this.y = o_top;
    }
  },
  created() {
    this.s_operation = this.operation;
  },
  mounted() {
    this.$emit("onMounted", {
      options: this.options,
      initial: this.initial_object_data,
      data_passed: {
        data: this.inputData,
        options: this.options
      }
    });
    const render_obj = this.render({
      data: this.inputData,
      options: this.options,
      operation: this.operation,
      scoped_variables: {
        types: this.types,
        operations: this.operations
      }
    });

    if (this.options.padding) {
      switch (this.options.padding) {
        case "m":
          this.options_defaults.padding = "pad050";
          break;
        case "s":
          this.options_defaults.padding = "pad025";
          break;
        case "l":
          this.options_defaults.padding = "pad125";
          break;
      }
    }
    this.options_defaults.borderColor = this.options.borderColor;

    if (this.operation == "r") {
      this.initial_object_data = this.inputData;
    } else {
      this.initial_object_data = render_obj;
    }
  }
};
</script>

<style>
</style>