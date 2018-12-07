<template>
  <div class="borderred fl shellbody shell-textcolor-user">
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
      <div id="cli-output">{{ current_stack[index].body }}</div>
      <!-- end cli output -->
    </div>
    <!-- end terminal output trace -->
    <!-- terminal input -->
    <div class="flex relative">
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
    if(mode == 'up'){
      this.command_history_count++
      if(this.command_history_count == this.current_stack.length){
        this.command_history_count = 0        
      }
    }

    if(mode == 'down'){
      this.command_history_count--
      if(this.command_history_count == -1){
        this.command_history_count = this.current_stack.length - 1
      }
    }
      this.user_input = this.current_stack[this.command_history_count].command

      
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
              token: this.token
            })
            .then(res => {
              setTimeout(() => {
                this.response_handler(res);
              }, 10);
            })
            .catch(e => {
              alert(e);
            });
          this.user_input = "";
          document.getElementById("shell-input").focus();
        }
      }
    }
  },
  mounted() {
    // focus input
    document.getElementById("shell-input").focus();

    this.input_visible = true;
    // assign pane title
    this.$store.commit("assign_pane_title", "@marven yeah!");

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
.shellbody {
  background-color: #232729;
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
.fl {
  height: 97%;
}
#inp_mask {
  background-color: wheat;
  width: 100%;
  height: 100%;
  background-color: #232729;
}
</style>:


