// init dq form v.01
// author: marven wilson donque
<template>
  <div
    :style="{backgroundImage: `url(${bg})`}"
    id="dq-init-parent-wrapper"
    class="flex flexwrap relative"
  >
    <div class="fullwidth flex absolute abs">
      <div class="flex flexcenter" v-if="!ready">
        <spinner />
      </div>
      <div
        v-if="ready"
        :style="{opacity: 0}"
        id="dq-init-wrapper"
        class="flex flexwrap flexcenter flexcol absolute"
      >
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
              <input v-mode="rpassword" type="text" />
            </div>
            <div class="tc-b flex">
              <button @click="rp(true)" class="tc-b-inner">Retrieve password</button>
            </div>
          </div>

          <!-- login -->
          <div v-if="!rpassword" class="tc-f-wrap">
            <div class="tc-wrap tc-input flex flexcol">
              <span class="tc-title padbottom025">Username</span>
              <div style="min-width:250px;">
                <input
                  class="pad050 fullwidth inp-log rt"
                  v-model="username"
                  id="userf"
                  type="text"
                />
              </div>
            </div>
            <div class="tc-input flex flexcol">
              <span class="tc-title padbottom025">Password</span>
              <div>
                <input class="pad050 fullwidth inp-log" v-model="password" type="password" />
              </div>
            </div>
            <div class="margintop125 padright025 padtop125 padbottom125 flexend flex">
              <button @click="submit" class="tc-b-inner">
                <strong>Login</strong>
              </button>
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
import { TweenMax, TimelineLite, TweenLite } from "gsap";

export default {
  data() {
    return {
      ready: false,
      err: false,
      rpassword: false,
      email: undefined,
      username: undefined,
      password: undefined,
      bg: undefined
    };
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
    setBg() {
      return `/dq-login-wallpapers/0${Math.floor(Math.random() * 9 + 1)}.jpeg`;
    },
    submit() {
      // this.err = true;
      this.$axios
        .$post("dqapp/_dq", {
          command: "adminlogin",
          section: "adminMethods",
          username: this.username,
          password: this.password
        })
        .then(response => {
          const { status, data } = response;
          //   console.log(data.actions);
          this.$store.commit("setActions", data.actions);

          if (status) {
            // set localstorage
            localStorage.setItem("auth", data.actions[0].content.token);
            localStorage.setItem("username", data.actions[0].content.username);
            // console.log(localStorage.getItem("auth"));
            if (localStorage.getItem("auth")) {
              location.href = "admin";
            }
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
    //
    this.bg = `/dq-login-wallpapers/0${Math.floor(Math.random() * 9 + 1)}.jpeg`;
    //
    if (location.pathname != "/dqlogin") {
      location.href = "dqlogin";
    }
    //
    localStorage.clear();
    //
    this.ready = false;

    //
    this.$axios
      .$get("/dqapp/app", {
        params: {
          get: {}
        }
      })
      .then(res => {
        // store to state
        // console.log(res);
        setTimeout(() => {
          this.ready = true;
          setTimeout(() => {
            const n = document.getElementById("dq-init-wrapper");
            TweenMax.fromTo(n, 0.3, { opacity: "0" }, { opacity: "1" });
            setTimeout(() => {
              TweenMax.fromTo(n, 0.4, { marginTop: "150px" }, { top: "1" });
            }, 200);

            document.getElementById("userf").focus();
          }, 0);
        }, 500);
      })
      .catch(err => {
        context.error(err);
        console.log(err);
      });
  }
};
</script>

<style>
@import url("@/assets/dq-css/dq-theme-default.css");
@import url("@/assets/dq-css/dq-fw-0.3.css");

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
  /* background: var(--blue-1); */
  /* background: #45dcfb; */
  /* background-image: url("/thomas-lefebvre-5691-unsplash.jpg"); */
  background-size: cover;
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
.tc-input > div > input {
  /* padding: calc(var(--fontSize) * 1.25); */
  /* margin-bottom: calc(var(--fontSize) * 0.25); */
  color: var(--blue-text-2);
  font-size: calc(var(--fontSize) * 1.25);
  font-weight: 700;
  border: none;
  border: 1px solid #4a697611;
  border-radius: 2px;
  background: #4a697611;
}
.inp-log:focus {
  border-style: none;
  outline: none;
}
.inp-log:active {
  border-style: none;
  outline: none;
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
  /* background-color: var(--blue-1); */
  color: white;
  padding: calc(var(--fontSize) * 0.5);
  padding-left: calc(var(--fontSize) * 1);
  padding-right: calc(var(--fontSize) * 1);
  /* font-weight: 600; */
  /* border: 1px solid rgba(0, 0, 0, 0.335); */
  border: none;
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
