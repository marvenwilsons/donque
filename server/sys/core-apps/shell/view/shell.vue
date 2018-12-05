<template>
  <div class="borderred fl shellbody shell-textcolor-user">
    <div class v-if="current_stack.length != 0" v-for="(stack,index) in current_stack" :key="index">
      <div class="flex">
        <div
          class="shell-textcolor-currentuser"
        >{{user_group}}@{{current_user}}({{current_class != 'fs' ? class_trace[index] : 'fs'}}):~$</div>
        <span id="shell-trace">{{current_stack[index]}}</span>
      </div>
      <div
        id="cli-output"
        v-if="current_output_stack.length != 0 && output_index == index"
        v-for="(output, output_index) in current_output_stack"
        :key="output_index"
      >{{current_output_stack[index]}}</div>
    </div>
    <div class="flex relative">
      <div v-if="!input_visible" id="inp_mask" class="absolute"></div>
      <div
        class="shell-textcolor-currentuser"
      >{{user_group}}@{{current_user}}({{class_trace[current_index]}}):~$</div>
      <input id="shell-input" @keyup.enter="submit" v-model="user_input" type="text">
    </div>
  </div>
</template>
<script>
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
      class_trace: [],
      before_Err_class: undefined,
      command_history: [],
      token: "iasdgjkfgui23498629834"
    };
  },
  methods: {
    submit() {
      if (this.user_input == "clear") {
        this.current_stack = [];
        this.current_output_stack = [];
        this.user_input = "";
      } else {
        if (this.user_input == "" || this.user_input == " ") {
          this.current_stack.push(" ");
          this.current_output_stack.push(" ");
        } else {
          this.input_visible = false;
          this.current_stack.push(this.user_input);
          this.command_history.push(this.user_input);
          this.$axios
            .$post("/dq/dqcli", {
              data: `use ${this.current_class} ${this.user_input}`,
              token: this.token
            })
            .then(res => {
              if (res.response.class == undefined) {
                  console.log("ERROR class is missing in response object")
              }
              this.current_output_stack.push(res.response.body);
              this.current_class = res.response.class;
              this.class_trace.push(res.response.class);
              this.input_visible = true;
            });
          this.user_input = "";
          document.getElementById("shell-input").focus();
        }
      }
      this.current_index++;
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
    this.$axios.$post("/dq/dqcli", { data: "use fs _clear", token: this.token }).then(res => {
      this.current_class = res.response.class;
      this.class_trace.push(res.response.class);
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


