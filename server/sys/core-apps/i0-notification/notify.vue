<template>
  <div id="notification-pane">
    <div class>
      <div class="flex flexcol">
        <span class="pointer" id="dq-action-pane-sign-out" @click="signOut">sign out</span>
        <span class>
          <h6>Action Pane</h6>
        </span>
       <div class="flex">
            <div id="dq-action-pane-favicon-con" class="flex flexcenter">favicon here</div>
            <span class="flex flexcol fullwidth flexcenter relative">
                <span class="fullwidth">{{$store.state.admin.siteTitle}}</span>
                <span class="fullwidth">{{$store.state.admin.adminName}}</span>
                <span class="fullwidth">{{$store.state.admin.title}}</span>
            </span>
       </div>
      </div>
      <div class="borderred">wer</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mode"],
  methods: {
    signOut() {
        this.$store.commit('signOut')
    }
  }
};
</script>

<style>
#notification-pane {
  min-width: 400px;
  padding: calc(var(--fontSize) * 0.5);
  padding-left: calc(var(--fontSize) * 1.25);
  padding-right: calc(var(--fontSize) * 1.25);
  transition: 0.3s;
}
#dq-action-pane-sign-out {
  text-align: right;
}
#dq-action-pane-favicon-con {
  border: 1px solid red;
  min-height: calc(var(--fontSize) * 6.25);
  max-height: calc(var(--fontSize) * 6.25);

  min-width: calc(var(--fontSize) * 7.25);
  max-width: calc(var(--fontSize) * 7.25);
  margin-right: calc(var(--fontSize) * 0.25);
}
</style>
