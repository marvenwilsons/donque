// init dq form v.01
// author: marven wilson donque
<template>
  <div id="dq-admn-parent-wrapper" class="dq-admin-w flex flexwrap relative fullheight-percent">
    <div class="fullwidth flex absolute abs">
      <div class="flex flexcenter flex flexcenter flexcol" v-if="!ready">
        <spinner/>
      </div>
      <div v-if="ready" id="dq-init-wrapper" class="flex flexwrap">
        <div class="fullwidth" id="tc-f-wrap-admn">
          <div class="pad125">
            <p><strong>About</strong></p>
            <span>
              This form is for creating an application admin, 
              the that admin manages the app resources and executes actions that is assigned by the owner,
              including logging in to the dashboard and executing CRUD operations using the GUI assigned.
            </span>
          </div>

          <div class="tc-f-wrap-inner-admn">
            <form class="flex flex flexcol">
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
              <!-- admin name  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">Admin Name:</span>
                  <span class="flex flexcol tc-input">
                    <input
                      v-on:input="_validate('adminName')"
                      v-model="adminName"
                      class="fullwidth"
                      type="text"
                      required
                    >
                    <span class="tc-desc">
                      <span>The full name of the owner or the admin</span>
                      <br>
                      <span
                        :class="[errors.adminName.indexOf('shouldNotHaveSpecialChar') != -1 && 'und-err']"
                      >no special characters allowed like !@#$*</span>
                      <br>
                      <span
                        :class="[errors.adminName.indexOf('required') != -1 && 'und-err']"
                      >this is a required field</span>
                    </span>
                  </span>
                  <span class="tc-ind flex">
                    <span
                      v-if="errors.adminName.length == 0 && adminName != undefined"
                      class="tc-suc"
                    >&#10004;</span>
                    <span v-if="errors.adminName.length != 0" class="tc-err">&#x2718;</span>
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
                        :class="[errors.password.indexOf('required') != -1 && 'und-err']"
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
                  <span class="flex tc-title">Email:</span>
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
              <!-- role -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">Admin Role:</span>
                  <span class="flex flexcol tc-input">
                    <select v-model="role" name="rolelist" form="roleform">
                      <option
                        v-for="roleTitle in roles"
                        :key="roleTitle.roleTitle"
                        :value="roleTitle.roleTitle"
                      >{{roleTitle.roleTitle}}</option>
                    </select>
                    <span class="tc-desc">
                      <span
                        :class="[errors.email.length != 0 && 'und-err']"
                      >Select a role for {{adminName}}</span>
                      <br>
                      <span>{{roles[getRoleDesc()].desc}}</span>
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
              <span id="dq-newwork-err" v-if="netErr">{{netErr}}</span>
              <span class="flex tc-b">
                <span @click="submit" class="tc-b-inner">Create New Admin</span>
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      netErr: undefined,
      ready: false,
      username: undefined,
      password: undefined,
      repassword: undefined,
      adminName: undefined,
      email: undefined,
      role: "admin",
      passed: [],
      roles: [],
      errors: {
        username: [],
        password: [],
        repassword: [],
        email: [],
        adminName: []
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
  methods: {
    pullErrors(errObj, errName) {
      if (this.errors[errObj].indexOf(errName) != -1) {
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

        case "adminName":
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
        this.username,
        this.password,
        this.repassword,
        this.email,
        this.adminName
      ];

      const fields = [
        "username",
        "password",
        "repassword",
        "adminName",
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
        app.roleTitle = this.role;
        app.username = this.username;
        app.password = this.password;
        app.repassword = this.repassword;
        app.email = this.email;
        app.adminName = this.adminName;

        this.$store.dispatch("systemCall", {
          command: "createNewAppActor",
          section: "adminMethods",
          data: app,
          method: "post"
        });
      }
    },
    clearForms() {
      setTimeout(() => {
        this.username = undefined;
        this.adminName = undefined;
        this.password = undefined;
        this.repassword = undefined;
        this.role = "admin";
        this.email = undefined;
      }, 150);
    },
    getRoleDesc(x) {
      let index = 0;
      this.roles.map((e, i) => {
        if (e.roleTitle === this.role) {
          return (index = i);
        }
      });
      return index;
    }
  },
  mounted() {
    // todo get if the user is even allowed to access this form in the first place
    // todo fetch admin roles
    this.ready = false;
    this.clearForms();

    this.$store.commit("modal/exec_after_msg", this.clearForms);

    this.$store
      .dispatch("systemCall", {
        command: "getRoles",
        section: "adminMethods",
        username: localStorage.getItem("username"),
        token: localStorage.getItem("auth"),
        method: "get"
      })
      .then(data => {
        this.ready = true;

        this.roles = data.data.content;
      })
      .catch(err => {
        alert(err);
      });
  },
  // 
  beforeCreate() {
    this.$store.commit("pane_system/set_pane_config", {
      target: "Admin",
      title: "Application Admin Form",
      pane_width: "900px",
    });
  }
};
</script>

<style>
#dq-newwork-err {
  padding: calc(var(--fontSize) * 1.25);
  border-radius: 10px;
  background: #ae110036;
  color: #ae1100;
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
  /* border: 1px dashed white; */
  padding-left: calc(var(--fontSize) * 1.25);
  padding-right: calc(var(--fontSize) * 1.25);
}

:root {
  --bg-c: white;
}

#tc-f-wrap-admn {
  background: var(--bg-c);
  padding: calc(var(--fontSize) * 1.25);
  padding-left: calc(var(--fontSize) * 2.25);
  padding-right: calc(var(--fontSize) * 2.25);
  box-shadow: 0px 0px 20px 1px var(--blue-text-2);
}
#dq-init-wrapper {
  min-width: 100%;
  /* background: white; */
  /* max-width: 99%; */
  transition: 0.3s;
}
.tc-f-wrap-inner-admn {
  /* border: 1px solid red; */
  border-radius: 5px;
  padding-left: calc(var(--fontSize) * 1.25);
  padding-top: calc(var(--fontSize) * 2.25);
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
  /* margin-bottom: calc(var(--fontSize) * 0.25); */
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
hr {
  color: #4a6976;
}
</style>
