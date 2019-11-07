<template>
<!-- @Objectify html -->
  <div class="relative">
    <!-- <debug :data="{entries_with_render_conditions,final_model,final_vanilla,hidden_entries,raw_data_set}"></debug> -->

    <!-- modal -->
    <div v-if="config.show_modal"  class="absolute fullwidth fullheight-percent flex flexcenter">
      <div :style="{background:`${appearance.modal_overlay_bg}`,opacity:'0.5'}" class="absolute fullwidth fullheight-percent"></div>
      <div style="z-index:100" class="flex1 fullheight-percent flex flexcenter" >
        <slot name="modal"></slot>
      </div>
    </div>

    <!-- view start here -->
  <div>
    <h6 v-if="config.title" :style="{color: appearance.title_text_color}">{{config.title}}</h6>
    <p v-if="config.sub_title_description_text" :style="{color: appearance.sub_title_description_text_color}" >{{config.sub_title_description_text}}</p>
  </div>

    <div :style="{border: `1px solid ${appearance.wrap_around_border_color}`}">
      <div>
        <div
          class="flex flexcol"
          v-for="(obj_key,obj_index) in final_model"
          :key="`-o-${obj_index}`"
        >
          <div class="flex">
            <!-- keys -->
            <div
              :id="`objectify-${obj_index}`"
              role="display object index"
              class="flex1  flexcenter pad025 pointer flexwrap"
              :style="get_keys_style"
              :title="obj_key.hoverInfo"
            >{{obj_index}}</div>
            <div :style="{borderRight: `1px solid ${appearance.divider_border_color}`}" ></div>
            <!-- value -->
            <div  :style="get_value_style"  role="display object value" class="flex3  flex flexcenter">
              <div :style="{color: get_value_style.color}" class="fullwidth padleft025" v-if="config.operation == 'r'">
                {{obj_key}}
              </div>
              <div
                class="fullwidth"
                @onChange="data_change"
                :_key="obj_index"
                :data="obj_key"
                v-if="obj_key.type == 'string'"
                :is="'str'"
                :color="get_value_style"
              ></div>
              <div
                class="fullwidth"
                @onChange="data_change"
                :_key="obj_index"
                :data="obj_key"
                v-if="obj_key.type == 'number'"
                :is="'num'"
                :color="get_value_style"
              ></div>
              <!-- @Objectify select usage -->
              <div
                class="fullwidth"
                @onChange="data_change"
                :_key="obj_index"
                :data="obj_key"
                :appearance="{
                  background: 'white',
                  color: 'black',
                  background_selected: appearance.background_selected,
                  select_arrow_down_color: appearance.select_arrow_down_color
                }"
                v-if="obj_key.type == 'select'"
                :is="'sel'"
              ></div>
            </div>
          </div>
          <div v-if="err_key == obj_index" class="pad050">
            <div class="backgrounderr pad050 err">Error: Invalid {{err_key}} - {{err}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="config.submit_button && change_occurs" class="margintop125 flex flexend">
      <button :style="get_button_style" @click="submit" class="dq-button">{{config.submit_button}}</button>
    </div>
  </div>
</template>

<script>
// @Objectify JS

import num from "./number.vue";
import str from "./string.vue";
import sel from "./select.vue";

export default {
  props: ["config", "appearance"],
  components: { num, str, sel },
  computed: {
    /**
     * return type Object
     * convert the schema into vanilla object
     */
    normalize_data_set() {
      return this.raw_data_set;
    },
    /**
     * return type Array
     * Scans the schema with render condition and returns an array of keys
     */
    entries_with_render_conditions() {
      let arr = [];

      for (let key in this.raw_data_set) {
        if (this.raw_data_set[key]["renderCondition"]) {
          arr.push(key);
        }
      }

      return arr;
    },
    /**
     * returns an array
     * scans the schema, returns an array of keys of entries that should be hidden
     */
    hidden_entries() {
      let r = [];

      this.entries_with_render_conditions.map(keys => {
        const condition_result = this.normalize_data_set[
          keys
        ].renderCondition.method(this.normalize_data_set);
        if (!condition_result) {
          r.push(keys);
        }
      });

      return r;
    },

    // final model
    final_model() {
      let r = {};
      // dont include entries that is included in the hidden entries
      for (let key in this.normalize_data_set) {
        if (!this.hidden_entries.includes(key)) {
          r[key] = this.normalize_data_set[key];
        }
      }

      return r;
    },
    // final vanilla 
    final_vanilla() {
      let f = {}

      for(let key in this.final_model) {
        const t = this.final_model[key].type
        if(t == 'string' || t == 'number') {
          f[key] = this.final_model[key].default
        } else if(t == 'select') {
          f[key] = this.final_model[key].options[this.final_model[key].default]
        } 
      }

      return f
    },
    
    // button style
    get_button_style() {
      return {
        background: this.appearance.button_bg_color,
        color: this.appearance.button_text_color
      }
    },

    // keys style
    get_keys_style() {
      return {
        borderBottom: `1px solid ${this.appearance.divider_border_color}`,
        minWidth: '140px',
        background:this.appearance.keys_bg_color,
        color: this.appearance.keys_text_color
      }
    },

    // value style
    get_value_style() {
      return {
        borderBottom: `1px solid ${this.appearance.divider_border_color}`,
        background: this.appearance.values_bg_color,
        color: this.appearance.values_text_color
      }
    }
  },
  data: () => ({
    raw_data_set: undefined,
    has_initial_input: false,
    err: undefined,
    err_key: undefined,
    change_occurs: false
  }),
  watch: {
    final_vanilla(current,prev) {
      //
      this.$emit('onChange',  current)
    }
  },
  methods: {
    find_key_controllers_on_entries(key, data_set) {
      let entry = [];
      let _key = key;

      for (let key in data_set) {
        if (data_set[key].renderCondition) {
          if (_key) {
            if (data_set[key].renderCondition.controllers.includes(_key)) {
              entry.push(key);
            }
          }
        }
      }

      return entry;
    },
    data_change({ err, data, key }) {
      if(!this.change_occurs){
        this.change_occurs = true
      }


      if (!err) {
        // change default value to final model
        this.final_model[key].default = data;

        //
        if (!this.has_initial_input) {
          this.has_initial_input = true;
        }

        //
        this.err = undefined;
        this.err_key = undefined;

        document.getElementById(`objectify-${key}`).classList.remove("err");
          document
            .getElementById(`objectify-${key}`)
            .classList.remove("backgrounderr");

      } else {
        // show err
        if (this.has_initial_input) {
          document.getElementById(`objectify-${key}`).classList.add("err");
          document
            .getElementById(`objectify-${key}`)
            .classList.add("backgrounderr");

          // triggers the real time error infomation to show the error
          this.err = err;
          this.err_key = key;

          // emit on error event
          this.$emit('onError', {
            err,
            key,
            data
          })
        }
      }
    },
    submit() {
      this.$emit('onSubmit', this.final_vanilla)
    }
  },
  mounted() {
    this.raw_data_set = this.config.data;
  }
};
</script>

<style>
.debugwin {
  overflow: auto;
  max-width: 300px;
}
</style>