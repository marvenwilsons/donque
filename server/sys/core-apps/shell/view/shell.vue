<template>
  <div class="flex f1 flexcol shellbody shell-textcolor-user">
    <!-- terminal output trace -->
    <div class v-if="current_stack.length != 0" v-for="(stack,index) in current_stack" :key="index">
      <!-- indicator -->
      <div class="flex">
        <div
          class="shell-textcolor-currentuser"
        >{{user_group}}@{{current_user}}({{ current_stack[index > 0 ? index - 1 : index].class }}):~$</div>
        <span
          id="shell-trace"
        >{{current_stack[index].command}} {{current_stack[index].arguments_string}}</span>
      </div>
      <!-- end indicator -->
      <!-- cli output -->
      <div
        class="terminal-output-err-indicator-wrapper"
        v-if="current_stack[index].uitype != null"
        id="cli-output"
        :is="current_stack[index].uitype"
        :val="current_stack[index].body"
        :selfClass="current_stack[index].class"
      ></div>
      <div id="cli-output" v-if="current_stack[index].uitype == null">{{current_stack[index].body}}</div>
      <!-- end cli output -->
    </div>
    <!-- end terminal output trace -->
    <!-- terminal input -->
    <div  class="flex relative">
      <div v-if="!input_visible" id="inp_mask" class="absolute"></div>
      <div class="shell-textcolor-currentuser">{{user_group}}@{{current_user}}({{current_class}}):~$</div>
      <input
        @keyup.up="getcmdhistory('up')"
        @keyup.down="getcmdhistory('down')"
        id="shell-input"
        @keyup.enter="submit"
        v-model="user_input"
        type="text"
      >
    </div>
    <!-- end terminal input -->
  </div>
</template>
<script>
import arrayList from "../server/ui library/arrayList.vue";
import prompt from "../server/ui library/prompt.vue";
import selection from "../server/ui library/selection.vue";
import tableObject from "../server/ui library/tableObject.vue";
import err from "../server/ui library/err.vue";
import normal from "../server/ui library/normal.vue";

export default {
  data() {
    return {
      user_input: undefined,
      user_group: "marven",
      current_user: "marven",
      current_stack: [],
      current_output_stack: [],
      input_visible: false,
      current_index: 0,
      current_class: "fs",
      command_history: [],
      command_history_count: -1,
      token: "iasdgjkfgui23498629834"
    };
  },
  methods: {
    getcmdhistory(mode) {
      if (this.current_stack.length != 0) {
        let farr = this.current_stack.filter(el => el.body);

        if (mode == "up") {
          this.command_history_count++;
          if (this.command_history_count == farr.length) {
            this.command_history_count = 0;
          }
        }

        if (mode == "down") {
          this.command_history_count--;
          if (this.command_history_count == -1) {
            this.command_history_count = farr.length - 1;
          }
        }
        this.user_input = farr[this.command_history_count].command;
      }
    },
    response_handler(res) {
      // this.current_stack.push(res.response);
      this.current_class = res.response.class;
      this.current_stack.splice(this.current_index - 1, 1, res.response);
      this.input_visible = true;
    },
    submit() {
      this.current_index++;
      if (`${this.user_input}`.trim() == "clear") {
        this.current_index = 0;
        this.current_stack = [];
        this.user_input = "";
      } else {
        if (this.user_input == "".trim() || this.user_input == undefined) {
          this.current_stack.push({
            body: "",
            class: this.current_class
          });
        } else {
          this.input_visible = false;

          this.current_stack.push({
            arguments_array: null,
            command: this.user_input,
            body: "waiting..",
            class: this.current_class,
            uitype: null
          });

          this.$axios
            .$post("/dq/dqcli", {
              data: `use ${this.current_class} ${this.user_input}`,
              nested_mode: false,
              token: this.token
            })
            .then(res => {
              setTimeout(() => {
                this.response_handler(res);
              }, 20);
            })
            .catch(e => {
              this.current_stack.push({
                arguments_array: null,
                command: this.user_input,
                body: e,
                class: this.current_class,
                uitype: "err"
              });
            });
          this.user_input = "";
          document.getElementById("shell-input").focus();
        }
      }
    },
    fucosOn() {
      document.getElementById("shell-input").focus();
    }
  },
  components: {
    arrayList,
    prompt,
    selection,
    tableObject,
    err,
    normal
  },
  mounted() {
    // focus input
    this.fucosOn();

    // user can type
    this.input_visible = true;
    
    // set pane attr
    this.$store.commit("assign_pane_title", "@marven yeah!");
    this.$store.commit("pane_is_closable",false)

    // init call
    // important: get the token from the local storage that is saved during login and trace that token to db, get user group and user associated with that token
    this.$axios
      .$post("/dq/dqcli", { data: "use fs _clear", token: this.token })
      .then(res => {
        if (res.response.body != "") {
          this.current_stack.push(res.response);
        }
      })
      .catch(e => {
        console.log(e);
        this.current_output_stack.push(e);
      });
  }
};
</script>

<style>
@import url("@/server/sys/admin assets/css/normalize.css");
@import url("@/server/sys/admin assets/css/tana 0.2.css");

:root {
  --bgColor:#414446;
  --ln: 1.5rem;
}

.shellbody {
  background-color: var(--bgColor);
  min-height: inherit;
}
.shell-textcolor-user {
  color: white;
}
#shell-trace {
  font-family: monospace;
}
.shell-textcolor-currentuser {
  color: #5be616;
  font-weight: bold;
  padding-left: 5px;
  padding-right: 10px;
  font-family: monospace;
}
#shell-input {
  background: none;
  border: none;
  color: white;
  width: 100%;
  font-family: monospace;
  caret-shape: underscore;
}
#shell-input:focus {
  border-style: none;
  outline: none;
}
#cli-output {
  margin-left: 5px;
}
#inp_mask {
  background-color: wheat;
  width: 100%;
  height: 100%;
  background-color: var(--bgColor);
}
</style>:


