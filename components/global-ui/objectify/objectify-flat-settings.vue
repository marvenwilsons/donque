<template>
  <div>
    <debug :data="{entries_with_render_conditions,final_model,hidden_entries,raw_data_set}"></debug>

    <!-- view start here -->
  <div>
    <h6>{{config.title}}</h6>
    <p>{{config.sub_title_description_text}}</p>
  </div>

    <div class="bordergray">
      <div>
        <div
          class="flex flexcol"
          v-for="(obj_key,obj_index) in final_model"
          :key="`-o-${obj_index}`"
        >
          <div class="flex">
            <div
              :id="`objectify-${obj_index}`"
              role="display object index"
              class="flex1 bordergray flexcenter pad025 pointer flexwrap"
            >{{obj_index}}</div>
            <div role="display object value" class="flex3 bordergray flex flexcenter">
              <div
                class="fullwidth"
                @onChange="data_change"
                :_key="obj_index"
                :data="obj_key"
                v-if="obj_key.type == 'string'"
                :is="'str'"
              ></div>
              <div
                class="fullwidth"
                @onChange="data_change"
                :_key="obj_index"
                :data="obj_key"
                v-if="obj_key.type == 'number'"
                :is="'num'"
              ></div>
              <div
                class="fullwidth"
                @onChange="data_change"
                :_key="obj_index"
                :data="obj_key"
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
    <div v-if="config.submit_button" class="margintop125 flex flexend">
      <button class="dq-button">{{config.submit_button}}</button>
    </div>
  </div>
</template>

<script>
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
    }
  },
  data: () => ({
    raw_data_set: undefined,
    has_initial_input: false,
    err: undefined,
    err_key: undefined
  }),

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
      if (!err) {
        const positive_entry = this.find_key_controllers_on_entries(
          key,
          this.raw_data_set
        );

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

          this.err = err;
          this.err_key = key;
          this.$emit('onError', {
            err,
            key,
            data
          })
        }
      }
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