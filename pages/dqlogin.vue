// init dq form v.01
// author: marven wilson donque
<template>
  <div id="dq-init-parent-wrapper" class="flex flexwrap relative">
    <div class="fullwidth flex absolute abs">
      <div class="flex flexcenter" v-if="!ready">
        <spinner/>
      </div>
      <div v-if="ready" id="dq-init-wrapper" class="flex flexwrap flexcenter flexcol">
        <div id="tc-logo-h" class="flex fullwidth flexcenter">
          <h1>dq</h1>
        </div>

        <div id="tc-wrap-parent" class>
          <div v-if="err && !rpassword" id="tc-err-wrap">
            <div id="tc-err" class="tc-title flex flexcenter">Username or password is incorect</div>
          </div>

          <!-- retrive password -->
          <div v-if="rpassword" class="tc-f-wrap">
            <div class="tc-wrap tc-input flex flexcol">
              <span class="tc-title">Email</span>
              <input v-mode="email" type="text">
            </div>
            <div class="tc-b flex">
              <button @click="rp(true)" class="tc-b-inner">Retrieve password</button>
            </div>
          </div>

          <!-- login -->
          <div v-if="!rpassword" class="tc-f-wrap">
            <div class="tc-wrap tc-input flex flexcol">
              <span class="tc-title">Username</span>
              <input v-model="username" id="dqloginUsername" type="text">
            </div>
            <div class="tc-input flex flexcol">
              <span class="tc-title">Password</span>
              <input v-model="password" type="password">
            </div>
            <div class="tc-b flex">
              <button @click="submit" class="tc-b-inner">Login</button>
            </div>
          </div>
        </div>
        <div
          v-if="!rpassword"
          @click="rp(false)"
          style="color:white;"
          class="pad-125 pointer"
        >- Retrieve lost password</div>
      </div>
    </div>
  </div>
</template>

<script>
import spinner from "@/server/sys/core-apps/pane-system/module/spinner-1.vue";
export default {
  data() {
    return {
      ready: false,
      err: false,
      rpassword: false,
      email: undefined,
      username: undefined,
      password: undefined
    };
  },
  components: {
    spinner
  },
  methods: {
    rp(state) {
      if (state) {
        // send to server
        console.log(state);
      } else {
        this.rpassword = true;
      }
    },
    submit() {
      // this.err = true;
      this.$axios
        .$post("dqapp/_dq", {
          command: "adminlogin",
          section: "adminMethods",
          username:this.username,
          password: this.password
        })
        .then(response => {
          if (response.status) {
            // set localstorage
            localStorage.setItem("auth", response.data.token);
            localStorage.setItem("username", response.data.username);
            console.log(localStorage.getItem("auth"));
            if (localStorage.getItem("auth")) {
              location.href = "admin";
            }
            // this.$store.commit("setUserCredentials", data);

            // if (this.$store.state.user != undefined) {
            //   location.href =data.adminHref;
            // }
          } else {
            this.err = true;
          }
        })
        .catch(err => {
          alert(err);
        });
    }
  },
  mounted() {
    localStorage.clear();
    this.ready = false;
    setTimeout(() => {
      this.ready = true;
    }, 500);
  }
};
</script>

<style>
#tc-logo-h {
  padding: calc(var(--fontSize) * 1.25);
  margin: calc(var(--fontSize) * 1.25);
}
.tc-suc {
  color: #00c09a;
}
.tc-err {
  color: red;
}
.und-err {
  color: red;
  border-bottom: 1px dashed red;
}
#tc-logo-h > h1 {
  color: white;
  font-family: var(--lobster);
  border: 1px dashed white;
  padding-left: calc(var(--fontSize) * 1.25);
  padding-right: calc(var(--fontSize) * 1.25);
}
#tc-wrap-parent {
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.198);
}
.tc-f-wrap {
  background: white;
  padding: calc(var(--fontSize) * 1.25);
  padding-left: calc(var(--fontSize) * 2.25);
  padding-right: calc(var(--fontSize) * 2.25);
}
#dq-init-wrapper {
  min-width: 650px;
  /* background: white; */
  max-width: 650px;
  transition: 0.3s;
}
#dq-init-parent-wrapper {
  background: var(--blue-1);
  min-height: 100vh;
}
.abs {
  overflow-x: auto;
  height: 100%;
  justify-content: center;
}
.tc {
  color: var(--blue-text-2);
}
.tc-title {
  color: var(--blue-text-2);
  flex: 1;
  /* font-weight: 600; */
}
.tc-input {
  flex: 4;
}
.tc-input > input {
  padding: calc(var(--fontSize) * 0.5);
  margin-bottom: calc(var(--fontSize) * 0.25);
  color: var(--blue-text-2);
  font-weight: 600;
  min-width: calc(var(--fontSize) * 15.25);
}
.tc-ind {
  flex: 0.5;
  justify-content: center;
}
.tc-wrap {
  padding-top: calc(var(--fontSize) * 1.25);
  padding-bottom: calc(var(--fontSize) * 1.25);
}
.tc-desc {
  color: var(--blue-text-2);
  font-style: italic;
}
.tc-b {
  justify-content: flex-end;
  padding-top: calc(var(--fontSize) * 1.25);
  cursor: pointer;
}
.tc-b-inner:hover {
  color: rgb(245, 245, 245);
  transition: 0.1s;
}
.tc-b-inner {
  background-color: var(--blue-1);
  color: white;
  padding: calc(var(--fontSize) * 0.5);
  padding-left: calc(var(--fontSize) * 1);
  padding-right: calc(var(--fontSize) * 1);
  /* font-weight: 600; */
  border: 1px solid rgba(0, 0, 0, 0.335);
  cursor: pointer;
  border-radius: 2px;
}

#tc-err {
  background: #ae110036;
  max-height: 100px;
  color: #ae1100;
  padding: calc(var(--fontSize) * 1.25);
}
#tc-err-wrap {
  background: white;
}
hr {
  color: #4a6976;
}
</style>
