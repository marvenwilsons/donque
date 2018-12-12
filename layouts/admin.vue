<template>
  <main role="admin-layout" class="flex flexcol">
    <div v-if="$store.state.modal.visibility" id="dq-modal-holder" class="absolute fullwidth fullheight-VH flex flexcenter">
      <div id="dq-modal-host" class="flex flexcol absolute">
        <span id="dq-modal-head" class="flex spacebetween" >
          <span> <strong>{{$store.state.modal.head}}</strong> </span>
          <span @click="closeModal" class="light-text" > <strong>&#10006;</strong> </span>
        </span>
        <span id="dq-modal-body" class="flex center" >
          <div class="flex flexcenter fullwidth" :is="$store.state.modal.body" ></div>
        </span>
      </div>
    </div>
    <nuxt/>
  </main>
</template>

<script>
export default {
  methods: {
    closeModal(){
      this.$store.state.modal.visibility = false
    }
  }
}
</script>


<style>
@import url("@/server/sys/admin assets/css/tana 0.2.css");
@import url("@/server/sys/admin assets/css/normalize.css");

:root {
  --size-1-half: calc(var(--fontSize) * 0.25);
  --size-1-full: calc(var(--fontSize) * 1.25);

  --size-2-half: calc(var(--fontSize) * 1.25);

  /* dark */
  --dark-1: #393e42;
  --dark-2: #5c696f;
  --dark-3: #33383c;

  /* light */
  --light-1: #e0e0e0;

  /* blue */
  --blue-1: #0086c0;
  --blue-2: #86a6bd;
  --blue-3: #e9eff3;
  --blue-4: #f4f7f9;
  --blue-text: #2d4455;

  /* hovers */
  --hover-blue: var(--blue-2);
}
.dq-pane-container-padding {
  padding-top: var(--size-1-half);
  padding-bottom: var(--size-1-half);
  padding-left: var(--size-1-half);
  padding-right: var(--size-1-half);
}
#__layout {
  min-height: 100vh;
  min-width: 100vw;
  position: fixed;

  height: 100%;
}
#__layout > main {
  min-height: inherit;
  max-height: inherit;
  position: relative;
  min-width: inherit;
  overflow: hidden;
  /* border: 5px solid blue; */
  flex-flow: row wrap;
  justify-content: center;
}

#dq-modal-holder{
  z-index: 50;
  background-color: #393e428e;
  transition: 0.3s;
}
#dq-modal-host{
  z-index: 150 !important;
  min-width: 450px;
  min-height: 200px;
  background: white;
  /* margin-top: -500px; */
  top:250px;
  box-shadow: 2px 2px 15px 1px #393e4244;
}
#dq-modal-head{
  padding: var(--size-1-half);
  background-color: var(--blue-1);
  color: white;
}
#dq-modal-body{
  padding: var(--size-1-half);
  flex: 1;
}

</style>
