<template>
  <div class="fullwidth flex flexcol pad125">
    <div class="fullheight-percent">
      <MonacoEditor
        v-if="ready"
        v-show="show"
        v-model="code"
        language="css"
        class="dq_mystylesheet_ed fullheight-percent"
        editorMounted="e_mounted"
        theme="vs-dark"
        :options="options"
        @change="onChange"
      />
    </div>
    <div
      :style="{background: $store.state.theme.global.secondary_bg_color}"
      class="pad025 flex flexend"
    >
      <span
        @mouseover="hover= true"
        @mouseleave="hover= false"
        :style="{
          background:$store.state.theme.global.primary_bg_color,  
          color: hover ?  $store.state.theme.global.light_text_color :  $store.state.theme.global.secondary_text_color,
          transition: '0.3s'}"
        @click="save"
        class="pad025 padright050 padleft050 pointer"
      >
        <strong>save custom css</strong>
      </span>
    </div>
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  data: () => ({
    /* write your custom style below */
    code: `/* write your custom CSS style below */\n\n`,
    changed_code: undefined,
    ready: false,
    show: false,
    options: {},

    hover: false
  }),
  methods: {
    onChange(value) {
      this.changed_code = value;
    },
    save() {
      if (this.changed_code != undefined) {
        this.ready = false;
        this.show = false;
        this.$store
          .dispatch("systemCall", {
            command: "updateCustomStyleSheet",
            section: "pageMethods",
            method: "post",
            data: this.changed_code
          })
          .then(({ status, data }) => {
            if (status) {
              this.ready = true;
              this.show = true;

              this.$store
                .dispatch("systemCall", {
                  command: "getCss",
                  section: "pageMethods",
                  method: "get"
                })
                .then(({ status, data }) => {
                  if (status) {
                    this.$store.commit("pages/set_css_class", data.payload);
                  } else {
                    this.$store.commit("modal/set_modal", {
                      head: "Error while fetching editor data",
                      body: data.msg,
                      config: {
                        ui_type: "err",
                        closable: false
                      }
                    });
                  }
                });


            } else {
              this.$store.commit("modal/set_modal", {
                head: "Error while fetching editor data",
                body: data.msg,
                config: {
                  ui_type: "err",
                  closable: false
                }
              });
            }
          });
      }
    }
  },
  components: {
    MonacoEditor
  },
  mounted() {
    setTimeout(() => {
      this.ready = true;
      setTimeout(() => {
        this.ready = false;
      }, 0);

      setTimeout(() => {
        // fetch inline code here
        // make system call here

        this.$store
          .dispatch("systemCall", {
            command: "getMyCustomStyleSheet",
            section: "pageMethods",
            method: "get"
          })
          .then(({ status, data }) => {
            if (status) {
              // assign code here
              this.ready = true;
              this.show = true;
              this.code = data.payload;
            } else {
              this.$store.commit("modal/set_modal", {
                head: "Error while fetching editor data",
                body: data.msg,
                config: {
                  ui_type: "err",
                  closable: false
                }
              });
            }
          });
      }, 200);
    }, 0);
  }
};
</script>

<style>
</style>
