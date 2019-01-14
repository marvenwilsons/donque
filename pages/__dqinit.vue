// init dq form v.01
// author: marven wilson donque
<template>
  <div id="dq-init-parent-wrapper" class="flex flexwrap relative">
    <div class="fullwidth flex absolute abs">
      <div class="flex flexcenter flex flexcenter flexcol" v-if="!ready">
        <spinner/>
      </div>
      <div v-if="ready" id="dq-init-wrapper" class="flex flexwrap">
        <div id="tc-logo-h" class="flex fullwidth flexcenter">
          <h1>dq</h1>
        </div>
        <div id="tc-f-wrap">
          <h5 class="tc">Welcome</h5>
          <hr>
          <p class="tc tt">
            Welcome to the famous one-minute initialization, please provide all the required information below
            and you'll be on your way to using the most flexible and the most powerful publisihing platform in the planet.
          </p>
          <h5 class="tc">Initialized Site</h5>
          <hr>
          <p
            class="tc"
          >Please provide the necessary information on the input fields, you can change it in settings later.</p>
          <div class="tc-f-wrap-inner">
            <form class="flex flex flexcol">
              <!-- site title  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">Site Title:</span>
                  <span class="flex flexcol tc-input">
                    <input
                      v-on:input="_validate('siteTitle')"
                      v-model="siteTitle"
                      class="fullwidth"
                      type="text"
                      required
                    >
                    <span class="tc-desc">
                      <span
                        :class="[errors.siteTitle.indexOf('shouldNotHaveSpecialChar') != -1 && 'und-err']"
                      >no special characters allowed like !@#$*</span>
                      <br>
                      <span
                        :class="[errors.siteTitle.indexOf('hasWhiteSpace') != -1 && 'und-err']"
                      >no white space allowed</span> and
                      <br>
                      <span
                        :class="[errors.siteTitle.indexOf('charIsOnly2') != -1 && 'und-err']"
                      >must be more than 2 characters</span>
                      <br>
                      <span
                        :class="[errors.siteTitle.indexOf('required') != -1 && 'und-err']"
                      >this is a required field</span>
                    </span>
                  </span>
                  <span class="tc-ind flex">
                    <span
                      v-if="errors.siteTitle.length == 0 && siteTitle != undefined"
                      class="tc-suc"
                    >&#10004;</span>
                    <span v-if="errors.siteTitle.length != 0" class="tc-err">&#x2718;</span>
                  </span>
                </span>
              </div>
              <!-- username  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">Username:</span>
                  <span class="flex flexcol tc-input">
                    <input
                      v-on:input="_validate('username')"
                      v-model="username"
                      class="fullwidth"
                      type="text"
                      required
                    >
                    <span class="tc-desc">
                      <span
                        :class="[errors.username.indexOf('shouldNotHaveSpecialChar') != -1 && 'und-err']"
                      >no special characters allowed like !@#$*</span>
                      <br>
                      <span
                        :class="[errors.username.indexOf('hasWhiteSpace') != -1 && 'und-err']"
                      >no white space allowed</span> and
                      <br>
                      <span
                        :class="[errors.username.indexOf('charIsOnly2') != -1 && 'und-err']"
                      >must be more than 6 characters</span>
                      <br>
                      <span
                        :class="[errors.username.indexOf('required') != -1 && 'und-err']"
                      >this is a required field</span>
                    </span>
                  </span>
                  <span class="tc-ind flex">
                    <span
                      v-if="errors.username.length == 0 && username != undefined"
                      class="tc-suc"
                    >&#10004;</span>
                    <span v-if="errors.username.length != 0" class="tc-err">&#x2718;</span>
                  </span>
                </span>
              </div>
              <!-- password -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">Password:</span>
                  <span class="flex flexcol tc-input">
                    <input
                      v-on:input="_validate('password')"
                      v-model="password"
                      class="fullwidth"
                      type="password"
                      required
                    >
                    <span class="tc-desc">
                      password
                      <span
                        :class="[errors.password.indexOf('shouldIncludeNumber') != -1 && 'und-err']"
                      >must contain numbers</span> and
                      <span
                        :class="[errors.password.indexOf('shouldHaveSpecialChar') != -1 && 'und-err']"
                      >should contain special characters</span>
                      and
                      <span
                        :class="[errors.password.indexOf('charIsOnly2') != -1 && 'und-err']"
                      >should be more than 6 characters</span>
                      <br>
                      <span
                        :class="[errors.siteTitle.indexOf('required') != -1 && 'und-err']"
                      >this is a required field</span>
                    </span>
                  </span>
                  <span class="tc-ind flex">
                    <span
                      v-if="errors.password.length == 0 && password != undefined"
                      class="tc-suc"
                    >&#10004;</span>
                    <span v-if="errors.password.length != 0" class="tc-err">&#x2718;</span>
                  </span>
                </span>
              </div>
              <!-- repassword  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">re-Password:</span>
                  <span class="flex flexcol tc-input">
                    <input
                      v-on:input="_validate('repassword')"
                      v-model="repassword"
                      class="fullwidth"
                      type="password"
                    >
                    <span class="tc-desc">re type your password must match your password</span>
                  </span>
                  <span class="tc-ind flex">
                    <span
                      v-if="errors.repassword.length == 0 && repassword != undefined"
                      class="tc-suc"
                    >&#10004;</span>
                    <span v-if="errors.repassword.length != 0" class="tc-err">&#x2718;</span>
                  </span>
                </span>
              </div>
              <!-- email -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">email:</span>
                  <span class="flex flexcol tc-input">
                    <input
                      v-on:input="_validate('email')"
                      v-model="email"
                      class="fullwidth"
                      type="text"
                    >
                    <span class="tc-desc">
                      <span
                        :class="[errors.email.length != 0 && 'und-err']"
                      >Enter a valid email format</span>
                    </span>
                  </span>
                  <span class="tc-ind flex">
                    <span
                      v-if="errors.email.length == 0 && email != undefined"
                      class="tc-suc"
                    >&#10004;</span>
                    <span v-if="errors.email.length != 0" class="tc-err">&#x2718;</span>
                  </span>
                </span>
              </div>
              <span class="flex tc-b">
                <span @click="submit" class="tc-b-inner">Initialize site</span>
              </span>
            </form>
          </div>
        </div>
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
      siteTitle: undefined,
      username: undefined,
      password: undefined,
      repassword: undefined,
      email: undefined,
      passed: [],
      errors: {
        siteTitle: [],
        username: [],
        password: [],
        repassword: [],
        email: []
      },
      readyObj: {},
      validations: {
        hasWhiteSpace: e => e.indexOf(" ") != -1,
        shouldNotHaveSpecialChar: e => {
          const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
          return regex.exec(e) != null;
        },
        shouldHaveSpecialChar: e => {
          const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gim;
          return regex.exec(e) == null;
        },
        shouldNotIncludeNumber: e => {
          const regex = /[0-9]/gim;
          return regex.exec(e) != null;
        },
        shouldIncludeNumber: e => {
          const regex = /[0-9]/gim;
          return regex.exec(e) == null;
        },
        required: e => {
          return e == "";
        },
        isValidEmail: e => {
          const condition = ["@", ".com"];
          const res = condition.map(charSet => {
            return RegExp(`${charSet}`, "").exec(e) != null;
          });
          return res.join("/") != "true/true";
        },
        passwordMatch: e => {
          return e != this.password;
        }
      }
    };
  },
  components: {
    spinner
  },
  methods: {
    pullErrors(errObj, errName) {
      if (this.errors[errObj].indexOf(errName) != -1) {
        // console.log(`get > ${errName} in ${errObj}`)
        this.errors[errObj].splice(this.errors[errObj].indexOf(errName), 1);
      }
    },
    pushErrors(errObj, errName) {
      if (this.errors[errObj].indexOf(errName) == -1) {
        this.errors[errObj].push(errName);
      }
    },
    _validate(curField) {
      const vdn = this.validations;

      switch (curField) {
        case "siteTitle":
          vdn.hasWhiteSpace(this[curField])
            ? this.pushErrors(curField, "hasWhiteSpace")
            : this.pullErrors(curField, "hasWhiteSpace");

          this[curField].length < 2
            ? this.pushErrors(curField, "charIsOnly2")
            : this.pullErrors(curField, "charIsOnly2");

          vdn.shouldNotHaveSpecialChar(this[curField])
            ? this.pushErrors(curField, "shouldNotHaveSpecialChar")
            : this.pullErrors(curField, "shouldNotHaveSpecialChar");

          vdn.required(this[curField])
            ? this.pushErrors(curField, "required")
            : this.pullErrors(curField, "required");
          break;

        case "username":
          vdn.hasWhiteSpace(this[curField])
            ? this.pushErrors(curField, "hasWhiteSpace")
            : this.pullErrors(curField, "hasWhiteSpace");

          this[curField].length < 6
            ? this.pushErrors(curField, "charIsOnly2")
            : this.pullErrors(curField, "charIsOnly2");

          vdn.shouldNotHaveSpecialChar(this[curField])
            ? this.pushErrors(curField, "shouldNotHaveSpecialChar")
            : this.pullErrors(curField, "shouldNotHaveSpecialChar");

          vdn.required(this[curField])
            ? this.pushErrors(curField, "required")
            : this.pullErrors(curField, "required");
          break;

        case "password":
          vdn.hasWhiteSpace(this[curField])
            ? this.pushErrors(curField, "hasWhiteSpace")
            : this.pullErrors(curField, "hasWhiteSpace");

          this[curField].length < 6
            ? this.pushErrors(curField, "charIsOnly2")
            : this.pullErrors(curField, "charIsOnly2");

          vdn.shouldHaveSpecialChar(this[curField])
            ? this.pushErrors(curField, "shouldHaveSpecialChar")
            : this.pullErrors(curField, "shouldHaveSpecialChar");

          vdn.shouldIncludeNumber(this[curField])
            ? this.pushErrors(curField, "shouldIncludeNumber")
            : this.pullErrors(curField, "shouldIncludeNumber");

          vdn.required(this[curField])
            ? this.pushErrors(curField, "required")
            : this.pullErrors(curField, "required");
          break;

        case "repassword":
          vdn.required(this[curField])
            ? this.pushErrors(curField, "required")
            : this.pullErrors(curField, "required");

          vdn.passwordMatch(this[curField])
            ? this.pushErrors(curField, "passwordMatch")
            : this.pullErrors(curField, "passwordMatch");
          break;

        case "email":
          vdn.hasWhiteSpace(this[curField])
            ? this.pushErrors(curField, "hasWhiteSpace")
            : this.pullErrors(curField, "hasWhiteSpace");

          this[curField].length < 6
            ? this.pushErrors(curField, "charIsOnly2")
            : this.pullErrors(curField, "charIsOnly2");

          vdn.isValidEmail(this[curField])
            ? this.pushErrors(curField, "isValidEmail")
            : this.pullErrors(curField, "isValidEmail");

          vdn.required(this[curField])
            ? this.pushErrors(curField, "required")
            : this.pullErrors(curField, "required");
          break;
      }
    },
    submit() {
      const undarr = [
        this.siteTitle,
        this.username,
        this.password,
        this.repassword,
        this.email
      ];

      const fields = [
        "siteTitle",
        "username",
        "password",
        "repassword",
        "email"
      ];
      // check for undefined fields
      undarr.map((e, i) => {
        if (e == undefined) {
          this.errors[fields[i]].push("required");
        }
      });

      const s = fields.map(e => {
        if (this.errors[e].length != 0) {
          return false;
        } else {
          return true;
        }
      });

      if (s.every(e => e == true)) {
        const app = {};
        app.siteTitle = this.siteTitle;
        app.username = this.username;
        app.password = this.password;
        app.repassword = this.repassword;
        app.email = this.email;

        this.$axios
          .$post("/dqapp/initapp", app)
          .then(res => {
            this.ready = false;
            setTimeout(() => {
              if (res) {
                location.reload();
              }
            }, 15000);
          })
          .catch(e => {
            alert(e)
          });
      }
    }
  },
  mounted() {
    console.log('hello')
    setTimeout(() => {
      this.ready = true;
    }, 1000);

    this.$axios
      .$get("dqapp/app")
      .then(res => {
        console.log(res.status)
        if (res.status) {
          location.href = "dqlogin";
        }
      })
      .catch(err => {
        alert(err);
      });

  }
};
</script>

