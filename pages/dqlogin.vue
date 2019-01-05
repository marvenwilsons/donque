// init dq form v.01
// author: marven wilson donque
<template>
  <div id="dq-init-parent-wrapper" class="flex flexwrap relative">
    <div class="fullwidth flex absolute abs">
      <div class="flex flexcenter" v-if="!ready">
        <spinner/>
      </div>
      <div v-if="ready" id="dq-init-wrapper" class="flex flexwrap flexcenter">
        <div id="tc-logo-h" class="flex fullwidth flexcenter">
          <h1>dq</h1>
        </div>
        <div id="tc-f-wrap" class="">
            <div class="tc-wrap tc-input">
                <span class="tc-title">username: </span>
                <input type="text">
            </div>
            <div class="tc-input">
                <span class="tc-title">password: </span>
                <input type="password">
            </div>
            <div class="tc-b flex">
                <span class="tc-b-inner">Login</span>
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
      username: undefined,
      password: undefined,
    };
  },
  components: {
    spinner
  },
  methods: {


    submit() {

    }
  },
  mounted() {
    setTimeout(() => {
      this.ready = true;
    }, 1000);

    // make a request if the app is set then redirect to another page if it is set
    // incase a user try to access this page again after initializing the page
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
#tc-f-wrap {
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
  font-weight: 600;
}
hr {
  color: #4a6976;
}
</style>
