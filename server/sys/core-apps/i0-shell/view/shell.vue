<template>
  <div id="dq-terminal" class="flex flexcol relative fullheight">
    <span id="dq-shell" class="absolute fullwidth">
      <main role="terminal-trace" class="flexwrap flexcol">
        <div :id="`dq-ter-result-${index}`" v-for="(items,index) in terminal_logs" :key="index">
          <span class="fullwidth flex">
            <div class="shell-textcolor-currentuser">
              {{usergroup}}@{{username}}-{{items.class}}:<span
                class="dq-ter-p-trace"
                v-if="items.fspath"
              >{{items.fspath}}:</span>
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

      <main role="terminal-input" id="terminal-input" class="flex">
        <span class="shell-textcolor-currentuser flex">
          {{usergroup}}@{{username}}-{{current_class}}:
          <span
            class="dq-ter-p-trace"
            v-if="fspath && current_class == 'fs'"
          >/{{fspath}}:</span>
        </span>
        <input
          id="shell-input"
          @keyup.enter="submit"
          v-model="user_input"
          class="borderred"
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
import txtfile from "../server/ui library/txtfile.vue"

export default {
  data() {
    return {
      user_input: undefined,
      global_classes: undefined,
      user_token: undefined,
      current_class: undefined,
      terminal_logs: [],
      usergroup: this.$store.state.admin.title,
      username: this.$store.state.admin.title,
      current_index: 0,
      dqterresult: [],

      // cd related
      fspath: undefined,
      fspath_arr: [],
      fspath_arr_path_trace: [],
      fspath_arr_input_trace: [],
      fs_secondArgs: [],

      // webSocket
      ws: undefined,
      wsonmessage: undefined
    };
  },
  methods: {
    // methods v2 by marven wilson donque

    submit() {
      this.a_user_input_parser(this.user_input);
    },

    // terminal logic layer
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
          if(this.global_classes.indexOf(input.secondArg) == -1){
            this.terminal_log({
                uitype: "err",
                body: `${input.secondArg} class not found`,
                class: input.class,
                command: input.arguments_string
              })
          }else{
            this.terminal_log({
              uitype: "normal",
              body: `switched to ${input.secondArg} successfully`,
              command: input.arguments_string,
              fspath:this.fspath_arr_path_trace[this.current_index - 1],
              class: input.class
            })
            this.current_class = input.secondArg
            if(this.current_class == 'fs'){
              this.fspath = this.fspath_arr_path_trace[this.fspath_arr_path_trace.length - 1].trim()
            }else{
              this.fspath = undefined
            }
          }
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
        try {
          this.dqterresult.map(id => document.getElementById(id).remove());
        } catch (e) {
          this.dqterresult = [];
          this.user_input = "";
        }
        this.dqterresult = [];
        this.user_input = "";
      } else {
        this.user_input = "";
      }

      // on case empty
      input == "EMPTY" &&
        this.terminal_log({
          body: "",
          fspath: this.fspath == undefined ? '' : this.fspath != undefined ? `/${this.fspath}` : this.fspath,
          class: this.current_class
        });

    },
    d_command_sender(input) {
      // this method is responsible for sending the parsed input to the

      // server to be processed
      if (input.class == "fs") {
        this.fs_command_sender(input)
      } else {
        console.log("EXECUTED: command sender 2");
        const c = {
          data: `use ${input.class} ${input.firstArg} ${input.secondArg}`,
          extraPayload: null,
          token: this.user_token
        };
        this.ws.send(JSON.stringify(c));
      }
    },
    e_command_response_handler(input) {
      // this method is responsilbe for handling the response from the server

      // too many cases dealing with cd, so im assigning it with its own handler
      if(input.command == "cd" && input.class == 'fs'){
        this.b_fs_change_dir_response_handler(input);
      }else{
        if(this.current_class == 'fs'){
          input.fspath = this.fspath == undefined ? '' : `/${this.fspath}`
          this.terminal_log(input);

        }else{
          this.terminal_log(input)
        }
      }
    },

    //
    terminal_log(log) {
      this.terminal_logs.push(log);
    },
    scroll_downn() {
      let shellbody = document.getElementById("dq-shell");
      let shellHolder = document.getElementById("dq-terminal");

      setTimeout(() => {
        shellHolder.scrollTop = shellbody.scrollHeight + 1;
      }, 5);
    },

    // cd - change directory handler only
    a_fs_change_dir_before_send_handler(input) {
      this.fspath_arr_input_trace.push(input.arguments_string);
      let pure_backwards = input.secondArg.replace("/", "");

      const backward_times =
        pure_backwards
          .replace("/", "")
          .split("")
          .join("")
          .replace("/", "")
          .split("").length / 2;

      const is_absolute_path_backward = pure_backwards
        .replace("/", "")
        .split("")
        .join("")
        .replace("/", "")
        .split("")
        .every(el => el == ".");

      if (is_absolute_path_backward) {
        // console.log("is backward! : " + backward_times + " times");
        const removefrom_index = this.fspath_arr.length - 1;
        // there is a bug here

        if (backward_times > 1) {
          if (backward_times == this.fspath_arr.length) {
            this.fspath_arr = [];
          } else {
            this.fspath_arr.splice(removefrom_index - 1, backward_times);
          }
          console.log("more than one");
        } else {
          this.fspath_arr.splice(removefrom_index, backward_times);
        }

        this.fspath = this.fspath_arr.join("/");
        // console.log('3333')
        // console.log(this.fspath)
      } else {
        this.fspath_arr.push(input.secondArg);
        this.fspath = this.fspath_arr.join("/");
      }

      if (this.fspath == "") {
        this.fspath = undefined;
        this.fspath_arr = [];
      }
      // console.log(`fspath: ${this.fspath}`)
      if (this.fspath) {
        this.ws.send(
          JSON.stringify({
            data: `use fs cd ${this.fspath}`,
            extraPayload: null,
            token: this.user_token
          })
        );
      } else {
        this.ws.send(
          JSON.stringify({
            data: `use fs cd ${null}`,
            extraPayload:null,
            token: this.user_token
          })
        );
      }
    },
    b_fs_change_dir_response_handler(input) {
      if (input.err) {
        // console.log("err code");
        // console.log(input)
        const err = input.arguments_string.split("/");
        this.fspath_arr.splice(this.fspath_arr.indexOf(err[err.length - 1]), 1);
        this.fspath = this.fspath_arr.join("/");
        // this.terminal_log(input);
      } else {
        // this operation is essential for allowing the backwards cd.. operation
        this.fspath_arr.map(el => {
          const pathIsNotSingle = el.indexOf("/") != -1;
          if (pathIsNotSingle) {
            const index_location = this.fspath_arr.length - 1;
            const brokend_absolute_path = this.fspath_arr[index_location].split(
              "/"
            );
            this.fspath_arr.splice(index_location, 1);
            this.fspath_arr = this.fspath_arr.concat(brokend_absolute_path);
          }
        });
      }
      this.c_fs_change_dir_ui_handler(input);
    },
    c_fs_change_dir_ui_handler(input) {
      this.fspath_arr_path_trace.push(input.body === true ? '' : input.body);
      if (!input.err) {
        //
        input.fspath = this.fspath_arr_path_trace[
          this.fspath_arr_path_trace.length - 2
        ];

        try{
          input.arguments_string = this.fspath_arr_input_trace[
          this.fspath_arr_path_trace.length - 1
        ].replace("cd", "");
        }catch(e){}

        //
        if (input.arguments_string.trim() == "") {
            this.terminal_log({
              class: "fs",
              uitype: "err",
              body: "cd: file operand missing",
              arguments_string: "cd"
            })
        }else{
          this.terminal_log(input);
        }

        console.log( this.fspath_arr_input_trace)

      } else {
        if (this.fspath_arr_path_trace.length == 1) {
          this.fspath_arr_path_trace = [];
          this.fspath_arr_input_trace = []
        } 
        else{
          //
          const problematic_index = this.fspath_arr_path_trace.length - 1;
          const prev_working_index = this.fspath_arr_path_trace.length - 2;
          //
          this.fspath_arr_path_trace.splice(
            problematic_index,
            1,
            this.fspath_arr_path_trace[prev_working_index]
          );
          //
          input.fspath = this.fspath_arr_path_trace[
            this.fspath_arr_path_trace.length - 2
          ];

          //
          input.arguments_string = this.fspath_arr_input_trace[
          this.fspath_arr_path_trace.length - 1
          ].replace("cd", "");

          console.log('exec')
        }
        this.terminal_log(input);
      }
    },

    // fileSystem related only
    fs_command_sender(input){
      if (input.firstArg == "cd") {
          try{
            this.fs_secondArgs.push(input.secondArg);
            this.a_fs_change_dir_before_send_handler(input)
          }catch(e){
            this.terminal_log({
              class: "fs",
              uitype: "err",
              body: "cd: file operand missing",
              arguments_string: "cd"
            })
          }          
        } else {
          console.log("EXECUTED: command sender 1.b");
          const b = {
            data: `use fs ${input.firstArg.trim()} ${input.arguments_string.replace(input.firstArg,'').trim()}`,
            flags:'',
            extraPayload: this.fspath,
            token: this.user_token
          };
          console.log(b)
          this.ws.send(JSON.stringify(b));
        }
    },

    // routines
    on_every_after_submition() {
      this.user_input = "";
      this.current_index++;
      this.dqterresult.push(`dq-ter-result-${this.current_index - 1}`);
      this.scroll_downn();
      // console.log(this.fspath);
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
      this.usergroup = this.$store.state.admin.title;

      // set user name
      this.username = this.$store.state.admin.adminName;

      // init webSocket
      this.ws = new WebSocket("ws://localhost:4000");
      
      this.ws.onopen = () => {
        console.log("CONNECTED");
      };
      this.ws.onmessage = pl => {
        this.wsonmessage = pl;
      };
      this.ws.onclose = function close() {
        // keep alive
      //  alert('closing')
      };
    }
  },
  watch: {
    wsonmessage(newval, oldval) {
      const x = newval.data;
      const obj = JSON.parse(x);
      this.e_command_response_handler(obj);
    }
  },
  mounted() {
    this.on_start_defaults_setter();

  },
  components: {
    arrayList,
    prompt,
    selection,
    tableObject,
    err,
    normal,
    txtfile,
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

#shell-input {
  background: none;
  border: none;
  color: white;
  width: 50%;
}
#shell-input:focus {
  border-style: none;
  outline: none;
}
.shell-textcolor-currentuser {
  color: #59f10d;
  /* font-weight: 600; */
  padding-left: 5px;
  padding-right: 10px;
}
#cli-output {
  margin-left: 5px;
  font-weight: 100;
  padding: calc(var(--fontSize) * 1.25);
  font-size: calc(var(--fontSize) * 1.12) !important;
}
.dq-cmd-trace {
  color: white;
}

.dq-cmd-trace > span,
.dq-cmd-trace,
.dq-ter-p-trace,
.shell-textcolor-currentuser,
#shell-input,
#cli-output, #dq-terminal > * {
  font-family: var(--inconsolata);
  font-size: calc(var(--fontSize) * 1.25);
}
</style>