<style>
#tc-logo-h {
  padding: calc(var(--fontSize) * 1.25);
  margin: calc(var(--fontSize) * 1.25);
}
.tc-suc {
  color: #038203;
}
.tc-err {
  color: var(--err);
}
.und-err {
  color: var(--err);
  border-bottom: 1px dashed var(--err);
}
#tc-logo-h > h1 {
  color: white;
  font-family: var(--lobster);
  border: 1px dashed white;
  padding-left: calc(var(--fontSize) * 1.25);
  padding-right: calc(var(--fontSize) * 1.25);
}

:root {
  --bg-c: white;
}

#tc-f-wrap {
  background: var(--bg-c);
  padding: calc(var(--fontSize) * 1.25);
  padding-left: calc(var(--fontSize) * 2.25);
  padding-right: calc(var(--fontSize) * 2.25);
  margin-bottom: calc(var(--fontSize) * 2.25);
  box-shadow: 0px 0px 20px 1px var(--blue-text-2);
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
.tc-f-wrap-inner {
  /* border: 1px solid red; */
  border-radius: 5px;
  padding-left: calc(var(--fontSize) * 1.25);
  padding-top: calc(var(--fontSize) * 2.25);
  margin-bottom: calc(var(--fontSize) * 1.25);
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
  font-weight: 600;
}
.tc-input {
  flex: 4;
}
.tc-input > input {
  padding: calc(var(--fontSize) * 0.25);
  margin-bottom: calc(var(--fontSize) * 0.25);
  color: var(--blue-text-2);
  font-weight: 600;
  background-color: var(--bg-c);
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
  padding: calc(var(--fontSize) * 2.25);
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
  border: 1px solid rgba(0, 0, 0, 0.335);
}
hr {
  color: #4a6976;
}
</style>
