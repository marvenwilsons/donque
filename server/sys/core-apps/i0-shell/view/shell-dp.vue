<template>
  <div
    id="dq-shellHolder"
    class="flex f1 flexcol shellbody relative shell-textcolor-user"
  >
  <!-- <span class="test">
    {{fs_path_history}}
    {{current_index}}  
  </span> -->
    <!-- <button @click="scrollDown">down</button> -->
    <span id="dq-shell" class="absolute fullwidth">
      <!-- terminal output trace -->
      <div
        :id="`dq-ter-result-${index}`"
        v-if="current_stack.length != 0"
        v-for="(stack,index) in current_stack"
        :key="index"
      >
        <!-- indicator -->
        <div class="flex">
          <div
            class="shell-textcolor-currentuser"
          >{{user_group}}@{{current_user}}({{ current_stack[index > 0 ? index - 1 : index].class }}):~<span>{{fs_path_history[index]}}{{index}} </span>$</div>
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
        <div
          id="cli-output"
          v-if="current_stack[index].uitype == null"
        >{{current_stack[index].body}}</div>
        <!-- end cli output -->
      </div>
      <!-- end terminal output trace -->
      <!-- terminal input -->
      <div id="dq-terminal-wrapper" class="flex flexcol relative">
        <span class="flex">
          <div v-if="!input_visible" id="inp_mask" class="absolute"></div>
          <div
            class="shell-textcolor-currentuser"
          >{{user_group}}@{{current_user}}({{current_class}}):~<span>{{current_fs_path}}</span>$</div>
          <input
            @keyup.up="getcmdhistory('up')"
            @keyup.down="getcmdhistory('down')"
            id="shell-input"
            @keyup.enter="submit"
            v-model="user_input"
            type="text"
          >
        </span>
        <span id="dq-btm-spacer" class="" ></span>
      </div>
      <!-- end terminal input -->
    </span>
  </div>
</template>
<script>
import arrayList from "../server/ui library/arrayList.vue";
import prompt from "../server/ui library/prompt.vue";
import selection from "../server/ui library/selection.vue";
import tableObject from "../server/ui library/tableObject.vue";
import err from "../server/ui library/err.vue";
import normal from "../server/ui library/normal.vue";
import clear from "../server/ui library/clear.vue"

export default {
  data() {
    return {
      user_input: undefined,
      current_input: undefined,
      user_group: "marven",
      current_user: "marven",
      current_stack: [],
      current_output_stack: [],
      input_visible: false,
      current_index: 0,
      current_class: "fs",
      command_history: [],
      command_history_count: -1,
      fs_path_history:[],
      current_fs_path: undefined,
      token: "iasdgjkfgui23498629834",
      shell: undefined,
      clientHeight: undefined,
      cleard: false
    };
  },
  methods: {
    scrollDown() {
      let shellbody = document.getElementById("dq-shell");
      let shellHolder = document.getElementById("dq-shellHolder");

      setTimeout(() => {
        shellHolder.scrollTop = shellbody.scrollHeight + 1;
      }, 5);
    },
    getcmdhistory(mode) {
      this.scrollDown();
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
      let u_inp = this.current_input.replace('cd','')

      if(res.response.err == false && res.response.class == 'fs' && res.response.command == 'cd'){
        this.fs_path_history.push(res.response.body)
        this.current_fs_path = res.response.body

        res.response.arguments_string = u_inp

        res.response.body = ""
      }else{
        if(!res.response.err){
          res.response.arguments_string = u_inp
          this.fs_path_history.push(this.current_fs_path)
        }else{
          res.response.arguments_string = u_inp
          this.fs_path_history.push(this.current_fs_path)
        }
      }

      this.current_class = res.response.class;
      this.current_stack.splice(this.current_index - 1, 1, res.response);
      this.input_visible = true;
      this.scrollDown();

      if(this.cleard){
        console.log(document.getElementById(x).clientHeight)

        let x = `dq-ter-result-${this.current_stack.length - 1}`
        let z = document.getElementById(x).clientHeight  + 38
        document.getElementById("dq-btm-spacer").style.paddingTop = `${this.clientHeight -= z}px`
        // console.log(document.getElementById("dq-btm-spacer").style.paddingTop)
      }

    },
    submit() {
      this.current_input = this.user_input
      this.scrollDown();

      this.current_index++;

      // clear
      if (`${this.user_input}`.trim() == "clear") {
        // add space to the bottom do not empty the array you idiot
        // padding top
        document.getElementById("dq-btm-spacer").style.paddingTop = `${document.getElementById("dq-shellHolder").clientHeight - 25}px`
        this.clientHeight = document.getElementById("dq-shellHolder").clientHeight - 25
        this.cleard = true
        this.current_stack.push({
            arguments_array: null,
            command: this.user_input,
            body: "",
            class: this.current_class,
            uitype: 'clear'
          })
        this.user_input = "";
      } else {
        if (this.user_input == "".trim() || this.user_input == undefined) {
          this.current_stack.push({
            body: "",
            class: this.current_class
          });
        this.fs_path_history.push(this.current_fs_path)
        } else {
          //
          this.input_visible = false;
          
          // waiting for response
          this.current_stack.push({
            arguments_array: null,
            command: this.user_input,
            body: "waiting..",
            class: this.current_class,
            uitype: null
          });
          
          let u = undefined

          //
          if(this.current_fs_path != undefined){
            let n_index = this.fs_path_history.length - 2
            let u_cmd = this.user_input.split(" ")[1]
            let f = `cd ${this.fs_path_history[n_index + 1]}/${u_cmd}`
            this.input = u_cmd
            u = f
          }

          // send request
          this.$axios.$post("/dq/dqcli", {
              data: `use ${this.current_class} ${u != undefined ? u : this.user_input}`,
              nested_mode: false,
              token: this.token
          }).then(res => {
              this.response_handler(res);              
          }).catch(e => {
            this.current_stack.push({
              arguments_array: null,
              command: this.user_input,
              body: e,
              class: this.current_class,
              uitype: "err"
            });
              this.fs_path_history.push(this.current_fs_path)
          });

          // reset field
          this.user_input = "";

          // set fucos to input
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
    normal,
    clear
  },
  mounted() {
    this.clientHeight = document.getElementById("dq-shellHolder").clientHeight - 25

    this.fs_path_history.push("")

    // focus input
    this.fucosOn();

    // user can type
    this.input_visible = true;

    // set pane attr
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
@import url("@/server/sys/admin assets/css/normalize.css");
@import url("@/server/sys/admin assets/css/tana 0.2.css");

:root {
  --bgColor: #414446;
  --ln: 1.5rem;
}

.shellbody {
  background-color: var(--bgColor);
  min-width: 1000px;
  flex: 1;
  overflow-y: auto;
}
.shell-textcolor-user {
  color: white;
}
#shell-trace {
  font-family: monospace;
}
.shell-textcolor-currentuser {
  color: #5be616;
  /* font-weight: bold; */
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
}
#shell-input:focus {
  border-style: none;
  outline: none;
}
#cli-output {
  margin-left: 5px;
}
#inp_mask {
  width: 100%;
  height: 100%;
  background-color: var(--bgColor);
}

.test{
  border: 3px solid green;
  background-color: white;
  z-index: 900;
  max-width: 300px;
  margin-top: 300px;
  margin-left: 500px;
  color: black;
}
</style>:


