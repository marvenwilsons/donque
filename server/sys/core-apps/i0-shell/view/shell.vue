<template>
  <div id="dq-terminal" class="flex flexcol relative fullheight">
    <span class="absolute fullwidth">
      <main role="terminal-trace" class="flexwrap flexcol">
        <div :id="`dq-ter-result-${index}`" v-for="(items,index) in terminal_logs" :key="index">
          <span class="fullwidth flex">
            <div class="shell-textcolor-currentuser">
              {{usergroup}}@{{username}}:{{items.class}}:
              <span v-if="items.fspath">{{items.fspath}}:</span>
              <span class="dq-cmd-trace">
                {{items.command}}
                <span
                  v-if="items.arguments_string != 'undefined'"
                >{{items.arguments_string}}</span>
              </span>
            </div>
          </span>
          <div id="cli-output" :is="items.uitype" :val="items.body"></div>
        </div>
      </main>

      <main role="terminal-input" class="flex">
        <span class="shell-textcolor-currentuser flex">
          {{usergroup}}@{{username}}:{{current_class}}:
          <span v-if="fspath">{{fspath}}:</span>
        </span>
        <input
          id="shell-input"
          @keyup.enter="submit"
          v-model="user_input"
          class="fullwidth"
          type="text"
        >
      </main>
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
import clear from "../server/ui library/clear.vue";
// import Vue from 'vue'
// import VueSocketio from 'vue-socket.io';
// Vue.use(VueSocketio, 'ws://localhost:4000');

