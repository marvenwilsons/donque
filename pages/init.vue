<template>
  <div id="dq-init-parent-wrapper" class="flex fullheight-VH flexcenter flexwrap">
    <div v-if="!ready">
        <spinner/>
    </div>
    <div v-if="ready" id="dq-init-wrapper" class="flex flexwrap">
      <div>
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
            <span class="flex flexcenter">
              <span class="tc-2">Site title:</span>
              <input class="tc-3" type="text">
            </span>
            <!--  -->
            <span class="flex flexcenter">
              <span class="tc-2">Username:</span>
              <input class="tc-3" type="text">
            </span>
            <!--  -->
            <span class="flex flexcenter">
              <span class="tc-2">Password:</span>
              <input class="tc-3" type="password">
            </span>
            <!--  -->
            <span class="flex flexcenter">
              <span class="tc-2">re type password:</span>
              <input class="tc-3" type="password">
            </span>
            <!--  -->
            <span class="flex flexcenter">
              <span class="tc-2">Email:</span>
              <input class="tc-3" type="text">
            </span>
            <!--  -->
            <span class="flex tc-b">
              <span class="tc-b-inner">Initialized site</span>
            </span>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import spinner from '@/server/sys/core-apps/pane-system/module/spinner-1.vue'
export default {
    components:{
        spinner
    },
    data(){
        return{
            ready: false
        }
    },
    mounted(){
        setTimeout(() => {
            this.ready = true
        },1000)
    }
};
</script>

<style>
#dq-init-wrapper {
  min-width: 650px;
  background: white;
  padding: calc(var(--fontSize) * 1.25);
  max-width: 650px;
  transition: 0.3s;
}
#dq-init-parent-wrapper {
  background: var(--blue-1);
}
.tc {
  color: var(--blue-text-2);
}
.tc-2 {
  color: var(--blue-text-2);
  font-weight: 600;
  flex: 1;
}
.tc-3 {
  flex: 3;
  margin: calc(var(--fontSize) * 1.25);
  padding: calc(var(--fontSize) * 0.25);
  min-width: 400px;
  color: var(--blue-text-2);
  font-weight: 600;
}
.tc-b {
  justify-content: flex-end;
  padding: calc(var(--fontSize) * 1.25);
  cursor: pointer;
}
.tc-b-inner:hover{
    color: rgb(245, 245, 245);
    transition: 0.1s;
}
.tc-b-inner {
  background-color: var(--blue-1);
  color: white;
  padding: calc(var(--fontSize) * 0.25);
  font-weight: 600;
}
hr {
  color: #4a6976;
  /* color:  */
}
</style>
