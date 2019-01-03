<template>
  <div id="dq-init-parent-wrapper" class="flex flexwrap relative">
    <div class="fullwidth flex absolute abs ">
      <div v-if="!ready">
        <spinner/>
      </div>
      <div v-if="ready" id="dq-init-wrapper" class="flex flexwrap  ">
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
          <div>
            <form class="flex flex flexcol">
              <!--  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">Site Title:</span>
                  <span class="flex flexcol tc-input">
                    <input v-model="siteTitle" class="fullwidth" type="text">
                    <span class="tc-desc">no special characters allowed</span>
                  </span>
                  <span class="tc-ind flex">c</span>
                </span>
              </div>
              <!--  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">Username:</span>
                  <span class="flex flexcol tc-input">
                    <input v-model="username" class="fullwidth" type="text">
                    <span class="tc-desc">no white space and special characters allowed</span>
                  </span>
                  <span class="tc-ind flex">c</span>
                </span>
              </div>
              <!--  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">Password:</span>
                  <span class="flex flexcol tc-input">
                    <input v-model="password" class="fullwidth" type="password">
                    <span class="tc-desc">must contain numbers and special characters</span>
                  </span>
                  <span class="tc-ind flex">c</span>
                </span>
              </div>
              <!--  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">re-Password:</span>
                  <span class="flex flexcol tc-input">
                    <input v-model="repassword" class="fullwidth" type="password">
                    <span class="tc-desc">re type your password</span>
                  </span>
                  <span class="tc-ind flex">c</span>
                </span>
              </div>
              <!--  -->
              <div class="flex flexcenter flexcol tc-wrap">
                <span class="flex fullwidth spacebetween">
                  <span class="flex tc-title">email:</span>
                  <span class="flex flexcol tc-input">
                    <input v-model="email" class="fullwidth" type="text">
                    <span class="tc-desc">please review email before submit</span>
                  </span>
                  <span class="tc-ind flex">c</span>
                </span>
              </div>
              <span class="flex tc-b">
                <span @click="submit" class="tc-b-inner">Initialized site</span>
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
      siteTitle: "",
      username: undefined,
      password: undefined,
      repassword: undefined,
      email: undefined
    };
  },
  components: {
    spinner
  },
  methods: {
    _validate(e) {
      console.log(this.siteTitle.trim());
    },
    submit() {
      console.log(this.siteTitle);
    }
  },
  mounted() {
    setTimeout(() => {
      this.ready = true;
    }, 1000);
  }
};
</script>

<style>
#tc-logo-h{
  padding: calc(var(--fontSize) * 1.25);  
  margin: calc(var(--fontSize) * 1.25);
}
#tc-logo-h > h1{
    color: white;
    font-family: var(--lobster);
    border: 1px dashed white;
    padding-left: calc(var(--fontSize) * 1.25);
    padding-right: calc(var(--fontSize) * 1.25);

}
#tc-f-wrap{
    background: white;
  padding: calc(var(--fontSize) * 1.25);
    padding-left: calc(var(--fontSize) * 2.25);
  padding-right: calc(var(--fontSize) * 2.25);
  margin-bottom: calc(var(--fontSize) * 2.25);
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
  font-weight: 600;
}
hr {
  color: #4a6976;
}
</style>
