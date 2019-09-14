<template>
  <div>
    <div>{{title}}</div>
    <div v-if="validation_err" class="marginbottom050">
      <span class="err backgrounderr bordererr">
        <strong>Error:</strong>
        {{validation_err}}
      </span>
    </div>
    <div
      :style="{borderTop:`1px solid ${options_defaults.borderColor}`, borderLeft:`1px solid ${options_defaults.borderColor}`, borderRight:`1px solid ${options_defaults.borderColor}`}"
    >
      <div class="flex" v-for="(objData,objIndex) in initial_object_data" :key="`--${objIndex}--}`">
        <div
          :style="{borderBottom:`1px solid ${options_defaults.borderColor}`}"
          class="flex1 padleft025 flex"
        >
          <!-- key -->
          <div
            :class="[validation_target == objIndex ? 'err' : 'flex', options_defaults.padding,'flexwrap']"
          >{{objIndex}}</div>
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
</template>

<script>
export default {
  props: ["inputData", "title", "options", "operation"],
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
    validation_target: undefined
  }),
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
    change(val, key) {
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
              if (!exec.status) {
                this.validation_target = key;
                return (this.validation_err = exec.msg);
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
          this.$emit("onChange", output_data);
          break;
      }
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