export default {
  data() {
    return {
      user_input: undefined,
      global_classes: undefined,
      user_token: undefined,
      current_class: undefined,
      terminal_logs: [],
      usergroup: undefined,
      username: undefined,
      current_index: 0,
      dqterresult: [],
      fspath: undefined,
      fspath_arr: [],
      ws: undefined,
      wsonmessage: undefined
    };
  },
  methods: {
    // methods v2 by marven wilson donque

    submit() {
      this.a_user_input_parser(this.user_input);
    },
    a_user_input_parser(input) {
      // parsed the user input breaks down each section of the input and
      // turn it into an object

      // detec empty and not empty
      input =
        input == undefined
          ? ""
          : String(input).trim() == ""
          ? ""
          : input.split(" ");

      //
      typeof input == "string" &&
        this.b_parsed_input_handler({ firstArg: null });

      //
      typeof input == "object" &&
        this.b_parsed_input_handler({
          firstArg: input[0],
          secondArg: input[1],
          arguments_string: input.join(" "),
          class: this.current_class
        });
    },
    b_parsed_input_handler(input) {
      // the purpose of this method is to assign a case on each command the
      // user cast

      // case container
      let CASE_SELECTED = undefined;

      // cases difine
      input.firstArg == "clear" && (CASE_SELECTED = "CLEAR_THE_SCREEN");
      input.firstArg == "use" && (CASE_SELECTED = "SWITCH_CLASS");
      input.firstArg != "clear" &&
        input.firstArg != "use" &&
        input.firstArg != null &&
        (CASE_SELECTED = "SEND_TO_SERVER");
      input.firstArg == null && (CASE_SELECTED = "EMPTY");

      switch (CASE_SELECTED) {
        case "CLEAR_THE_SCREEN":
          this.c_terminal_view_handler("CLEAR_THE_SCREEN");
          break;

        case "SWITCH_CLASS":
          this.global_classes.indexOf(input.secondArg) == -1
            ? this.terminal_log({
                uitype: "err",
                body: `${input.secondArg} class not found`,
                class: input.class,
                command: input.arguments_string
              })
            : this.terminal_log(
                {
                  uitype: "normal",
                  body: `switched to ${input.secondArg} successfully`,
                  command: input.arguments_string,
                  class: input.class
                },
                (this.current_class = input.secondArg)
              );
          this.on_every_after_submition();
          break;

        case "SEND_TO_SERVER":
          this.d_command_sender(input);
          this.on_every_after_submition();
          break;

        case "EMPTY":
          this.c_terminal_view_handler("EMPTY");
          this.on_every_after_submition();
          break;
      }
    },
    c_terminal_view_handler(input) {
      // this method is responsible for the ui on what to display

      // on case clear
      if (input == "CLEAR_THE_SCREEN" && this.dqterresult.length != 0) {
        this.dqterresult.map(id => document.getElementById(id).remove());
        this.dqterresult = [];
        this.user_input = "";
      } else {
        this.user_input = "";
      }

      // on case empty
      input == "EMPTY" &&
        this.terminal_log({
          body: "",
          class: this.current_class
        });
    },
    d_command_sender(input) {      
      // this method is responsible for sending the parsed input to the
      this.ws.send(input.arguments_string)

      // console.log(this.wsonmessage.data)
      // server to be processed
      // if (input.class == "fs") {
      //     this.$axios
      //     .$post("/dq/dqcli", {
      //         data: `use fs ${input.firstArg} ${input.secondArg}`,
      //         token: this.token
      //     })
      //     .then(res => {
      //         this.e_command_response_handler(res.response);
      //     })
      //     .catch(err => {
      //         this.terminal_log({
      //             uitype: 'err',
      //             body: err
      //         });
      //     });
      // } else {
      //     this.$axios
      //     .$post("/dq/dqcli", {
      //         data: `use ${input.class} ${input.firstArg} ${input.secondArg}`,
      //         token: this.token
      //     })
      //     .the(res => {
      //         this.e_command_response_handler(res.response);
      //     })
      //     .catch(err => {
      //         this.terminal_log({
      //             uitype: 'err',
      //             body: err
      //         });
      //     });
      // }
    },
    e_command_response_handler(input) {
      // this method is responsilbe for handling the response from the server

      // too many cases dealing with cd, so im assigning it with its own handler
      input.command == "cd" && this.fs_change_dir_handler(input);

      // normal
      input.command != "cd" &&
        (() => {
          this.terminal_log(input);
        })();
    },
    terminal_log(log) {
      this.terminal_logs.push(log);
    },
    fs_change_dir_handler(input) {
      // handle error
      input.err && this.terminal_log(input);

      // cd cases definitions
      const cur_inp = input.arguments_string.split("/");
      cur_inp.pop();

      const go_back_wards =
          input.arguments_string == ".." || input.arguments_string == "../",
        go_one_level_up_a =
          input.arguments_string.split("/").length >= 1 &&
          cur_inp.indexOf("..") == -1 &&
          input.arguments_string.split("/").pop() == "",
        go_one_level_up_b =
          input.arguments_string.split("/").length == 1 &&
          input.arguments_string != "..",
        is_absolute_path_forward =
          input.arguments_string.split("/").length >= 2 &&
          input.arguments_string.split("/")[1] != "" &&
          input.arguments_string.split("/").every(item => item != ".."),
        is_absolute_path_backward =
          cur_inp.every(item => item == "..") && cur_inp.length > 1;

      // cd cases handling on every success state
      if (go_back_wards) {
        // cd ../
        console.log("go back wards");
      }

      if (go_one_level_up_a) {
        // cd files
        console.log("go one level up");
      }

      if (go_one_level_up_b) {
        // cd files/
        console.log("go one level up 2");
      }

      if (is_absolute_path_forward) {
        // cd files/bar
        console.log("is absolute forward");
      }

      if (is_absolute_path_backward) {
        // cd ../../
        console.log("is absolute backward");
        console.log(input);
      }
    },
    on_every_after_submition() {
      this.user_input = "";
      this.current_index++;
      this.dqterresult.push(`dq-ter-result-${this.current_index - 1}`);
    },
    on_start_defaults_setter() {
      // this method fires when the shell instantiate, set all the defaults and
      // runs all the starting checklist before even the user can interac to the ui

      // fucos
      document.getElementById("shell-input").focus();

      // get global classes
      this.global_classes = ["fs", "mysql", "dq"];

      // get token
      this.user_token = "asdjfhkjashdkfwiuerqwqweb7248ythek";

      // set default class
      this.current_class = "fs";

      // set user group
      this.usergroup = "dev";

      // set user name
      this.username = "marven";
    }
  },
  watch: {
    wsonmessage(newval,oldval) {
      console.log(newval.data)
    }
  },
  mounted() {
    this.on_start_defaults_setter();
  },
  beforeMount() {
    this.ws = new WebSocket("ws://localhost:4000");
    this.ws.onopen = () => {
      console.log("CONNECTED");
    };
    this.ws.onmessage = (pl) => {
      this.wsonmessage = pl
    }
    this.ws.inclose = function close(){
      console.log('closed')
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
  }
};
</script>

<style>
:root {
  --bgColor: #414446;
  --ln: 1.5rem;
}

#dq-terminal {
  height: 100%;
  background-color: var(--bgColor);
  color: white;
  overflow-y: scroll;
}
#dq-terminal > * {
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
.shell-textcolor-currentuser {
  color: #5be616;
  /* font-weight: bold; */
  padding-left: 5px;
  padding-right: 10px;
  font-family: monospace;
}
#cli-output {
  margin-left: 5px;
}
.dq-cmd-trace {
  color: white;
  font-family: monospace;
}
.dq-cmd-trace > span {
  font-family: monospace;
}
</style>
