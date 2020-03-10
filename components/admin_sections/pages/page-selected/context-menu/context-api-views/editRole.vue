<template>
  <div class="fullwidth pad125">
    <div :style="{border: `1px solid ${$store.state.theme.global.border_color}`}">
      <div
        :style="{
          background:`${$store.state.theme.global.secondary_bg_color}`,
          }"
        class="pad050 spacebetween flex st-viz-bnnr"
      >
        <strong>Section Role</strong>
      </div>
      <div class="pad125">
        <input
          v-model="cur_role"
          id="dq-page-cntx-sec-role-edit"
          class="fullwidth margintop125 marginbottom125 pad025"
          type="text"
        />
        <div
          v-if="sec_err"
          class="err bordererr backgrounderr marginbottom125 pad025 padleft050"
        >{{sec_err}}</div>
        <div
          @click="validate"
          v-if="data.role != cur_role"
          class="flex flexend pointer"
        >stage changes</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["uid", "data", "path"],
  data() {
    return {
      cur_role: undefined,
      sec_err: undefined
    };
  },
  methods: {
    validate() {
      if (this.cur_role) {
        // validate len
        if (this.cur_role.length > 25) {
          return (this.sec_err =
            "Error: section role must not exceed 25 characters");
        } else {
          this.sec_err = undefined;
        }

        // validate val if there is no character and only spaces
        if (this.cur_role.trim() == "") {
          return (this.sec_err =
            "Error: section role must have valid characters");
        } else {
          this.sec_err = undefined;
        }
      } else if (!this.cur_role) {
        // validate val 2
        return (this.sec_err = "Error: section role is required");
      } else {
        this.sec_err = undefined;
      }

      if (this.sec_err == undefined) {
        this.$store.dispatch("pages/addrs_finder_mutator", {
          uid: `${this.data.index}--${this.data.uid}`,
          fn: locator => {
            this.$store.commit("pages/update_section", {
              desc: `Edited section role: ${locator.join(" > ")}`,
              locator,
              scoped_variable: this.cur_role,
              exec_on_prop: function(prop, tag, scoped_variable, obj) {
                obj.role = scoped_variable;
              }
            });
          }
        });
      }
    }
  },
  mounted() {
    document.getElementById("dq-page-cntx-sec-role-edit").focus();
    this.cur_role = this.data.role;
  }
};
</script>